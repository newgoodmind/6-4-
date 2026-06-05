import React, { createContext, useContext, useState, useEffect } from "react";
import { DeveloperProfile, Project, Service, profileData, servicesData, projectsData } from "../data";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { signInWithPopup, signOut as fbSignOut, onAuthStateChanged, User } from "firebase/auth";
import { db, auth, googleProvider } from "../firebase";

enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface PortfolioContextType {
  profile: DeveloperProfile;
  services: Service[];
  projects: Project[];
  isAdmin: boolean;
  currentUser: User | null;
  loginAdmin: (password: string) => boolean;
  loginAdminWithGoogle: () => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
  updateProfile: (updated: DeveloperProfile) => void;
  updateService: (id: string, updated: Service) => void;
  updateProject: (id: string, updated: Project) => void;
  addProject: (newProject: Project) => void;
  deleteProject: (id: string) => void;
  resetToDefault: () => void;
  syncToFirebase: (nextProfile: DeveloperProfile, nextServices: Service[], nextProjects: Project[]) => Promise<boolean>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<DeveloperProfile>(() => {
    const saved = localStorage.getItem("portfolio_profile");
    return saved ? JSON.parse(saved) : profileData;
  });
  
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem("portfolio_services");
    return saved ? JSON.parse(saved) : servicesData;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("portfolio_projects");
    return saved ? JSON.parse(saved) : projectsData;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem("portfolio_admin_active") === "true";
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 1. Monitor Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.email === "dlrbtkd951@gmail.com" && user.emailVerified) {
        setIsAdmin(true);
        sessionStorage.setItem("portfolio_admin_active", "true");
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Load and Sync from Firestore in Real-time
  useEffect(() => {
    const path = "portfolio/data";
    const docRef = doc(db, "portfolio", "data");
    
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          
          // Auto-upgrade if Firestore database contains the old stale placeholder name "이지훈"
          if (data.profile && data.profile.name === "이지훈") {
            console.log("Stale placeholder '이지훈' found in Firestore. Upgrading database to '이규상'...");
            syncToFirebase(profileData, servicesData, projectsData);
            return;
          }

          if (data.profile) {
            setProfile(data.profile);
            localStorage.setItem("portfolio_profile", JSON.stringify(data.profile));
          }
          if (data.services) {
            setServices(data.services);
            localStorage.setItem("portfolio_services", JSON.stringify(data.services));
          }
          if (data.projects) {
            setProjects(data.projects);
            localStorage.setItem("portfolio_projects", JSON.stringify(data.projects));
          }
        } else {
          // Auto-seed if Firestore database document is empty
          console.log("Firestore document empty. Seeding database with '이규상' default data...");
          syncToFirebase(profileData, servicesData, projectsData);
        }
      },
      (error) => {
        // Soft logging, does not crash app if permissions denied for unauthenticated/anonymous guests
        console.warn("Firestore subscription restricted or loading failed:", error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  // 3. Central write helper
  const syncToFirebase = async (
    nextProfile: DeveloperProfile,
    nextServices: Service[],
    nextProjects: Project[]
  ): Promise<boolean> => {
    const path = "portfolio/data";
    try {
      const docRef = doc(db, "portfolio", "data");
      await setDoc(docRef, {
        profile: nextProfile,
        services: nextServices,
        projects: nextProjects,
        passcode: "951125",
        updatedAt: new Date().toISOString(),
      });
      console.log("Firestore sync successful!");
      return true;
    } catch (error) {
      if (error instanceof Error && error.message.includes("permission")) {
        console.warn("Firebase writing failed: Missing or insufficient permissions. Have you logged in using Admin Google Login?");
        return false;
      } else {
        handleFirestoreError(error, OperationType.WRITE, path);
        return false;
      }
    }
  };

  const loginAdmin = (password: string): boolean => {
    if (password === "951125") {
      setIsAdmin(true);
      sessionStorage.setItem("portfolio_admin_active", "true");
      return true;
    }
    return false;
  };

  const loginAdminWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user && user.email === "dlrbtkd951@gmail.com" && user.emailVerified) {
        setIsAdmin(true);
        sessionStorage.setItem("portfolio_admin_active", "true");
        // Immediately sync local changes to cloud
        await syncToFirebase(profile, services, projects);
        return true;
      } else {
        alert(
          `로그인된 계정 (${user?.email || "알 수 없음"})은 관리자 권한이 없습니다.\n관리자 본인의 이메일(dlrbtkd951@gmail.com) 계정으로 축소/재시도해 주세요.`
        );
        await fbSignOut(auth);
        return false;
      }
    } catch (e) {
      console.error("Google Sign-In Error", e);
      alert("구글 로그인 진행 중 오류가 발생했습니다. 팝업창 제한 설정을 해제해 주세요.");
      return false;
    }
  };

  const logoutAdmin = async () => {
    setIsAdmin(false);
    sessionStorage.removeItem("portfolio_admin_active");
    await fbSignOut(auth);
  };

  const updateProfile = (updated: DeveloperProfile) => {
    setProfile(updated);
    localStorage.setItem("portfolio_profile", JSON.stringify(updated));
    syncToFirebase(updated, services, projects);
  };

  const updateService = (id: string, updated: Service) => {
    const next = services.map((s) => (s.id === id ? updated : s));
    setServices(next);
    localStorage.setItem("portfolio_services", JSON.stringify(next));
    syncToFirebase(profile, next, projects);
  };

  const updateProject = (id: string, updated: Project) => {
    const next = projects.map((p) => (p.id === id ? updated : p));
    setProjects(next);
    localStorage.setItem("portfolio_projects", JSON.stringify(next));
    syncToFirebase(profile, services, next);
  };

  const addProject = (newProject: Project) => {
    const next = [...projects, newProject];
    setProjects(next);
    localStorage.setItem("portfolio_projects", JSON.stringify(next));
    syncToFirebase(profile, services, next);
  };

  const deleteProject = (id: string) => {
    const next = projects.filter((p) => p.id !== id);
    setProjects(next);
    localStorage.setItem("portfolio_projects", JSON.stringify(next));
    syncToFirebase(profile, services, next);
  };

  const resetToDefault = () => {
    setProfile(profileData);
    setServices(servicesData);
    setProjects(projectsData);
    localStorage.removeItem("portfolio_profile");
    localStorage.removeItem("portfolio_services");
    localStorage.removeItem("portfolio_projects");
    syncToFirebase(profileData, servicesData, projectsData);
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        services,
        projects,
        isAdmin,
        currentUser,
        loginAdmin,
        loginAdminWithGoogle,
        logoutAdmin,
        updateProfile,
        updateService,
        updateProject,
        addProject,
        deleteProject,
        resetToDefault,
        syncToFirebase,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
