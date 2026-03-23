import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { Button, Card, CardContent } from '../components/ui';
import { JDCard } from '../components/business';
import { mockJD } from '../services/mockData';
import { ArrowLeft, ArrowRight, Loader, Brain, Zap, Sparkles } from 'lucide-react';
import type { UploadProgress } from '../types';

export const JDParserPage: React.FC = () => {
  const { jd, setJD, resume } = useAppStore();
  const [jdText, setJdText] = useState('');
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({ status: 'idle', progress: 0 });

  const handleTextParse = useCallback(async () => {
    if (!jdText.trim()) return;
    setUploadProgress({ status: 'parsing', progress: 30, message: '正在解析JD...' });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploadProgress({ status: 'parsing', progress: 70, message: '提取关键信息...' });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setJD(mockJD);
    setUploadProgress({ status: 'done', progress: 100, message: '解析完成！' });
  }, [jdText, setJD]);

  const handleUseDemo = useCallback(async () => {
    setUploadProgress({ status: 'parsing', progress: 50, message: '加载示例数据...' });
    await new Promise(resolve => setTimeout(resolve, 800));
    setJD(mockJD);
    setUploadProgress({ status: 'done', progress: 100, message: '加载完成！' });
  }, [setJD]);

  const handleReset = useCallback(() => {
    setJD(null);
    setUploadProgress({ status: 'idle', progress: 0 });
    setJdText('');
  }, [setJD]);

  const isLoading = uploadProgress.status === 'parsing';

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">JD智能解析</h1>
            <p className="text-sm text-slate-500">粘贴职位描述，获取结构化分析</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {!jd ? (
          <div className="space-y-6">
            <Card>
              <CardContent>
                <h3 className="font-medium text-slate-800 mb-3">粘贴职位描述</h3>
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="在此粘贴完整的职位描述（JD）内容..."
                  className="w-full h-64 p-4 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="flex justify-between items-center mt-4">
                  <Button variant="ghost" onClick={() => setJdText('')}>
                    清空
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={handleUseDemo} loading={isLoading}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      使用示例
                    </Button>
                    <Button onClick={handleTextParse} loading={isLoading} disabled={!jdText.trim()}>
                      <Brain className="w-4 h-4 mr-2" />
                      智能解析
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isLoading && (
              <Card>
                <CardContent className="flex items-center gap-4 py-8">
                  <Loader className="w-6 h-6 text-indigo-500 animate-spin" />
                  <div>
                    <p className="font-medium text-slate-800">{uploadProgress.message}</p>
                    <div className="w-48 h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 transition-all duration-300"
                        style={{ width: `${uploadProgress.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent>
                <h3 className="font-medium text-slate-800 mb-4">解析能力</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">硬技能</p>
                      <p className="text-xs text-slate-500">技术栈要求</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">软技能</p>
                      <p className="text-xs text-slate-500">综合能力</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">隐性需求</p>
                      <p className="text-xs text-slate-500">隐藏条件</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">解析结果</h2>
              <Button variant="ghost" onClick={handleReset}>
                重新解析
              </Button>
            </div>

            <JDCard jd={jd} />

            <div className="flex justify-between items-center pt-4">
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </Link>
              <div className="flex gap-4">
                <Link to="/resume/upload">
                  <Button variant="secondary">
                    解析简历
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                {resume && (
                  <Link to="/compare">
                    <Button>
                      开始对比
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
