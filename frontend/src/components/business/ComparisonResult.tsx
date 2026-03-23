import React from 'react';
import { Card, CardContent, Tag, Progress } from '../ui';
import type { ComparisonResult as ComparisonResultType } from '../../types';
import { getScoreColor, getGapLevelText, getGapLevelColor } from '../../utils';
import { CheckCircle, XCircle, AlertTriangle, Sparkles, Lightbulb, FileText, MessageSquare } from 'lucide-react';

interface ComparisonResultProps {
  result: ComparisonResultType;
}

export const ComparisonResult: React.FC<ComparisonResultProps> = ({ result }) => {
  const scoreColor = getScoreColor(result.matchScore);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col items-center py-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">综合匹配度</h3>
          <Progress 
            percent={result.matchScore} 
            size="large" 
            color={scoreColor}
            strokeWidth={12}
          />
          <p className="mt-4 text-sm text-slate-500 text-center max-w-md">
            {result.matchScore >= 80 
              ? '您与该岗位的匹配度很高，建议重点准备面试' 
              : result.matchScore >= 60 
              ? '您与该岗位有一定匹配度，建议针对差距进行优化' 
              : '匹配度较低，建议选择更匹配的岗位或针对性提升'}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              匹配亮点
            </h3>
            <ul className="space-y-2">
              {result.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">{h}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              优势
            </h3>
            <ul className="space-y-2">
              {result.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">{s}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
            <XCircle className="w-4 h-4 text-red-500" />
            劣势与差距
          </h3>
          <div className="space-y-3">
            {result.gaps.map((gap, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: getGapLevelColor(gap.gapLevel) }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800">{gap.requirement}</span>
                    <Tag 
                      variant={gap.gapLevel === 'high' ? 'gap' : gap.gapLevel === 'medium' ? 'default' : 'success'}
                      size="sm"
                    >
                      差距: {getGapLevelText(gap.gapLevel)}
                    </Tag>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">现状: {gap.current}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
              <FileText className="w-4 h-4 text-indigo-500" />
              ATS关键词优化
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.atsKeywords.map((keyword, i) => (
                <Tag key={i} variant="skill">{keyword}</Tag>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              建议在简历中自然融入这些关键词，提升ATS系统通过率
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              优化建议
            </h3>
            <ul className="space-y-2">
              {result.optimizationSuggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-indigo-500">{i + 1}.</span>
                  <span className="text-slate-600">{s}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {result.starSuggestions.length > 0 && (
        <Card>
          <CardContent>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
              <Sparkles className="w-4 h-4 text-amber-500" />
              STAR法则重构建议
            </h3>
            <div className="space-y-4">
              {result.starSuggestions.map((suggestion, i) => (
                <div key={i} className="border-l-2 border-amber-200 pl-4">
                  <p className="font-medium text-slate-800">{suggestion.context}</p>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">情境:</span>
                      <p className="text-slate-600">{suggestion.situation}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">任务:</span>
                      <p className="text-slate-600">{suggestion.task}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">行动:</span>
                      <p className="text-slate-600">{suggestion.action}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">结果:</span>
                      <p className="text-slate-600">{suggestion.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
