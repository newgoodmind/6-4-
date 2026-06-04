import React from "react";
import { motion } from "motion/react";
import { Play, Send } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Hero() {
  const { profile } = usePortfolio();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 bg-gradient-to-b from-[#F2F2EF] to-[#F7F7F5] overflow-hidden"
    >
      {/* Background Decorative Subtle Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-point/5 rounded-full blur-3xl" />
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Subtitle Accent Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white border border-gray-200 shadow-xs rounded-full"
            id="hero-badge"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest text-brand-point uppercase">
              {profile.englishName} // {profile.role}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-text leading-[1.15] mb-8 max-w-3xl font-sans whitespace-pre-wrap"
            id="hero-headline"
          >
            {profile.tagline}
          </motion.h1>

          {/* Subtext Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-brand-sub max-w-2xl leading-relaxed mb-12 font-sans whitespace-pre-wrap"
            id="hero-description"
          >
            {profile.subTagline}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            id="hero-ctas"
          >
            <button
              onClick={() => scrollToSection("work")}
              className="w-full sm:w-auto px-8 py-4 bg-brand-point hover:bg-brand-accent text-white font-semibold text-sm rounded-lg tracking-wide transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group"
              id="btn-hero-work"
            >
              <Play className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
              <span>포트폴리오 확인</span>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-brand-text font-semibold text-sm rounded-lg tracking-wide transition-all duration-300 shadow-xs flex items-center justify-center space-x-2"
              id="btn-hero-contact"
            >
              <Send className="w-4 h-4 text-brand-sub" />
              <span>프로젝트 문의하기</span>
            </button>
          </motion.div>

          {/* Quick Stats Banner / Core Value Indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-3 gap-6 sm:gap-12 border-t border-gray-200/60 pt-8 w-full max-w-xl"
            id="hero-stats"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-point">100%</div>
              <div className="text-[11px] font-medium tracking-wider text-brand-sub uppercase mt-1">기획 매칭률</div>
            </div>
            <div className="text-center border-x border-gray-200/60 px-4">
              <div className="text-2xl sm:text-3xl font-bold text-brand-point">50+</div>
              <div className="text-[11px] font-medium tracking-wider text-brand-sub uppercase mt-1">성공 프로젝트</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-point">98%</div>
              <div className="text-[11px] font-medium tracking-wider text-brand-sub uppercase mt-1">파트너 만족도</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant scroll down indicator */}
      <motion.div
        initial={{ opacity: 0, b: "20px" }}
        animate={{ opacity: 0.6, y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer flex flex-col items-center"
        onClick={() => scrollToSection("work")}
        id="hero-scroll-indicator"
      >
        <span className="text-[10px] font-bold tracking-widest text-brand-sub uppercase mb-1">SCROLL</span>
        <div className="w-5 h-8 border-2 border-brand-sub/40 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-brand-sub rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
