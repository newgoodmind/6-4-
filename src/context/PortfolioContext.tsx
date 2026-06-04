import React, { createContext, useContext, useState, useEffect } from "react";
import { DeveloperProfile, Project, Service, profileData, servicesData, projectsData } from "../data";

interface PortfolioContextType {
  profile: DeveloperProfile;
  services: Service[];
  projects: Project[];
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateProfile: (updated: DeveloperProfile) => void;
  updateService: (id: string, updated: Service) => void;
  updateProject: (id: string, updated: Project) => void;
  addProject: (newProject: Project) => void;
  deleteProject: (id: string) => void;
  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<DeveloperProfile>(profileData);
  const [services, setServices] = useState<Service[]>(servicesData);
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("portfolio_profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse saved profile", e);
      }
    }

    const savedServices = localStorage.getItem("portfolio_services");
    if (savedServices) {
      try {
        setServices(JSON.parse(savedServices));
      } catch (e) {
        console.error("Failed to parse saved services", e);
      }
    }

    const savedProjects = localStorage.getItem("portfolio_projects");
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error("Failed to parse saved projects", e);
      }
    }

    const adminSession = sessionStorage.getItem("portfolio_admin_active");
    if (adminSession === "true") {
      setIsAdmin(true);
    }
  }, []);

  const loginAdmin = (password: string): boolean => {
    if (password === "951125") {
      setIsAdmin(true);
      sessionStorage.setItem("portfolio_admin_active", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("portfolio_admin_active");
  };

  const updateProfile = (updated: DeveloperProfile) => {
    setProfile(updated);
    localStorage.setItem("portfolio_profile", JSON.stringify(updated));
  };

  const updateService = (id: string, updated: Service) => {
    const next = services.map((s) => (s.id === id ? updated : s));
    setServices(next);
    localStorage.setItem("portfolio_services", JSON.stringify(next));
  };

  const updateProject = (id: string, updated: Project) => {
    const next = projects.map((p) => (p.id === id ? updated : p));
    setProjects(next);
    localStorage.setItem("portfolio_projects", JSON.stringify(next));
  };

  const addProject = (newProject: Project) => {
    const next = [...projects, newProject];
    setProjects(next);
    localStorage.setItem("portfolio_projects", JSON.stringify(next));
  };

  const deleteProject = (id: string) => {
    const next = projects.filter((p) => p.id !== id);
    setProjects(next);
    localStorage.setItem("portfolio_projects", JSON.stringify(next));
  };

  const resetToDefault = () => {
    setProfile(profileData);
    setServices(servicesData);
    setProjects(projectsData);
    localStorage.removeItem("portfolio_profile");
    localStorage.removeItem("portfolio_services");
    localStorage.removeItem("portfolio_projects");
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        services,
        projects,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        updateProfile,
        updateService,
        updateProject,
        addProject,
        deleteProject,
        resetToDefault,
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
