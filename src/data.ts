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
  name: "이규상",
  englishName: "KYUSANG",
  role: "콘텐츠 PD",
  tagline: "목적에 맞는 기획과 명확한 구성\n완성도 있는 영상 콘텐츠",
  subTagline: "브랜드 콘텐츠, 유튜브 영상, 인터뷰, 홍보 영상 등 \n다양한 포맷의 콘텐츠를 기획부터 구성, 편집까지 함께하며 \n메시지가 명확하게 전달되는 흐름을 설계합니다.",
  aboutText: "안녕하세요. \n영상 콘텐츠의 기획과 구성을 중심으로 작업하는 콘텐츠 PD입니다.\n\n브랜드 콘텐츠, 유튜브 영상, 인터뷰, 홍보 영상 등 \n다양한 포맷의 콘텐츠를 기획하고 제작합니다.\n\n콘텐츠의 목적과 타깃을 이해하고, \n메시지가 자연스럽게 전달되는 흐름을 설계하는 것을 중요하게 생각합니다.\n\n기획 의도에 맞는 구성과 안정적인 편집을 바탕으로 \n완성도 있는 영상 콘텐츠를 만들어갑니다.",
  email: "dlrbtkd951@naver.com",
  instagram: "https://www.instagram.com/1eetkd",
  youtubeChannel: "https://youtube.com/@1eetkd951?si=vK1cDn_yJ0kgACic",
  notion: "https://notion.so",
  resumeUrl: "https://drive.google.com/file/d/1stsH2fIajlzP_WqPhLJI2pa-Esw5PAoC/view?usp=sharing",
  mindsetQuote: "좋은 콘텐츠는 명확한 메시지와 자연스러운 흐름에서 시작됩니다."
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
    title: "Brand Film / 강화도 달모루 캠핑장 홍보영상",
    description: "강화도 달모루 캠핑장 홍보영상입니다.\n\n자연 속 캠핑장의 아름다운 전경과 함께 달모루 카페의 감성적인 분위기,  정성스럽게 내려지는 커피의 모습을 담았습니다.",
    role: "콘텐츠 기획 / 촬영 / 편집",
    tools: [
      "Premiere Pro",
      "Illustrator"
    ],
    youtubeId: "QMpjjjR4fdc",
    thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    year: "2026",
    client: "달모루 캠핑장",
    highlights: []
  },
  {
    id: "project-2",
    category: "Award-Winning",
    title: "Award-Winning / 피로를 해피로 바까스!",
    description: "「동아제약 협업 교내 학술제」 최우수상 수상작.\n반복되는 일상의 피로를 유쾌한 행복으로 바꾸는\n박카스의 브랜드 메시지를 감각적이고 긍정적으로 표현한 광고영상입니다",
    role: "콘텐츠 기획 / 촬영 / 편집",
    tools: [
      "Premiere Pro",
      "After Effects"
    ],
    youtubeId: "MBsM9YCWCYs",
    thumbnailUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4dd44?auto=format&fit=crop&q=80&w=1200",
    year: "2021",
    client: "[박카스X광고영상제]",
    highlights: []
  },
  {
    id: "project-3",
    category: "YouTube Contents",
    title: "YouTube Contents / 요플레 Yoplay",
    description: "일상의 작은 순간들을 감성적인 요리와\t따뜻한 음악으로 풀어낸 요리 플레이리스트 Vlog입니다.\n누구나 따라 하기 쉬운 레시피와 편안한 음악이 어우러져 힐링의 시간을 선사합니다.\n잔잔한 영상미와 감성적인 연출을 통해\t요리하는 과정에서 느끼는 일상의 여유와 따스함을 표현했습니다.",
    role: "콘텐츠 기획 / 촬영 / 편집",
    tools: [
      "Premiere Pro",
      "After Effects"
    ],
    youtubeId: "pXtWe7DcPFE",
    thumbnailUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200",
    year: "2021",
    client: "요플레 Yoplay",
    highlights: []
  },
  {
    id: "project-1780554061998",
    category: "YouTube Contents",
    title: "YouTube Contents / Instargram",
    description: "지나간 추억과 공허함을 서정적으로 그려낸 뮤직비디오.\n이별 후 느끼는 공허와 외로움을 차갑고 쓸쓸한 영상미로 담담하게 표현한 서정적 뮤직비디오입니다.\n절제된 연출을 통해 음악의 감성을 더욱 깊이 있게 전달하고자 했습니다.",
    role: "콘텐츠 기획 / 구성 / 편집",
    tools: [
      "Premiere Pro"
    ],
    youtubeId: "djIpLbGPo_s",
    thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    year: "2021",
    client: "",
    highlights: []
  },
  {
    id: "project-1780554142802",
    category: "Brand Film",
    title: "Interview Video / 부평우리치과 환자 인터뷰",
    description: "부평우리치과 환자의 진료 경험을 자연스럽게 전달하기 위해 제작한 인터뷰 영상입니다. \n인터뷰이의 답변 흐름을 정리하고, 병원의 신뢰감과 메시지가 명확하게 드러나도록 진행했습니다.",
    role: "콘텐츠 기획 / 촬영 / 편집",
    tools: [
      "Premiere Pro"
    ],
    youtubeId: "y1trsPoQPBo",
    thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    year: "2026",
    client: "",
    highlights: []
  },
  {
    id: "project-1780554146740",
    category: "YouTube Contents",
    title: "YouTube Contents / 벚꽃소년",
    description: "프로그램 사이의 여유로운 연결(필러)을 목적으로 제작된 30초 애니메이션.\n\n봄의 설렘과 벚꽃이 지닌 따뜻함을 소년의 시선으로 \n아름답고 포근하게 담아낸 30초 힐링 애니메이션입니다.",
    role: "콘텐츠 기획 / 구성 / 편집",
    tools: [
      "After Effects",
      "Illustrator"
    ],
    youtubeId: "s5HG29kH3Dk",
    thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    year: "2021",
    client: "",
    highlights: []
  }
];

