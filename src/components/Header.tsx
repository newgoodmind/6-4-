import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Compass, Lock, Unlock } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface HeaderProps {
  onOpenAdmin: () => void;
}

export default function Header({ onOpenAdmin }: HeaderProps) {
  const { profile, isAdmin } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active section detection
      const sections = ["hero", "work", "about", "services", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
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

  const navItems = [
    { label: "Work", id: "work" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-bg/90 backdrop-blur-md border-b border-gray-200/50 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center space-x-2 text-left group transition-all"
          id="btn-logo"
        >
          <div className="w-9 h-9 bg-brand-point flex items-center justify-center rounded-lg shadow-sm group-hover:bg-brand-accent transition-colors">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-wider text-brand-text">
              {profile.englishName}
            </div>
            <div className="text-[10px] font-medium tracking-widest text-brand-sub uppercase">
              {profile.role}
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium tracking-wide transition-all relative py-1 hover:text-brand-accent ${
                activeSection === item.id
                  ? "text-brand-point font-semibold"
                  : "text-brand-sub"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-point rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
          
          {/* Admin Control Keylock icon */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center space-x-1 p-2 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
              isAdmin
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-gray-100 hover:bg-gray-200 border-gray-200 text-brand-sub hover:text-brand-text"
            }`}
            title="관리자 설정"
            id="btn-header-admin-trigger"
          >
            {isAdmin ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{isAdmin ? "Admin 활성" : "편집"}</span>
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-5 py-2 bg-brand-point hover:bg-brand-accent text-white font-medium text-xs rounded-full tracking-wider transition-all duration-200 shadow-sm hover:shadow"
            id="btn-header-contact"
          >
            프로젝트 문의
          </button>
        </nav>

        {/* Mobile Menu Button with embedded lock */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={onOpenAdmin}
            className={`flex items-center p-2 rounded-lg border text-xs font-semibold ${
              isAdmin
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-gray-100 border-gray-200 text-brand-sub"
            }`}
            id="btn-mobile-header-admin-trigger"
          >
            {isAdmin ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-brand-text hover:text-brand-accent focus:outline-none"
            aria-label="Toggle menu"
            id="btn-mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-brand-bg border-b border-gray-200"
            id="mobile-nav-panel"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-base font-semibold py-2.5 px-4 rounded-lg text-left transition-all ${
                    activeSection === item.id
                      ? "bg-white text-brand-point shadow-sm"
                      : "text-brand-text hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-3 bg-brand-point hover:bg-brand-accent text-white font-semibold text-center text-sm rounded-lg shadow-sm"
                  id="btn-mobile-contact"
                >
                  프로젝트 문의하기
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
