import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeData, JDData, ComparisonResult, InterviewGuide, Job, JobFilters, UploadProgress } from '../types';

interface AppState {
  resume: ResumeData | null;
  jd: JDData | null;
  comparison: ComparisonResult | null;
  interview: InterviewGuide | null;
  matchedJobs: Job[];
  jobFilters: JobFilters;
  uploadProgress: UploadProgress;
  
  setResume: (resume: ResumeData | null) => void;
  setJD: (jd: JDData | null) => void;
  setComparison: (comparison: ComparisonResult | null) => void;
  setInterview: (interview: InterviewGuide | null) => void;
  setMatchedJobs: (jobs: Job[]) => void;
  setJobFilters: (filters: JobFilters) => void;
  setUploadProgress: (progress: UploadProgress) => void;
  reset: () => void;
}

const initialProgress: UploadProgress = {
  status: 'idle',
  progress: 0,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      resume: null,
      jd: null,
      comparison: null,
      interview: null,
      matchedJobs: [],
      jobFilters: {},
      uploadProgress: initialProgress,

      setResume: (resume) => set({ resume }),
      setJD: (jd) => set({ jd }),
      setComparison: (comparison) => set({ comparison }),
      setInterview: (interview) => set({ interview }),
      setMatchedJobs: (matchedJobs) => set({ matchedJobs }),
      setJobFilters: (jobFilters) => set({ jobFilters }),
      setUploadProgress: (uploadProgress) => set({ uploadProgress }),
      reset: () => set({
        resume: null,
        jd: null,
        comparison: null,
        interview: null,
        matchedJobs: [],
        jobFilters: {},
        uploadProgress: initialProgress,
      }),
    }),
    {
      name: 'resume-align-storage',
      partialize: (state) => ({
        resume: state.resume,
        jd: state.jd,
        comparison: state.comparison,
        interview: state.interview,
      }),
    }
  )
);
