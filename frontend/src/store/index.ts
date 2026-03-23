import { create } from 'zustand';

interface User {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  username?: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;

  resume: any | null;
  setResume: (resume: any) => void;

  matchedJobs: any[];
  setMatchedJobs: (jobs: any[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // 用户状态
  user: null,
  setUser: (user) => set({ user }),

  // 简历状态
  resume: null,
  setResume: (resume) => set({ resume }),

  // 匹配职位状态
  matchedJobs: [],
  setMatchedJobs: (matchedJobs) => set({ matchedJobs }),
}));