import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function AboutSection() {
  const { profile } = usePortfolio();

  const skillsList = [
    { name: "핵심 타깃 분석 및 아이디어 수립", description: "브랜드 목적과 유저 니즈를 관통하는 정밀 기획" },
    { name: "상세 대본 및 씬 구성 설계", description: "논리적 흐름과 시청 흐름 유지를 고려한 오디오/비주얼 스토리보딩" },
    { name: "촬영 디렉팅 및 인터뷰 흐름 관리", description: "현장에서 최고의 메시지를 끌어내는 질문 설계" },
    { name: "몰입도 높은 리드미컬 컷 구성", description: "이탈율을 줄이고 끝까지 눈을 뗄 수 없게 만드는 리드미컬한 프레임 컷 설계" }
  ];

  const toolsList = [
    { name: "Adobe Premiere Pro", level: "최상", desc: "핵심 컷 편집, 자막 구성, 사운드 믹싱, 마스터 컴포지션" },
    { name: "Adobe Photoshop", level: "상", desc: "유튜브 썸네일 자산 및 영상 삽입용 모바일 리소스 가공" }
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-brand-bg border-y border-gray-200/50 scroll-mt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-brand-accent font-semibold tracking-wider text-xs uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-accent" />
            <span>ABOUT PRODUCER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-text">
            콘텐츠 PD의 기획 가치
          </h2>
        </div>

        {/* Dynamic Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="about-content">
          
          {/* Left Column: Philosophical text and introduction */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-xs leading-relaxed text-left"
            >
              {/* Profile Card Intro Label */}
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-brand-point/10 flex items-center justify-center text-brand-point text-lg font-bold">
                  PD
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-text mb-0.5">{profile.name}</h3>
                  <p className="text-xs text-brand-sub font-semibold">{profile.role} // Creative Producer</p>
                </div>
              </div>

              {/* Mindset Statement */}
              <p className="text-base sm:text-lg font-bold text-brand-point mb-6 leading-relaxed">
                &ldquo;{profile.mindsetQuote || "시청자가 길을 잃지 않는 흐름을 만드는 것, 그것이 PD의 명확한 역할이자 사명입니다."}&rdquo;
              </p>

              {/* Main introduction copy with strict alignment */}
              <div className="text-brand-sub text-sm sm:text-base font-sans text-justify whitespace-pre-wrap leading-relaxed">
                {profile.aboutText}
              </div>
            </motion.div>

            {/* Core Competencies highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-left"
            >
              <h4 className="text-sm font-bold text-brand-point tracking-widest uppercase mb-4">CORE CAPABILITIES</h4>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                {skillsList.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3.5 bg-white p-4.5 rounded-xl border border-gray-200/40 shadow-2xs hover:border-gray-300 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-brand-text">{skill.name}</div>
                      <div className="text-xs text-brand-sub mt-0.5">{skill.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Workflow focus & Professional technical toolchains */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {/* Tool chain display stack */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs"
              id="about-tools-card"
            >
              <h3 className="text-lg font-bold text-brand-text mb-6 flex items-center">
                <ChevronRight className="w-5 h-5 text-brand-accent mr-1 shrink-0" />
                사용 기구 및 협업 환경
              </h3>
              
              <div className="space-y-5">
                {toolsList.map((tool, index) => (
                  <div key={index} className="flex flex-col space-y-1.5 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-extrabold text-brand-text">{tool.name}</span>
                      <span className="px-2 py-0.5 bg-brand-accent/10 border border-brand-accent/20 rounded text-[10px] text-brand-point font-bold font-mono">
                        숙련도: {tool.level}
                      </span>
                    </div>
                    <p className="text-xs text-brand-sub leading-relaxed">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Client-Centric Guarantee Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-brand-point to-[#0F172A] p-8 rounded-2xl text-white shadow-md relative overflow-hidden"
              id="about-guarantee-card"
            >
              {/* Decor absolute circles */}
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-white/5 rounded-full" />
              
              <h3 className="text-lg font-bold mb-4 relative z-10 flex items-center">
                <span className="w-2 h-2 rounded-full bg-white mr-2.5" />
                협업의 세 가지 원칙
              </h3>
              <ul className="space-y-4 text-xs font-medium text-gray-200 relative z-10">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-bold mr-3 shrink-0 mt-0.5">01</div>
                  <div>
                    <strong className="text-white block text-sm font-semibold mb-0.5">기획과의 완벽한 유기성</strong>
                    <span>중간 과정 변형 없이 시나리오의 핵심 맥락을 완벽히 비주얼에 녹입니다.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-bold mr-3 shrink-0 mt-0.5">02</div>
                  <div>
                    <strong className="text-white block text-sm font-semibold mb-0.5">효율적인 데드라인 통제</strong>
                    <span>정밀한 스케줄 로드맵 설계를 바탕으로 약속된 제작 일정을 철저히 준수합니다.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-bold mr-3 shrink-0 mt-0.5">03</div>
                  <div>
                    <strong className="text-white block text-sm font-semibold mb-0.5">유기적인 소통 피드백</strong>
                    <span>다각도의 피드백을 유연하게 수렴하여 클라이언트의 비전에 가장 가까운 결과물을 도출합니다.</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
