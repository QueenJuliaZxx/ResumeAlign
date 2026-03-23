import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { Button, Card, CardContent } from '../components/ui';
import { ResumeCard, JDCard, ComparisonResult } from '../components/business';
import { mockComparison } from '../services/mockData';
import { ArrowLeft, ArrowRight, Loader, Download, FileText, MessageSquare } from 'lucide-react';
import type { UploadProgress } from '../types';

export const ComparePage: React.FC = () => {
  const { resume, jd, comparison, setComparison } = useAppStore();
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({ status: 'idle', progress: 0 });

  const handleCompare = useCallback(async () => {
    if (!resume || !jd) return;

    setUploadProgress({ status: 'parsing', progress: 30, message: '正在分析简历与JD匹配度...' });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploadProgress({ status: 'parsing', progress: 70, message: '生成优化建议...' });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setComparison(mockComparison);
    setUploadProgress({ status: 'done', progress: 100, message: '分析完成！' });
  }, [resume, jd, setComparison]);

  const handleExportPDF = useCallback(() => {
    alert('PDF导出功能开发中...');
  }, []);

  const isLoading = uploadProgress.status === 'parsing';

  if (!resume || !jd) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">简历-JD对比分析</h1>
              <p className="text-sm text-slate-500">请先上传简历和JD</p>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-slate-600 mb-6">请先完成简历上传和JD解析</p>
          <div className="flex gap-4 justify-center">
            <Link to="/resume/upload">
              <Button>上传简历</Button>
            </Link>
            <Link to="/jd/parser">
              <Button variant="secondary">解析JD</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">简历-JD对比分析</h1>
              <p className="text-sm text-slate-500">深度对比，精准定位差距</p>
            </div>
          </div>
          <div className="flex gap-3">
            {comparison && (
              <>
                <Button variant="outline" onClick={handleExportPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  导出PDF
                </Button>
                <Link to="/interview">
                  <Button>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    面试指导
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {!comparison ? (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-4">简历信息</h2>
                <ResumeCard resume={resume} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-4">JD信息</h2>
                <JDCard jd={jd} />
              </div>
            </div>

            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  开始深度对比分析
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  AI将分析您的简历与JD的匹配程度，识别优势与差距，并提供可落地的优化建议
                </p>
                <Button onClick={handleCompare} loading={isLoading} size="lg">
                  <FileText className="w-5 h-5 mr-2" />
                  开始分析
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
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">对比分析结果</h2>
              <Button variant="ghost" onClick={() => setComparison(null)}>
                重新分析
              </Button>
            </div>

            <ComparisonResult result={comparison} />

            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <Link to="/jd/parser">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  修改JD
                </Button>
              </Link>
              <Link to="/interview">
                <Button>
                  获取面试指导
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
