import React from 'react';
import { Card, CardContent, Tag, Progress } from '../ui';
import type { Job } from '../../types';
import { getScoreColor } from '../../utils';
import { MapPin, Clock, Briefcase, ExternalLink } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onParse?: () => void;
  onView?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onParse, onView }) => {
  const scoreColor = getScoreColor(job.matchScore || 0);

  return (
    <Card hover>
      <CardContent>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-slate-800">{job.title}</h3>
            <p className="text-sm text-slate-500">{job.company}</p>
          </div>
          {job.matchScore !== undefined && (
            <div className="flex flex-col items-center">
              <Progress percent={job.matchScore} size="small" color={scoreColor} showText={false} strokeWidth={4} />
              <span className="text-xs font-medium mt-1" style={{ color: scoreColor }}>{job.matchScore}分</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
          <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.experience}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.postedDate}</span>
        </div>

        <p className="text-sm text-slate-600 mb-3">{job.salary}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {job.tags.map((tag, i) => (
            <Tag key={i} size="sm">{tag}</Tag>
          ))}
        </div>

        <div className="flex gap-2">
          {onParse && (
            <button
              onClick={onParse}
              className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
            >
              解析JD
            </button>
          )}
          {onView && (
            <button
              onClick={onView}
              className="flex items-center gap-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              查看 <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
