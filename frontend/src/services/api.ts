import axios from 'axios';
import type { ResumeData, JDData, ComparisonResult, InterviewGuide, Job, JobFilters } from '../types';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
});

export const resumeApi = {
  parse: async (text?: string, file?: File): Promise<ResumeData> => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post<ResumeData>('/resume/parse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    }
    const response = await api.post<ResumeData>('/resume/parse', { text });
    return response.data;
  },
};

export const jdApi = {
  parse: async (text: string): Promise<JDData> => {
    const response = await api.post<JDData>('/jd/parse', { text });
    return response.data;
  },
};

export const compareApi = {
  analyze: async (resume: ResumeData, jd: JDData): Promise<ComparisonResult> => {
    const response = await api.post<ComparisonResult>('/compare', { resume, jd });
    return response.data;
  },
};

export const interviewApi = {
  generate: async (resume: ResumeData, jd: JDData, comparison: ComparisonResult): Promise<InterviewGuide> => {
    const response = await api.post<InterviewGuide>('/interview/generate', { resume, jd, comparison });
    return response.data;
  },
};

export const matchApi = {
  search: async (filters: JobFilters): Promise<{ jobs: Job[]; total: number }> => {
    const response = await api.post<{ jobs: Job[]; total: number }>('/match/jobs', { filters });
    return response.data;
  },
};

export const reportApi = {
  generate: async (type: 'comparison' | 'interview', data: unknown): Promise<{ url: string }> => {
    const response = await api.post<{ url: string }>('/report/generate', { type, data });
    return response.data;
  },
};
