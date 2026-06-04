/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WorkSection from "./components/WorkSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";

function AppContent() {
  const { profile } = usePortfolio();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    // Dynamic page title for SEO & Professional feel
    document.title = `${profile.role} ${profile.name} | Portfolio`;
    
    // Smooth scrolling fallback configuration
    const handleInitialAnchor = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      }
    };
    
    window.addEventListener("load", handleInitialAnchor);
    return () => window.removeEventListener("load", handleInitialAnchor);
  }, [profile]);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-brand-accent selection:text-white" id="portfolio-app-root">
      {/* Dynamic Animated fixed Header */}
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Structural Content Segment */}
      <main className="flex-grow">
        {/* Dynamic Hero banner with call-to-actions */}
        <Hero />

        {/* Video Portfolio grid and modals (immediately readable under hero) */}
        <WorkSection />

        {/* Philosophy and About profile of Jihun Lee */}
        <AboutSection />

        {/* Dynamic Cards for Services deliverables */}
        <ServicesSection />

        {/* Fully operational interactive Proposal and Contact form */}
        <ContactSection />
      </main>

      {/* Global standard sleek Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Control panel slide over */}
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}

