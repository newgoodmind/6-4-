import React from "react";
import { motion } from "motion/react";
import { Lightbulb, Video, Scissors, Smartphone, ArrowRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function ServicesSection() {
  const { services } = usePortfolio();

  const getIcon = (id: string) => {
    switch (id) {
      case "planning":
        return <Lightbulb className="w-7 h-7 text-white" />;
      case "production":
        return <Video className="w-7 h-7 text-white" />;
      case "editing":
        return <Scissors className="w-7 h-7 text-white" />;
      case "shortform":
        return <Smartphone className="w-7 h-7 text-white" />;
      default:
        return <Lightbulb className="w-7 h-7 text-white" />;
    }
  };

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-2 text-brand-accent font-semibold tracking-wider text-xs uppercase mb-3 justify-center">
            <span className="w-2 h-2 rounded-full bg-brand-accent" />
            <span>Core Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-text mb-4">
            제공 업무 및 전문 분야
          </h2>
          <p className="text-brand-sub max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            기획부터 완성까지, 영상 제작 각 단계마다 명확한 솔루션과 가치를 보장합니다.
          </p>
        </div>

        {/* Services 2x2 Bento Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-bg rounded-2xl p-8 md:p-10 border border-gray-100 hover:border-brand-accent/20 hover:bg-white shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col md:flex-row gap-6 items-start text-left"
              id={`service-card-${service.id}`}
            >
              {/* Decorative Icon Wrapper */}
              <div className="w-14 h-14 rounded-xl bg-brand-point flex items-center justify-center shrink-0 shadow-md group-hover:bg-brand-accent transition-colors">
                {getIcon(service.id)}
              </div>

              {/* Text Description Container */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-brand-text group-hover:text-brand-accent transition-colors whitespace-pre-wrap">
                      {service.title}
                    </h3>
                    <span className="text-[10px] font-bold text-brand-sub/70 font-mono tracking-wider">
                      {service.englishTitle}
                    </span>
                  </div>
                  <p className="text-brand-sub text-xs sm:text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                    {service.description}
                  </p>
                </div>

                {/* Scope of detail lists */}
                <div className="border-t border-gray-200/50 pt-4 mt-auto">
                  <span className="text-[10px] font-bold text-brand-point tracking-widest uppercase block mb-3">WORK SCOPE</span>
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-xs text-brand-text font-medium">
                        <ArrowRight className="w-3 h-3 text-brand-accent mr-2 shrink-0 transition-transform group-hover:translate-x-1" />
                        <span className="whitespace-pre-wrap">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
