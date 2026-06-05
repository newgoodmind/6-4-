import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { Lock, Unlock, LogOut, CheckCircle2, RotateCcw, Plus, Trash2, Edit2, Check, X, Eye, FileText, Info, HelpCircle, Copy, Chrome, Cloud, Database, RefreshCw } from "lucide-react";
import { Project, Service } from "../data";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const {
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
    syncToFirebase
  } = usePortfolio();

  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "services">("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Active editing states
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [tempProject, setTempProject] = useState<Project | null>(null);
  const [isAddingNewProject, setIsAddingNewProject] = useState(false);

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [tempService, setTempService] = useState<Service | null>(null);

  // Profile temporary inputs
  const [tempProfile, setTempProfile] = useState(profile);

  // Sync temp profile when tab opens or updates
  React.useEffect(() => {
    if (isOpen) {
      setTempProfile(profile);
    }
  }, [isOpen, profile]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (success) {
      setAuthError(false);
      setPassword("");
      showSaveSuccess();
      // Proactively sync local changes to cloud on unlock
      await syncToFirebase(profile, services, projects);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 3000);
    }
  };

  const showSaveSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(tempProfile);
    showSaveSuccess();
  };

  const handleResetDefaults = () => {
    if (confirm("모든 데이터를 초기 템플릿 상태로 복원하시겠습니까? 그동안 수정한 내용이 초기화됩니다.")) {
      resetToDefault();
      setTempProfile(profile);
      setEditingProjectId(null);
      setEditingServiceId(null);
      setIsAddingNewProject(false);
      showSaveSuccess();
    }
  };

  // Helper inside form to extract raw Youtube 11-char ID from any fully pasted URL
  const extractYoutubeId = (urlOrId: string): string => {
    const trimmed = urlOrId.trim();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = trimmed.match(regExp);
    return (match && match[2].length === 11) ? match[2] : trimmed;
  };

  // Start editing existing project
  const startEditingProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setTempProject({ ...proj });
    setIsAddingNewProject(false);
  };

  const startAddingProject = () => {
    setEditingProjectId(null);
    setIsAddingNewProject(true);
    setTempProject({
      id: "project-" + Date.now(),
      category: "Brand Film",
      title: "",
      description: "",
      role: "콘텐츠 기획 / 구성 / 편집",
      tools: ["Premiere Pro"],
      youtubeId: "ScMzIvxBSi4",
      thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
      year: new Date().getFullYear().toString(),
      client: "",
      highlights: ["기획 의도 설정 완료", "안정된 컷 구성 연출"]
    });
  };

  const handleProjectSave = () => {
    if (!tempProject) return;
    
    // Auto sanitize youtube links
    const sanitizedProj = {
      ...tempProject,
      youtubeId: extractYoutubeId(tempProject.youtubeId)
    };

    if (isAddingNewProject) {
      addProject(sanitizedProj);
      setIsAddingNewProject(false);
    } else if (editingProjectId) {
      updateProject(editingProjectId, sanitizedProj);
      setEditingProjectId(null);
    }
    setTempProject(null);
    showSaveSuccess();
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      deleteProject(id);
      showSaveSuccess();
    }
  };

  // Service helper editing
  const startEditingService = (svc: Service) => {
    setEditingServiceId(svc.id);
    setTempService({ ...svc });
  };

  const handleServiceSave = () => {
    if (!tempService || !editingServiceId) return;
    updateService(editingServiceId, tempService);
    setEditingServiceId(null);
    setTempService(null);
    showSaveSuccess();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end"
          id="admin-panel-dimmer"
        >
          {/* Main Slide-over Panel Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-4xl bg-brand-bg h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-gray-200"
            onClick={(e) => e.stopPropagation()}
            id="admin-sidebar"
          >
            {/* Header section of the controller */}
            <div className="p-6 bg-white border-b border-gray-200/50 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isAdmin ? "bg-emerald-600" : "bg-brand-point"} text-white shadow-sm`}>
                  {isAdmin ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-brand-text">포트폴리오 관리 센터</h2>
                  <p className="text-xs text-brand-sub font-medium">
                    {isAdmin ? "컨텐츠 및 안내 문구 실시간 제어" : "접근 권한 비밀번호 잠금"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <button
                    onClick={handleResetDefaults}
                    className="p-1 px-3 text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors rounded-md flex items-center space-x-1"
                    title="초기 템플릿 복원"
                    id="btn-admin-reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>초기화</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-brand-sub transition-all"
                  aria-label="닫기"
                  id="btn-admin-close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main content viewport containing Forms or Verification Gate */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8">
              {!isAdmin ? (
                /* PASSWORD LOCK GATE SCREEN */
                <div className="h-full flex flex-col items-center justify-center max-w-sm mx-auto text-center py-6 font-sans">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                    <Lock className="w-7 h-7 text-brand-point animate-pulse" />
                  </div>
                  <h3 className="text-xl font-extrabold text-brand-text mb-2">실시간 클라우드 관리 콘솔</h3>
                  <p className="text-xs text-brand-sub leading-relaxed mb-6">
                    관리자 비밀번호를 입력하면 이 PC에서 수정한 내용이 모바일 및 다른 기기의 홈페이지에도 즉시 똑같이 반영됩니다!
                  </p>

                  <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
                    <div className="text-left">
                      <label htmlFor="admin-pass" className="text-xs font-bold text-brand-sub block mb-1.5">
                        관리자 비밀번호 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        id="admin-pass"
                        required
                        placeholder="••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 hover:border-gray-300 focus:border-brand-accent rounded-xl text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-accent/25 transition-all shadow-inner"
                      />
                    </div>

                    {authError && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100 animate-bounce"
                      >
                        올바른 비밀번호가 아닙니다. 다시 시도해 주세요.
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-point hover:bg-brand-accent text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer animate-pulse hover:animate-none"
                      id="btn-admin-submit-auth"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>수정 권한 활성화 & 실시간 연동</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* VERIFIED CONTROL CONSOLE */
                <div className="space-y-6">
                  {/* Management Section Tab Bar */}
                  <div className="flex border-b border-gray-200" id="admin-tab-bar">
                    <button
                      onClick={() => {
                        setActiveTab("profile");
                        setEditingProjectId(null);
                        setEditingServiceId(null);
                        setIsAddingNewProject(false);
                      }}
                      className={`flex-1 py-3 text-center text-xs sm:text-sm font-bold tracking-wide border-b-2 transition-all ${
                        activeTab === "profile"
                          ? "border-brand-point text-brand-point font-extrabold"
                          : "border-transparent text-brand-sub hover:text-brand-text"
                      }`}
                    >
                      기본 프로필 & 소개글
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("projects");
                        setEditingServiceId(null);
                      }}
                      className={`flex-1 py-3 text-center text-xs sm:text-sm font-bold tracking-wide border-b-2 transition-all ${
                        activeTab === "projects"
                          ? "border-brand-point text-brand-point font-extrabold"
                          : "border-transparent text-brand-sub hover:text-brand-text"
                      }`}
                    >
                      프로젝트 포트폴리오
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("services");
                        setEditingProjectId(null);
                        setIsAddingNewProject(false);
                      }}
                      className={`flex-1 py-3 text-center text-xs sm:text-sm font-bold tracking-wide border-b-2 transition-all ${
                        activeTab === "services"
                          ? "border-brand-point text-brand-point font-extrabold"
                          : "border-transparent text-brand-sub hover:text-brand-text"
                      }`}
                    >
                      제공 업무 & 서비스
                    </button>
                  </div>

                  {/* TAB 1: PROFILE MANAGEMENT FORM */}
                  {activeTab === "profile" && (
                    <form onSubmit={handleProfileSave} className="space-y-5 text-left" id="form-manage-profile">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-brand-sub">이름(한글)</label>
                          <input
                            type="text"
                            value={tempProfile.name}
                            onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                            className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-bold text-brand-sub">이름(영문 대문자)</label>
                          <input
                            type="text"
                            value={tempProfile.englishName}
                            onChange={(e) => setTempProfile({ ...tempProfile, englishName: e.target.value.toUpperCase() })}
                            className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-brand-sub">직무명 (영문/한글)</label>
                        <input
                          type="text"
                          value={tempProfile.role}
                          onChange={(e) => setTempProfile({ ...tempProfile, role: e.target.value })}
                          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-brand-sub">히어로 영역 메인 카피</label>
                        <textarea
                          rows={2}
                          value={tempProfile.tagline}
                          onChange={(e) => setTempProfile({ ...tempProfile, tagline: e.target.value })}
                          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold whitespace-pre-wrap leading-relaxed"
                          placeholder="가장 먼저 나오는 강력한 한 문장"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-brand-sub">히어로 영역 하위 서브 설명</label>
                        <textarea
                          rows={3}
                          value={tempProfile.subTagline}
                          onChange={(e) => setTempProfile({ ...tempProfile, subTagline: e.target.value })}
                          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold whitespace-pre-wrap leading-relaxed"
                          placeholder="히어로 영역 아래 작은 설명 글"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-bold text-brand-sub">PD 가치관 (About 영역 상단 인용구)</label>
                        <textarea
                          rows={2}
                          value={tempProfile.mindsetQuote || ""}
                          onChange={(e) => setTempProfile({ ...tempProfile, mindsetQuote: e.target.value })}
                          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold whitespace-pre-wrap leading-relaxed"
                          placeholder="소개 페이지 상단에 노출되는 강조 인용구"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-brand-sub">프로필 자기소개 (About Section) 본문</label>
                          <span className="text-[10px] text-brand-accent font-semibold flex items-center">
                            <Info className="w-3 h-3 mr-1" />
                            줄바꿈과 띄어쓰기가 홈페이지 화면에 100% 동일하게 유지됩니다.
                          </span>
                        </div>
                        <textarea
                          rows={6}
                          value={tempProfile.aboutText}
                          onChange={(e) => setTempProfile({ ...tempProfile, aboutText: e.target.value })}
                          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold whitespace-pre-wrap leading-relaxed text-justify font-sans"
                          placeholder="소개글 단락 단위 구성"
                        />
                      </div>

                      <div className="border-t border-gray-250/50 pt-5 space-y-4">
                        <h4 className="text-xs font-bold text-brand-point uppercase tracking-widest">연락처 및 외부 채널 주소</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-bold text-brand-sub">이메일 주소</label>
                            <input
                              type="email"
                              value={tempProfile.email}
                              onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold font-sans"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-bold text-brand-sub">인스타그램 채널 링크</label>
                            <input
                              type="text"
                              value={tempProfile.instagram}
                              onChange={(e) => setTempProfile({ ...tempProfile, instagram: e.target.value })}
                              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold font-sans"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-bold text-brand-sub">유튜브 채널 링크</label>
                            <input
                              type="text"
                              value={tempProfile.youtubeChannel}
                              onChange={(e) => setTempProfile({ ...tempProfile, youtubeChannel: e.target.value })}
                              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold font-sans"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-bold text-brand-sub">포트폴리오 PDF / 노션 채널 링크</label>
                            <input
                              type="text"
                              value={tempProfile.resumeUrl}
                              onChange={(e) => setTempProfile({ ...tempProfile, resumeUrl: e.target.value })}
                              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold font-sans"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full py-3 bg-brand-point hover:bg-brand-accent text-white font-bold text-sm rounded-xl transition-all shadow-sm"
                          id="btn-save-profile-data"
                        >
                          기본 설정 및 소개글 변경사항 저장
                        </button>
                      </div>
                    </form>
                  )}

                  {/* TAB 2: PROJECTS MANAGEMENT VIEW */}
                  {activeTab === "projects" && (
                    <div className="space-y-6" id="projects-controller-viewport">
                      {/* Project Adding & Editor Sub-view Toggle */}
                      {!tempProject ? (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-brand-sub">등록된 프로젝트 총 {projects.length}개</span>
                            <button
                              onClick={startAddingProject}
                              className="p-2 px-4 bg-brand-point hover:bg-brand-accent text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors"
                              id="btn-admin-add-project"
                            >
                              <Plus className="w-4 h-4" />
                              <span>프로젝트 추가</span>
                            </button>
                          </div>

                          <div className="space-y-3.5">
                            {projects.map((proj) => (
                              <div
                                key={proj.id}
                                className="p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between gap-4"
                              >
                                <div className="flex items-center space-x-4 min-w-0">
                                  <div className="w-14 aspect-video bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                    <img src={proj.youtubeId ? `https://img.youtube.com/vi/${proj.youtubeId}/hqdefault.jpg` : proj.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="px-1.5 py-0.5 bg-brand-point/10 rounded text-[9px] text-brand-point uppercase font-bold tracking-wider">
                                        {proj.category}
                                      </span>
                                      <span className="text-[10px] text-brand-sub font-mono font-bold">{proj.year}</span>
                                    </div>
                                    <h4 className="text-sm font-extrabold text-brand-text truncate mt-0.5">{proj.title}</h4>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2 shrink-0">
                                  <button
                                    onClick={() => startEditingProject(proj)}
                                    className="p-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-250/40 rounded text-brand-text transition-colors"
                                    title="편집"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProject(proj.id)}
                                    className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded text-red-600 transition-colors"
                                    title="삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        /* PROJECT ITEM FORM EDITOR */
                        <div className="bg-white p-6 border border-gray-200 rounded-2xl text-left space-y-4">
                          <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-2">
                            <h4 className="text-sm font-extrabold text-brand-point uppercase flex items-center">
                              <FileText className="w-4 h-4 mr-1 text-brand-accent" />
                              {isAddingNewProject ? "새 프로젝트 추가" : "프로젝트 세부 속성 편집"}
                            </h4>
                            <button
                              onClick={() => {
                                setTempProject(null);
                                setIsAddingNewProject(false);
                              }}
                              className="text-xs text-brand-sub hover:text-brand-text"
                            >
                              취소
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs font-bold text-brand-sub">프로젝트 카테고리</label>
                              <input
                                type="text"
                                value={tempProject.category}
                                onChange={(e) => setTempProject({ ...tempProject, category: e.target.value })}
                                className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm font-medium"
                                placeholder="예: Brand Film, YouTube Contents"
                              />
                            </div>
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs font-bold text-brand-sub">프로젝트 제목</label>
                              <input
                                type="text"
                                value={tempProject.title}
                                onChange={(e) => setTempProject({ ...tempProject, title: e.target.value })}
                                className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm font-medium"
                                placeholder="예: Brand Film / Project Title 01"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="text-xs font-bold text-brand-sub">유튜브 비디오 링크 또는 고유 ID</label>
                            <input
                              type="text"
                              value={tempProject.youtubeId}
                              onChange={(e) => setTempProject({ ...tempProject, youtubeId: e.target.value })}
                              className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm font-mono font-semibold"
                              placeholder="예: https://www.youtube.com/watch?v=ScMzIvxBSi4 또는 ScMzIvxBSi4"
                              required
                            />
                            <span className="text-[10px] text-brand-point font-semibold mt-0.5">
                              * 주소를 붙여넣으면 자동으로 영상 재생용 고유 키(11글자)로 정리 및 치환해 줍니다.
                            </span>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="text-xs font-bold text-brand-sub">프로젝트 소개 상세 설명</label>
                            <textarea
                              rows={4}
                              value={tempProject.description}
                              onChange={(e) => setTempProject({ ...tempProject, description: e.target.value })}
                              className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm font-medium whitespace-pre-wrap leading-relaxed text-justify"
                              placeholder="기획 의도, 흐름, 전개 방안을 편하게 작성해 주세요."
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs font-bold text-brand-sub">담당 역할</label>
                              <input
                                type="text"
                                value={tempProject.role}
                                onChange={(e) => setTempProject({ ...tempProject, role: e.target.value })}
                                className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm font-semibold text-brand-text"
                                placeholder="예: 콘텐츠 기획 / 구성 / 편집"
                              />
                            </div>
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs font-bold text-brand-sub">사용 도구 (콤마 , 로 분리)</label>
                              <input
                                type="text"
                                value={tempProject.tools.join(", ")}
                                onChange={(e) => setTempProject({
                                  ...tempProject,
                                  tools: e.target.value.split(",").map((t) => t.trim()).filter((t) => t !== "")
                                })}
                                className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm font-semibold"
                                placeholder="Premiere Pro, Photoshop, Notion"
                              />
                            </div>
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs font-bold text-brand-sub">제작 연도</label>
                              <input
                                type="text"
                                value={tempProject.year}
                                onChange={(e) => setTempProject({ ...tempProject, year: e.target.value })}
                                className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm text-brand-text"
                              />
                            </div>
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs font-bold text-brand-sub">클라이언트 / 채널명</label>
                              <input
                                type="text"
                                value={tempProject.client}
                                onChange={(e) => setTempProject({ ...tempProject, client: e.target.value })}
                                className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm text-brand-text"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="text-xs font-bold text-brand-sub">썸네일 이미지 파일 URL 주소</label>
                            <input
                              type="text"
                              value={tempProject.thumbnailUrl}
                              onChange={(e) => setTempProject({ ...tempProject, thumbnailUrl: e.target.value })}
                              className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-xs font-mono"
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="text-xs font-bold text-brand-sub">담당 핵심 성과 가이드라인 (줄바꿈 단위 기재)</label>
                            <textarea
                              rows={3}
                              value={tempProject.highlights.join("\n")}
                              onChange={(e) => setTempProject({
                                ...tempProject,
                                highlights: e.target.value.split("\n").map((h) => h.trim()).filter((h) => h !== "")
                              })}
                              className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm leading-relaxed"
                              placeholder="기획 의도 설정 완료&#10;평균 조회 유지도 향상"
                            />
                          </div>

                          <div className="flex space-x-3 pt-4 border-t border-gray-100 mt-2">
                            <button
                              onClick={handleProjectSave}
                              className="flex-1 py-3 bg-brand-point hover:bg-brand-accent text-white font-bold text-xs rounded-xl transition-all"
                            >
                              저장 활성화 및 등록하기
                            </button>
                            <button
                              onClick={() => {
                                setTempProject(null);
                                setIsAddingNewProject(false);
                              }}
                              className="px-5 py-3 bg-gray-100 hover:bg-gray-250/70 rounded-xl text-xs font-semibold text-brand-sub"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: SERVICES MANAGEMENT FORM */}
                  {activeTab === "services" && (
                    <div className="space-y-6" id="services-controller">
                      {!tempService ? (
                        <div className="space-y-4">
                          {services.map((svc) => (
                            <div
                              key={svc.id}
                              className="p-5 bg-white border border-gray-200 rounded-xl flex items-start justify-between gap-4"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-extrabold text-brand-text">{svc.title}</h4>
                                  <span className="text-[10px] text-brand-sub font-mono">{svc.englishTitle}</span>
                                </div>
                                <p className="text-xs text-brand-sub mt-1 leading-relaxed">{svc.description}</p>
                              </div>
                              <button
                                onClick={() => startEditingService(svc)}
                                className="p-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-brand-point shrink-0"
                                title="서비스 수정"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* EDIT SERVICE SUBFORM */
                        <div className="bg-white p-6 border border-gray-200 rounded-2xl text-left space-y-4">
                          <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-2">
                            <h4 className="text-sm font-extrabold text-brand-point uppercase">
                              서비스 정보 수정 - {tempService.title}
                            </h4>
                            <button onClick={() => setTempService(null)} className="text-xs text-brand-sub">
                              취소
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs font-bold text-brand-sub">업무 구분 국문명</label>
                              <input
                                type="text"
                                value={tempService.title}
                                onChange={(e) => setTempService({ ...tempService, title: e.target.value })}
                                className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm font-semibold"
                              />
                            </div>
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs font-bold text-brand-sub">업무 구분 영문명</label>
                              <input
                                type="text"
                                value={tempService.englishTitle}
                                onChange={(e) => setTempService({ ...tempService, englishTitle: e.target.value })}
                                className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm font-semibold font-mono"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="text-xs font-bold text-brand-sub">요약 설명</label>
                            <input
                              type="text"
                              value={tempService.description}
                              onChange={(e) => setTempService({ ...tempService, description: e.target.value })}
                              className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm"
                            />
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="text-xs font-bold text-brand-sub">세부 스코프 업무 범위 (줄바꿈 단위 기재)</label>
                            <textarea
                              rows={4}
                              value={tempService.details.join("\n")}
                              onChange={(e) => setTempService({
                                ...tempService,
                                details: e.target.value.split("\n").map((d) => d.trim()).filter((d) => d !== "")
                              })}
                              className="px-3.5 py-2 bg-brand-bg border border-gray-100 rounded-lg text-sm leading-relaxed"
                              placeholder="타깃 오디언스 분석&#10;상세 대본 기획 작성"
                            />
                          </div>

                          <div className="flex space-x-3 pt-4 border-t border-gray-100 mt-2">
                            <button
                              onClick={handleServiceSave}
                              className="flex-1 py-3 bg-brand-point hover:bg-brand-accent text-white font-bold text-xs rounded-xl"
                            >
                              저장하기
                            </button>
                            <button
                              onClick={() => setTempService(null)}
                              className="px-5 py-3 bg-gray-150 rounded-xl text-xs font-semibold text-brand-sub"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Status / Logout Bar */}
            <div className="p-6 bg-white border-t border-gray-200/50 flex items-center justify-between">
              {isAdmin ? (
                <div className="flex items-center justify-between w-full flex-wrap gap-4 font-sans">
                  {/* Glowing Sync Status */}
                  <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-lg">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping shrink-0" />
                    <div className="text-left">
                      <p className="text-[11px] leading-none font-bold text-emerald-800 flex items-center space-x-1">
                        <Cloud className="w-3.5 h-3.5 shrink-0 text-emerald-600 animate-pulse" />
                        <span>실시간 클라우드 동기화 성공</span>
                      </p>
                      <p className="text-[9px] font-semibold text-emerald-600 mt-0.5">모든 기기(모바일 포함)에 실시간 통일 적용 중</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Manual Force Sync Target Button */}
                    <button
                      type="button"
                      onClick={async () => {
                        const success = await syncToFirebase(profile, services, projects);
                        if (success) {
                          showSaveSuccess();
                          alert("🎉 [동기화 완료]\n현재 컴퓨터에서 수정한 모든 내용이 클라우드에 성공적으로 업로드되었습니다!\n이제 스마트폰(모바일) 및 다른 컴퓨터에서도 새로고침 시 이 내용이 즉시 똑같이 나타납니다.");
                        } else {
                          alert("동기화 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
                        }
                      }}
                      className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
                      title="클라우드로 수동 업로드 실행"
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                      <span>수동 동기화 실행</span>
                    </button>

                    {/* Exit Console Button */}
                    <button
                      onClick={async () => {
                        await logoutAdmin();
                      }}
                      className="p-2.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 transition-all rounded-lg flex items-center space-x-1 text-xs font-bold text-gray-500 cursor-pointer"
                      id="btn-admin-logout"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>로그아웃</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-[11px] text-brand-sub font-mono text-center w-full">
                  비밀번호 입력 시 실시간 클라이언트 전용 편집기가 즉시 활성화됩니다.
                </div>
              )}
            </div>

          </motion.div>

          {/* Toast feedback indicator */}
          <AnimatePresence>
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute bottom-6 left-6 p-4 bg-gray-900 border border-gray-800 text-white rounded-xl shadow-xl z-50 flex items-center space-x-2"
                id="toast-save-success"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold font-sans">성공적으로 반영되었습니다.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
