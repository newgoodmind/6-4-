import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Instagram, ExternalLink, FileDown, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function ContactSection() {
  const { profile } = usePortfolio();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "브랜드 광고/필름",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const categories = [
    "브랜드 광고/필름",
    "유튜브 콘텐츠 구성/편집",
    "대본/기획구성 자문",
    "숏폼 단발/시리즈 제작",
    "기타 협업 문의"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("submitting");
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", category: "브랜드 광고/필름", message: "" });
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-brand-bg border-t border-gray-200/50 scroll-mt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-2 text-brand-accent font-semibold tracking-wider text-xs uppercase mb-3 justify-center">
            <span className="w-2 h-2 rounded-full bg-brand-accent" />
            <span>LET'S WORK TOGETHER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-text mb-4">
            프로젝트 의뢰 및 협업 문의
          </h2>
          <p className="text-brand-sub max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            프로젝트 문의나 협업 제안이 있다면 편하게 연락해주세요. 성심성의껏 답변드리겠습니다.
          </p>
        </div>

        {/* 2 Column Layout: Intro Info + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-content-grid">
          
          {/* Left Column: Direct channels and actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold text-brand-text mb-4">빠른 의뢰 채널</h3>
                <p className="text-brand-sub text-sm leading-relaxed mb-6">
                  메일링 폼 작성이 부담스러우시다면, 직접 활성화된 이메일 주소나 SNS 비즈니스 창구를 통해 연락하셔도 괜찮습니다.
                </p>

                {/* Info Card List */}
                <div className="space-y-4">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-brand-bg border border-gray-100 hover:border-brand-accent hover:bg-white transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-point/10 flex items-center justify-center text-brand-point group-hover:bg-brand-point group-hover:text-white transition-all shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-brand-sub tracking-widest uppercase block font-bold mb-0.5">DIRECT EMAIL</span>
                      <span className="text-sm font-semibold text-brand-text break-all block group-hover:text-brand-point transition-colors">
                        {profile.email}
                      </span>
                    </div>
                  </a>

                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-xl bg-brand-bg border border-gray-100 hover:border-brand-accent hover:bg-white transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all shrink-0">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-sub tracking-widest uppercase block font-bold mb-0.5">INSTAGRAM</span>
                      <span className="text-sm font-semibold text-brand-text block group-hover:text-brand-point transition-colors">
                        비즈니스 DM 보내기
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Utility Download Button & External Assets */}
              <div className="border-t border-gray-100 pt-8 mt-8 space-y-4">
                <h4 className="text-xs font-bold text-brand-sub uppercase tracking-wider mb-2">PRODUCER ASSETS</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={profile.resumeUrl}
                    className="flex-1 py-3 px-4 bg-brand-text hover:bg-brand-point text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-2 shadow-xs hover:shadow transition-all duration-200"
                    id="btn-download-portfolio"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>포트폴리오 PDF 다운로드</span>
                  </a>
                  <a
                    href={profile.youtubeChannel}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-4 bg-white border border-gray-200 text-brand-text text-xs hover:bg-gray-50 font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <span>유튜브 채널</span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-sub shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Mail Submission Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-xs">
              <h3 className="text-xl font-bold text-brand-text mb-6">온라인 문의 제안서</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col space-y-1.5 text-left">
                    <label htmlFor="name" className="text-xs font-bold text-brand-sub">
                      의뢰 기업 / 성함 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="예: 주식회사 에이아이 / 담당자명"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-brand-bg border border-gray-200 rounded-lg text-sm text-brand-text placeholder-gray-450 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all font-sans"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 text-left">
                    <label htmlFor="email" className="text-xs font-bold text-brand-sub">
                      회신 이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="example@yourdomain.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-brand-bg border border-gray-200 rounded-lg text-sm text-brand-text placeholder-gray-450 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5 text-left">
                  <label htmlFor="category" className="text-xs font-bold text-brand-sub">
                    프로젝트 대분류 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-brand-bg border border-gray-200 rounded-lg text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all font-sans"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col space-y-1.5 text-left">
                  <label htmlFor="message" className="text-xs font-bold text-brand-sub">
                    프로젝트 상세 내용 및 주요 타깃 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="프로젝트 기획 목적이나 현재 상황을 편안하게 서술해 주세요. 목표 런칭 일정 및 가이드 세부 스펙을 포함해 주시면 빠른 검토가 가능합니다."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-brand-bg border border-gray-200 rounded-lg text-sm text-brand-text placeholder-gray-450 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all font-sans resize-none"
                  />
                </div>

                {/* Submitting Feedback Controls */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={`w-full py-4 rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 tracking-wide transition-all ${
                      status === "submitting"
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-brand-point hover:bg-brand-accent text-white shadow-md hover:shadow-lg cursor-pointer"
                    }`}
                    id="btn-submit-contact-form"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-brand-sub/50 border-t-brand-point rounded-full animate-spin" />
                        <span>전송 요청 중...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>제안서 발송하기</span>
                      </>
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs sm:text-sm font-semibold flex items-center space-x-2"
                      id="submit-success-indicator"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>문의가 정상 발송되었습니다. 기재하신 회신 메일로 24시간 내 연락드리겠습니다.</span>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs font-semibold flex items-center space-x-2"
                      id="submit-error-indicator"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                      <span>기입되지 않은 필수 항목이 있습니다. 다시 확인해 주세요.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
