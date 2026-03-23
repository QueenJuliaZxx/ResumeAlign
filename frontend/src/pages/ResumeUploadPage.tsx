import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { UploadZone, Button, Card, CardContent } from '../components/ui';
import { ResumeCard } from '../components/business';
import { mockResume } from '../services/mockData';
import { ArrowLeft, ArrowRight, FileText, Loader } from 'lucide-react';
import type { UploadProgress } from '../types';

export const ResumeUploadPage: React.FC = () => {
  const { resume, setResume } = useAppStore();
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({ status: 'idle', progress: 0 });
  const [textInput, setTextInput] = useState('');

  const handleFileUpload = useCallback(async (file: File) => {
    setUploadProgress({ status: 'uploading', progress: 0, message: `正在上传 ${file.name}...` });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setUploadProgress({ status: 'uploading', progress: 50, message: '上传完成，准备解析...' });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploadProgress({ status: 'parsing', progress: 70, message: '提取结构化信息...' });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setResume(mockResume);
    setUploadProgress({ status: 'done', progress: 100, message: '解析完成！' });
  }, [setResume]);

  const handleTextParse = useCallback(async () => {
    if (!textInput.trim()) return;
    
    setUploadProgress({ status: 'parsing', progress: 30, message: '正在解析简历...' });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploadProgress({ status: 'parsing', progress: 70, message: '提取结构化信息...' });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setResume(mockResume);
    setUploadProgress({ status: 'done', progress: 100, message: '解析完成！' });
  }, [textInput, setResume]);

  const handleUseDemo = useCallback(async () => {
    setUploadProgress({ status: 'parsing', progress: 50, message: '加载示例数据...' });
    await new Promise(resolve => setTimeout(resolve, 800));
    setResume(mockResume);
    setUploadProgress({ status: 'done', progress: 100, message: '加载完成！' });
  }, [setResume]);

  const handleReset = useCallback(() => {
    setResume(null);
    setUploadProgress({ status: 'idle', progress: 0 });
    setTextInput('');
  }, [setResume]);

  const isLoading = uploadProgress.status === 'uploading' || uploadProgress.status === 'parsing';

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">简历上传</h1>
            <p className="text-sm text-slate-500">支持PDF、DOCX格式，或粘贴简历文本</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {!resume ? (
          <div className="space-y-6">
            <UploadZone onUpload={handleFileUpload} disabled={isLoading} />

            <div className="text-center text-slate-500 text-sm">
              或
            </div>

            <Card>
              <CardContent>
                <h3 className="font-medium text-slate-800 mb-3">粘贴简历文本</h3>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="在此粘贴简历内容..."
                  className="w-full h-48 p-4 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="flex justify-between items-center mt-4">
                  <Button variant="ghost" onClick={() => setTextInput('')}>
                    清空
                  </Button>
                  <Button onClick={handleTextParse} loading={isLoading} disabled={!textInput.trim()}>
                    解析简历
                  </Button>
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

            <div className="text-center">
              <Button variant="outline" onClick={handleUseDemo}>
                <FileText className="w-4 h-4 mr-2" />
                使用示例简历
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">已解析简历</h2>
              <Button variant="ghost" onClick={handleReset}>
                重新上传
              </Button>
            </div>

            <ResumeCard resume={resume} />

            <div className="flex justify-between items-center pt-4">
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </Link>
              <div className="flex gap-4">
                <Link to="/jd/parser">
                  <Button variant="secondary">
                    解析JD
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
