import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { Sparkles, User, LogOut, Settings, History, ChevronDown, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, reset } = useAppStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = useCallback(() => {
    setUser(null);
    reset();
    setShowUserMenu(false);
    navigate('/');
  }, [setUser, reset, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">ResumeAlign</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-500">首页</Link>
            <Link to="/resume/upload" className="text-sm font-medium text-slate-600 hover:text-indigo-500">简历解析</Link>
            <Link to="/jd/parser" className="text-sm font-medium text-slate-600 hover:text-indigo-500">JD解析</Link>
            <Link to="/match" className="text-sm font-medium text-slate-600 hover:text-indigo-500">岗位匹配</Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full" />
                    ) : (
                      <User className="w-4 h-4 text-indigo-500" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{user.username}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="font-medium text-slate-800">{user.username}</p>
                      <p className="text-sm text-slate-500">{user.email || user.phone}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        个人资料
                      </Link>
                      <Link
                        to="/history"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <History className="w-4 h-4" />
                        历史记录
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4" />
                        设置
                      </Link>
                    </div>
                    <div className="border-t border-slate-100 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        退出登录
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-500"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
                >
                  注册
                </Link>
              </div>
            )}

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-slate-600 hover:text-indigo-500"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-100 pt-4">
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-500" onClick={() => setShowMobileMenu(false)}>首页</Link>
              <Link to="/resume/upload" className="text-sm font-medium text-slate-600 hover:text-indigo-500" onClick={() => setShowMobileMenu(false)}>简历解析</Link>
              <Link to="/jd/parser" className="text-sm font-medium text-slate-600 hover:text-indigo-500" onClick={() => setShowMobileMenu(false)}>JD解析</Link>
              <Link to="/match" className="text-sm font-medium text-slate-600 hover:text-indigo-500" onClick={() => setShowMobileMenu(false)}>岗位匹配</Link>
              {!user && (
                <div className="flex gap-3 mt-2 pt-2 border-t border-slate-100">
                  <Link to="/login" className="flex-1 text-center py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg" onClick={() => setShowMobileMenu(false)}>
                    登录
                  </Link>
                  <Link to="/register" className="flex-1 text-center py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg" onClick={() => setShowMobileMenu(false)}>
                    注册
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
