import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X, Calendar, Users, FileText, Check } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { Project } from "../data";

export default function WorkSection() {
  const { projects } = usePortfolio();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Find the selected project from live context
  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  // Esc key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProjectId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-brand-accent font-semibold tracking-wider text-xs uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-accent" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-text mb-4">
                제작 프로젝트
              </h2>
              <p className="text-brand-sub max-w-2xl text-sm sm:text-base leading-relaxed">
                정밀한 채널 및 기획 기조 분석을 통해 브랜드 목표를 달성한 기획 영상 콘텐츠들입니다. 
                시청자 유지 전략에 최적화된 연출과 컷 배치를 지향합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-grid">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredCardId(project.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              onClick={() => setSelectedProjectId(project.id)}
              className="group bg-brand-bg rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 flex flex-col justify-between"
              id={`project-card-${project.id}`}
            >
              {/* Media Container with Thumbnail and Play Overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                <img
                  src={project.youtubeId ? `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg` : project.thumbnailUrl}
                  alt={`${project.title} 썸네일`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Black overlay on hover */}
                <div className="absolute inset-0 bg-brand-point/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    animate={hoveredCardId === project.id ? { scale: 1.15 } : { scale: 1 }}
                    className="w-14 h-14 rounded-full bg-white text-brand-point flex items-center justify-center shadow-lg"
                  >
                    <Play className="w-6 h-6 fill-brand-point text-brand-point ml-1" />
                  </motion.div>
                </div>

                {/* Upper Badge Category */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand-point/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider rounded-md uppercase">
                    {project.category}
                  </span>
                </div>

                {/* Year Badge */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded text-[10px] text-gray-300 font-semibold font-mono">
                  {project.year}
                </div>
              </div>

              {/* Text Information Description */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-brand-text mb-3 leading-snug group-hover:text-brand-accent transition-colors whitespace-pre-wrap">
                    {project.title}
                  </h3>
                  <p className="text-brand-sub text-xs sm:text-sm line-clamp-3 mb-6 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>

                {/* Meta details */}
                <div className="border-t border-gray-200/60 pt-4 flex flex-col space-y-3.5">
                  <div className="flex items-start text-xs">
                    <span className="w-14 shrink-0 text-brand-point font-bold">담당 역할</span>
                    <span className="text-brand-text font-medium text-xs break-all leading-tight whitespace-pre-wrap">{project.role}</span>
                  </div>
                  <div className="flex items-start text-xs">
                    <span className="w-14 shrink-0 text-brand-point font-bold">사용 툴</span>
                    <div className="flex flex-wrap gap-1.5 leading-none">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 bg-gray-200/50 rounded text-[11px] text-brand-sub font-semibold font-sans border border-gray-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Player & Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
              onClick={() => setSelectedProjectId(null)}
              id="work-modal-backdrop"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="bg-brand-bg rounded-2xl overflow-hidden w-full max-w-5xl shadow-2xl relative my-8"
                onClick={(e) => e.stopPropagation()}
                id="work-modal-container"
              >
                {/* Close Button Button */}
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all shadow border border-white/10"
                  aria-label="닫기"
                  id="btn-close-modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* 16:9 Aspect Video Player */}
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1&rel=0`}
                    title={selectedProject.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>

                {/* Metadata Details in Layout */}
                <div className="p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 text-brand-point text-xs font-semibold rounded-md uppercase tracking-wider">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs text-brand-sub font-medium font-sans flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {selectedProject.year} 제작
                    </span>
                    <span className="text-xs text-brand-sub font-medium font-sans flex items-center">
                      <Users className="w-3.5 h-3.5 ml-1 mr-1 text-xs shrink-0" />
                      클라이언트: {selectedProject.client}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-brand-text mb-4 leading-tight whitespace-pre-wrap text-left">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                    {/* Left Column Description */}
                    <div className="lg:col-span-12 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-brand-point uppercase tracking-widest mb-2 flex items-center">
                          <FileText className="w-4 h-4 mr-1 text-brand-point" />
                          프로젝트 개요 및 기획 의도
                        </h4>
                        <div className="text-brand-text text-sm sm:text-base leading-relaxed text-left bg-white/70 p-6 border border-gray-200/50 rounded-xl whitespace-pre-wrap">
                          {selectedProject.description}
                        </div>
                      </div>
                    </div>

                    {/* Full Width Specification Panels */}
                    <div className="lg:col-span-12 bg-white p-6 border border-gray-200/60 rounded-xl">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div>
                          <h4 className="text-xs font-bold text-brand-sub uppercase tracking-wider mb-2">담당 핵심 성과</h4>
                          <ul className="space-y-2 text-xs text-brand-text font-medium">
                            {selectedProject.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start">
                                <Check className="w-4 h-4 mr-2 text-brand-accent shrink-0 mt-0.5" />
                                <span className="whitespace-pre-wrap">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-[11px] font-bold text-brand-sub uppercase tracking-wider mb-1">수행 업무</h4>
                          <p className="text-xs text-brand-text font-semibold leading-relaxed whitespace-pre-wrap">{selectedProject.role}</p>
                        </div>

                        <div>
                          <h4 className="text-[11px] font-bold text-brand-sub uppercase tracking-wider mb-1.5">사용 솔루션</h4>
                          <div className="flex flex-wrap gap-1 leading-none">
                            {selectedProject.tools.map((theTool) => (
                              <span key={theTool} className="px-2 py-0.5 bg-brand-bg rounded text-[10px] font-bold text-brand-sub border border-gray-200">
                                {theTool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
