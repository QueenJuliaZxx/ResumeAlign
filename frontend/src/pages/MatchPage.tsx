import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Button, Card, CardContent, Tag, Input } from '../components/ui';
import { JobCard } from '../components/business';
import { mockJobs } from '../services/mockData';
import { ArrowLeft, Search, MapPin, Briefcase, DollarSign, Loader, FileText, Zap } from 'lucide-react';
import type { JobFilters } from '../types';

export const MatchPage: React.FC = () => {
  const navigate = useNavigate();
  const { resume, matchedJobs, setMatchedJobs } = useAppStore();
  const [filters, setFilters] = useState<JobFilters>({
    keyword: '',
    city: '',
    experience: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setHasSearched(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filtered = [...mockJobs];
    
    if (filters.keyword) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(filters.keyword!.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.keyword!.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(filters.keyword!.toLowerCase()))
      );
    }
    
    if (filters.city) {
      filtered = filtered.filter(job => job.location.includes(filters.city!));
    }
    
    setMatchedJobs(filtered);
    setIsLoading(false);
  }, [filters, setMatchedJobs]);

  const handleParseJob = useCallback(() => {
    navigate('/jd/parser');
  }, [navigate]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">岗位匹配</h1>
            <p className="text-sm text-slate-500">AI智能匹配，精准推荐合适岗位</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Card className="mb-8">
          <CardContent>
            <h3 className="font-medium text-slate-800 mb-4">搜索条件</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2">关键词</label>
                <Input
                  placeholder="岗位/公司/技能"
                  value={filters.keyword}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">城市</label>
                <Input
                  placeholder="如：北京"
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-2">经验要求</label>
                <Input
                  placeholder="如：3-5年"
                  value={filters.experience}
                  onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} loading={isLoading} className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  搜索
                </Button>
              </div>
            </div>
            
            {resume && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm text-slate-600">基于简历智能匹配</span>
                    <Tag variant="skill">{resume.name}</Tag>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setMatchedJobs(mockJobs)}>
                    <Zap className="w-4 h-4 mr-1" />
                    智能推荐
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {isLoading && (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <Loader className="w-6 h-6 text-indigo-500 animate-spin mr-4" />
              <span className="text-slate-600">正在搜索匹配岗位...</span>
            </CardContent>
          </Card>
        )}

        {!isLoading && hasSearched && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">
                找到 {matchedJobs.length} 个匹配岗位
              </h2>
              <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
                <option>按匹配度排序</option>
                <option>按发布时间排序</option>
                <option>按薪资排序</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {matchedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onParse={handleParseJob}
                />
              ))}
            </div>

            {matchedJobs.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">未找到匹配的岗位</p>
                  <p className="text-sm text-slate-500 mt-2">尝试调整搜索条件</p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {!isLoading && !hasSearched && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">热门推荐</h2>
              <div className="grid grid-cols-2 gap-6">
                {mockJobs.slice(0, 4).map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onParse={handleParseJob}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">搜索提示</h2>
              <Card>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                      <span className="text-slate-600">使用关键词精确搜索，如"推荐系统 字节"</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-slate-400 mt-0.5" />
                      <span className="text-slate-600">选择期望城市缩小范围</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-slate-400 mt-0.5" />
                      <span className="text-slate-600">上传简历获取个性化推荐</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
