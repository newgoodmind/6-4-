export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  role: string;
  tools: string[];
  youtubeId: string;
  thumbnailUrl: string;
  year: string;
  client: string;
  highlights: string[];
}

export interface Service {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  details: string[];
}

export interface DeveloperProfile {
  name: string;
  englishName: string;
  role: string;
  tagline: string;
  subTagline: string;
  aboutText: string;
  email: string;
  instagram: string;
  youtubeChannel: string;
  notion: string;
  resumeUrl: string;
  mindsetQuote: string;
}

export const profileData: DeveloperProfile = {
  name: "이지훈",
  englishName: "JIHUN LEE",
  role: "영상 콘텐츠 PD",
  tagline: "목적에 맞는 기획과 명확한 구성으로\n완성도 있는 영상 콘텐츠를 만듭니다.",
  subTagline: "브랜드 콘텐츠, 유튜브 영상, 인터뷰, 홍보 영상 등 기획부터 구성, 편집까지 영상 제작 프로세스 전반을 총괄하고 시청자의 몰입을 설계합니다.",
  aboutText: "안녕하세요. 영상 콘텐츠의 기획과 구성을 중심으로 작업하는 콘텐츠 PD입니다. 브랜드 콘텐츠, 유튜브 영상, 인터뷰, 홍보 영상 등 다양한 포맷의 콘텐츠를 기획하고 제작합니다. 단순히 보기 좋은 영상을 만드는 것보다, 콘텐츠의 목적과 타깃을 이해하고 메시지가 자연스럽게 전달되는 흐름을 만드는 것을 중요하게 생각합니다. 기획 의도에 맞는 구성, 시청자가 이해하기 쉬운 전개, 안정적인 편집 방향을 바탕으로 완성도 있는 영상 콘텐츠를 만들어갑니다.",
  email: "producer.lee@example.com", // 임시 이메일이며 실제 비즈니스용 자리표시자
  instagram: "https://instagram.com",
  youtubeChannel: "https://youtube.com",
  notion: "https://notion.so",
  resumeUrl: "#", // 포트폴리오 다운로드 링크 자리
  mindsetQuote: "시청자가 길을 잃지 않는 흐름을 만드는 것, 그것이 PD의 명확한 역할이자 사명입니다."
};

export const servicesData: Service[] = [
  {
    id: "planning",
    title: "콘텐츠 기획",
    englishTitle: "Content Planning",
    description: "콘텐츠 목적과 타깃에 맞는 아이디어 기획, 구성안 작성, 스토리라인 설계",
    details: [
      "타깃 오디언스 분석 및 메시지 기획",
      "상세 구성안 및 촬영 대본 작성",
      "스토리라인 빌드 및 흐름 세부 조율"
    ]
  },
  {
    id: "production",
    title: "영상 제작 관리",
    englishTitle: "Video Production",
    description: "촬영 구성, 인터뷰 흐름, 장면 설계 등 영상 제작 과정 전반 관리",
    details: [
      "촬영 현장 디렉팅 및 인터뷰 질문 라인업 설계",
      "출연자 현장 조율 및 내러티브 실시간 빌딩",
      "일정 및 자원 분배 최적화"
    ]
  },
  {
    id: "editing",
    title: "컷 편집 & 구성",
    englishTitle: "Video Editing",
    description: "기획 의도에 맞는 컷 구성, 흐름 정리, 자막, 음악을 통한 영상 완성도 향상",
    details: [
      "메시지 전달력을 높이는 호흡 및 타이밍 편집 (Fine-Cut)",
      "정보 이해를 돕는 직관적인 텍스트 레이아웃 배치",
      "BGM 및 사운드 이펙트 튜닝을 통한 몰입감 제고"
    ]
  },
  {
    id: "shortform",
    title: "숏폼 콘텐츠 기획/제작",
    englishTitle: "Short-form Contents",
    description: "릴스, 쇼츠, 틱톡 등 짧은 시간 안에 메시지를 전달하는 숏폼 콘텐츠 기획 및 제작",
    details: [
      "3초 내 이탈 방지를 위한 핵심 후킹(Hook) 기획",
      "트렌디하고 속도감 있는 세로형 연출 레이아웃 설계",
      "가독성 높은 자막 텍스트와 하이라이트 편집"
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "project-1",
    category: "Brand Film",
    title: "Brand Film / Project Title 01",
    description: "브랜드의 핵심 가치와 메시지를 효과적으로 전달하기 위해 스토리라인을 정교하게 설계하고, 리듬감 있는 컷 편집으로 메시지 몰입도를 극대화한 브랜드 필름입니다.",
    role: "콘텐츠 기획 / 구성 / 편집",
    tools: ["Premiere Pro", "Photoshop"],
    youtubeId: "ScMzIvxBSi4", // Apple "Don't Blink" style video
    thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    year: "2024",
    client: "인디브랜드 CO.",
    highlights: ["초기 메시지 분석 및 타깃 인구 분석", "5가지 씬별 내러티브 일관성 유지", "배경 음악 리듬에 따른 프레임 단위 미세 편집"]
  },
  {
    id: "project-2",
    category: "YouTube Contents",
    title: "YouTube Contents / Project Title 02",
    description: "정보 전달력과 시청 지속 시간을 고려해 구성한 유튜브 콘텐츠 편집 작업입니다. 시청 이탈률을 방지하기 위한 이탈 보완용 정보 그래픽 및 실시간 템플릿 도입 등을 통해 유저 체류 시간을 확보했습니다.",
    role: "인터뷰 구성 / 촬영 구성 / 편집",
    tools: ["Premiere Pro", "Photoshop"],
    youtubeId: "-UX8p7S6G1s", // Google Year in Search style
    thumbnailUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4dd44?auto=format&fit=crop&q=80&w=1200",
    year: "2024",
    client: "Tech Insights 채널",
    highlights: ["인터뷰 흐름에 맞는 정보 자막 및 시각자료 유기적 매칭", "평균 시청 지속 시간 기존 대비 24% 상승", "텍스트 톤앤매칭 및 구성 노이즈 필터링"],
  },
  {
    id: "project-3",
    category: "Short-form Contents",
    title: "Short-form Contents / Project Title 03",
    description: "3인칭 관점을 벗어나 핵심 메시지를 5초 이내에 전달하기 위해 강력한 훅(Hook) 구조와 속도감 있는 호흡으로 설계하여 SNS 상에서 즉각적인 참여를 이끌어낸 모바일 환경 최적화 숏폼 콘텐츠입니다.",
    role: "숏폼 기획 / 편집 / 자막",
    tools: ["Premiere Pro", "Photoshop"],
    youtubeId: "7RMPvGg86SM", // High engagement animation format
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200",
    year: "2023",
    client: "컬처 스튜디오",
    highlights: ["초반 3초 하이라이트 후킹 앵커링 기획", "1.5배속 호흡의 오디오 템포 하이 피ッチ 유지", "릴스 조회수 15만회 달성 및 텍스트 캡션 설계"]
  }
];
