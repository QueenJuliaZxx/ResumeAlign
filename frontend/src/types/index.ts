export interface Education {
  school: string;
  major: string;
  degree: string;
  duration: string;
}

export interface Experience {
  company: string;
  title: string;
  duration: string;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
}

export interface ResumeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: Education[];
  experience: Experience[];
  skills: {
    hard: string[];
    soft: string[];
  };
  projects: Project[];
  summary?: string;
  rawText?: string;
}

export interface JDBasics {
  title: string;
  company: string;
  salary: string;
  location: string;
  experience: string;
}

export interface JDData {
  id: string;
  basics: JDBasics;
  hardSkills: string[];
  softSkills: string[];
  businessRequirements: string[];
  coreResponsibilities: string[];
  hiddenRequirements: string[];
  abilityWeights: Record<string, number>;
  rawText?: string;
}

export interface GapAnalysis {
  requirement: string;
  current: string;
  gapLevel: 'low' | 'medium' | 'high';
}

export interface StarSuggestion {
  context: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface ComparisonResult {
  matchScore: number;
  highlights: string[];
  strengths: string[];
  weaknesses: string[];
  gaps: GapAnalysis[];
  atsKeywords: string[];
  starSuggestions: StarSuggestion[];
  optimizationSuggestions: string[];
}

export interface InterviewQuestion {
  question: string;
  type: 'technical' | 'behavioral' | 'hr';
  focus: string;
  sampleAnswer?: string;
}

export interface WeakResponse {
  weakness: string;
  response: string;
}

export interface InterviewGuide {
  questions: InterviewQuestion[];
  frameworks: Record<string, string>;
  weakResponses: WeakResponse[];
  preparationPoints: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  tags: string[];
  matchScore?: number;
  url: string;
  postedDate: string;
}

export interface JobFilters {
  keyword?: string;
  city?: string;
  salaryMin?: number;
  salaryMax?: number;
  experience?: string;
  jobType?: string;
}

export interface UploadProgress {
  status: 'idle' | 'uploading' | 'parsing' | 'done' | 'error';
  progress: number;
  message?: string;
}
