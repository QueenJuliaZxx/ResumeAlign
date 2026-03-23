import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { FileText, Search, BarChart3, ChevronRight, Sparkles, Zap, Shield } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { resume, jd } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">ResumeAlign</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-500">首页</Link>
            <Link to="/resume/upload" className="text-sm font-medium text-slate-600 hover:text-indigo-500">简历解析</Link>
            <Link to="/jd/parser" className="text-sm font-medium text-slate-600 hover:text-indigo-500">JD解析</Link>
            {resume && jd && (
              <Link to="/compare" className="text-sm font-medium text-indigo-500">对比分析</Link>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-slate-800 mb-6">
              AI驱动，精准求职
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              从简历解析到面试指导，ResumeAlign 提供一站式AI求职辅助服务，
              让您的求职之路更加高效精准
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/resume/upload"
                className="px-8 py-4 bg-indigo-500 text-white rounded-xl font-medium text-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
              >
                立即开始 <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/match"
                className="px-8 py-4 border border-slate-300 text-slate-700 rounded-xl font-medium text-lg hover:bg-white transition-colors"
              >
                搜索岗位
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-12">核心功能</h2>
            <div className="grid grid-cols-3 gap-8">
              <Link to="/resume/upload" className="group">
                <div className="bg-slate-50 rounded-2xl p-8 h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:bg-indigo-500 transition-colors">
                    <FileText className="w-7 h-7 text-indigo-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">简历智能解析</h3>
                  <p className="text-slate-600 mb-4">
                    支持PDF/DOCX格式，自动提取结构化信息，精准识别技能与经历
                  </p>
                  <span className="text-indigo-500 font-medium flex items-center gap-1">
                    立即体验 <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>

              <Link to="/jd/parser" className="group">
                <div className="bg-slate-50 rounded-2xl p-8 h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                    <Search className="w-7 h-7 text-emerald-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">JD深度解析</h3>
                  <p className="text-slate-600 mb-4">
                    一键解析职位描述，提取硬技能、软技能、核心职责与隐性需求
                  </p>
                  <span className="text-emerald-500 font-medium flex items-center gap-1">
                    立即体验 <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>

              <Link to={resume && jd ? '/compare' : '/resume/upload'} className="group">
                <div className="bg-slate-50 rounded-2xl p-8 h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                    <BarChart3 className="w-7 h-7 text-amber-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">深度对比分析</h3>
                  <p className="text-slate-600 mb-4">
                    智能匹配度评分，精准识别差距，提供可落地的优化建议
                  </p>
                  <span className="text-amber-500 font-medium flex items-center gap-1">
                    立即体验 <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-12">快速流程</h2>
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold text-slate-800 mb-2">上传简历</h3>
                <p className="text-sm text-slate-500">PDF或DOCX格式</p>
              </div>
              <ChevronRight className="w-8 h-8 text-slate-300 flex-shrink-0" />
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold text-slate-800 mb-2">解析JD</h3>
                <p className="text-sm text-slate-500">粘贴或导入岗位</p>
              </div>
              <ChevronRight className="w-8 h-8 text-slate-300 flex-shrink-0" />
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold text-slate-800 mb-2">深度对比</h3>
                <p className="text-sm text-slate-500">获取匹配报告</p>
              </div>
              <ChevronRight className="w-8 h-8 text-slate-300 flex-shrink-0" />
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold text-slate-800 mb-2">面试指导</h3>
                <p className="text-sm text-slate-500">获取面试题库</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">高效精准</h3>
                  <p className="text-sm text-slate-600">AI算法驱动，解析准确率超过95%</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">隐私保护</h3>
                  <p className="text-sm text-slate-600">本地处理，仅传输必要数据</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">专业指导</h3>
                  <p className="text-sm text-slate-600">基于真实岗位需求定制方案</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>© 2024 ResumeAlign. 仅供求职辅助使用，不代写简历。</p>
        </div>
      </footer>
    </div>
  );
};
