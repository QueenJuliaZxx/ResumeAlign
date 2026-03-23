import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { Button, Card, CardContent } from '../components/ui';
import { InterviewGuideView } from '../components/business';
import { mockInterview } from '../services/mockData';
import { ArrowLeft, Download, Loader, FileText, Zap } from 'lucide-react';
import type { UploadProgress } from '../types';

export const InterviewPage: React.FC = () => {
  const { interview, setInterview, comparison } = useAppStore();
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({ status: 'idle', progress: 0 });

  const handleGenerate = useCallback(async () => {
    setUploadProgress({ status: 'parsing', progress: 30, message: '正在生成面试题库...' });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploadProgress({ status: 'parsing', progress: 70, message: '生成应答框架...' });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setInterview(mockInterview);
    setUploadProgress({ status: 'done', progress: 100, message: '生成完成！' });
  }, [setInterview]);

  const handleExportPDF = useCallback(() => {
    alert('PDF导出功能开发中...');
  }, []);

  const isLoading = uploadProgress.status === 'parsing';

  if (!comparison) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">面试指导</h1>
              <p className="text-sm text-slate-500">请先完成对比分析</p>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-slate-600 mb-6">请先完成简历与JD的对比分析</p>
          <Link to="/compare">
            <Button>前往对比分析</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/compare" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">面试指导</h1>
              <p className="text-sm text-slate-500">基于对比结果生成个性化面试题库</p>
            </div>
          </div>
          {interview && (
            <Button variant="outline" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              导出PDF
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {!interview ? (
          <div className="space-y-8">
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  AI智能生成面试题库
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  基于您的简历与目标JD的对比分析，生成个性化的高频面试题、
                  应答框架和短板应对话术
                </p>
                <Button onClick={handleGenerate} loading={isLoading} size="lg">
                  <FileText className="w-5 h-5 mr-2" />
                  生成面试指导
                </Button>

                {isLoading && (
                  <div className="mt-8 flex flex-col items-center">
                    <Loader className="w-6 h-6 text-indigo-500 animate-spin mb-4" />
                    <p className="text-slate-600">{uploadProgress.message}</p>
                    <div className="w-64 h-2 bg-slate-200 rounded-full mt-4 overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 transition-all duration-300"
                        style={{ width: `${uploadProgress.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <div className="text-3xl font-bold text-indigo-500 mb-2">6+</div>
                <p className="text-sm text-slate-600">高频面试题</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <div className="text-3xl font-bold text-emerald-500 mb-2">4</div>
                <p className="text-sm text-slate-600">应答框架</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">5+</div>
                <p className="text-sm text-slate-600">备战重点</p>
              </div>
            </div>
          </div>
        ) : (
          <InterviewGuideView guide={interview} />
        )}
      </main>
    </div>
  );
};
