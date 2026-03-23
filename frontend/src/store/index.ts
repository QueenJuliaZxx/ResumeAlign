import { create } from 'zustand'

interface User {
  id?: string
  name?: string
  email?: string
  token?: string
}

interface AppState {
  user: User | null
  setUser: (user: User | null) => void
}

// 导出 useAppStore，和你页面里的导入名称完全一致
export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))