import React from "react";
import { ArrowUp, Compass, Lock } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface FooterProps {
  onOpenAdmin: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-brand-text text-white py-12 px-6 md:px-12 border-t border-white/10" id="footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand visual column */}
        <div className="flex items-center space-x-3 text-left">
          <div className="w-8 h-8 bg-brand-accent flex items-center justify-center rounded-lg shadow">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-widest">{profile.englishName}</div>
            <div className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mt-0.5">
              {profile.role} PORTFOLIO
            </div>
          </div>
        </div>

        {/* Copyright notice columns */}
        <div className="text-center text-xs text-gray-400 font-sans flex flex-col md:flex-row items-center gap-2">
          <span>&copy; {new Date().getFullYear()} {profile.englishName}. All rights reserved.</span>
          <span className="hidden md:inline text-gray-600">|</span>
          <button
            onClick={onOpenAdmin}
            className="hover:text-white cursor-pointer transition-colors flex items-center gap-1 text-[11px] font-bold"
            id="btn-footer-settings-lock"
          >
            <Lock className="w-3 h-3 text-brand-accent" />
            <span>관리자 콘솔</span>
          </button>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all cursor-pointer shadow group"
          aria-label="맨 위로 가기"
          id="btn-scroll-top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
}
