export type Language = 'en' | 'vi';

export interface Project {
  id: string;
  title: {
    vi: string;
    en: string;
  };
  category: 'powerbi' | 'python' | 'operations';
  categoryLabel: {
    vi: string;
    en: string;
  };
  summary: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  tools: string[];
  metrics: {
    label: { vi: string; en: string };
    value: string | { vi: string; en: string };
  }[];
  challenge: {
    vi: string;
    en: string;
  };
  solution: {
    vi: string;
    en: string;
  };
  impact: {
    vi: string;
    en: string;
  };
  image: string;
  featured?: boolean;
  keyFindings?: {
    title: { vi: string; en: string };
    detail: { vi: string; en: string };
    action: { vi: string; en: string };
  }[];
}

export interface Experience {
  id: string;
  role: {
    vi: string;
    en: string;
  };
  company: string;
  location: string;
  period: {
    vi: string;
    en: string;
  };
  isCurrent?: boolean;
  highlights: {
    vi: string[];
    en: string[];
  };
  coreSkills: string[];
  metrics: {
    value: string;
    label: { vi: string; en: string };
  }[];
}

export interface SkillCategory {
  title: {
    vi: string;
    en: string;
  };
  skills: {
    name: string;
    level: {
      vi: string;
      en: string;
    };
    context: {
      vi: string;
      en: string;
    };
  }[];
}
