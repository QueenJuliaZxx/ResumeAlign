import React, { useState } from 'react';
import { Card, CardContent } from '../ui';
import type { InterviewGuide, InterviewQuestion } from '../../types';
import { ChevronDown, ChevronUp, Brain, MessageSquare, AlertCircle, Target, CheckCircle } from 'lucide-react';

interface InterviewGuideViewProps {
  guide: InterviewGuide;
}

const QuestionCard: React.FC<{ question: InterviewQuestion }> = ({ question }) => {
  const [expanded, setExpanded] = useState(false);

  const typeLabels = {
    technical: { label: '技术面', color: 'bg-indigo-50 text-indigo-600' },
    behavioral: { label: '行为面', color: 'bg-amber-50 text-amber-600' },
    hr: { label: 'HR面', color: 'bg-emerald-50 text-emerald-600' },
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeLabels[question.type].color}`}>
              {typeLabels[question.type].label}
            </span>
            <span className="text-xs text-slate-400">考察: {question.focus}</span>
          </div>
          <p className="text-slate-800">{question.question}</p>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      {expanded && question.sampleAnswer && (
        <div className="px-4 pb-4 bg-slate-50">
          <p className="text-sm text-slate-600">{question.sampleAnswer}</p>
        </div>
      )}
    </div>
  );
};

export const InterviewGuideView: React.FC<InterviewGuideViewProps> = ({ guide }) => {
  const technicalQuestions = guide.questions.filter(q => q.type === 'technical');
  const behavioralQuestions = guide.questions.filter(q => q.type === 'behavioral');
  const hrQuestions = guide.questions.filter(q => q.type === 'hr');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
              <Target className="w-4 h-4 text-indigo-500" />
              备战重点
            </h3>
            <ul className="space-y-2">
              {guide.preparationPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
              <MessageSquare className="w-4 h-4 text-amber-500" />
              应答框架
            </h3>
            <div className="space-y-3">
              {Object.entries(guide.frameworks).map(([key, value]) => (
                <div key={key} className="border-l-2 border-amber-200 pl-3">
                  <p className="font-medium text-slate-800 text-sm">{key}</p>
                  <p className="text-xs text-slate-500 mt-1">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
            <AlertCircle className="w-4 h-4 text-red-500" />
            短板应对话术
          </h3>
          <div className="space-y-4">
            {guide.weakResponses.map((weak, i) => (
              <div key={i} className="bg-red-50 rounded-lg p-4">
                <p className="font-medium text-red-800 text-sm mb-2">
                  短板: {weak.weakness}
                </p>
                <p className="text-sm text-slate-600">{weak.response}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
          <Brain className="w-4 h-4 text-indigo-500" />
          技术面 ({technicalQuestions.length}题)
        </h3>
        <div className="space-y-2">
          {technicalQuestions.map((q, i) => (
            <QuestionCard key={i} question={q} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
          <MessageSquare className="w-4 h-4 text-amber-500" />
          行为面 ({behavioralQuestions.length}题)
        </h3>
        <div className="space-y-2">
          {behavioralQuestions.map((q, i) => (
            <QuestionCard key={i} question={q} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
          <Target className="w-4 h-4 text-emerald-500" />
          HR面 ({hrQuestions.length}题)
        </h3>
        <div className="space-y-2">
          {hrQuestions.map((q, i) => (
            <QuestionCard key={i} question={q} />
          ))}
        </div>
      </div>
    </div>
  );
};
