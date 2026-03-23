import React from 'react';
import { Card, CardHeader, CardContent, Tag } from '../ui';
import type { ResumeData } from '../../types';
import { User, Mail, Phone, Briefcase, GraduationCap, Code, FolderKanban } from 'lucide-react';

interface ResumeCardProps {
  resume: ResumeData;
  onEdit?: () => void;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({ resume, onEdit }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{resume.name}</h3>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{resume.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{resume.phone}</span>
            </div>
          </div>
        </div>
        {onEdit && (
          <button onClick={onEdit} className="text-sm text-indigo-500 hover:text-indigo-600">
            编辑
          </button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <Briefcase className="w-4 h-4 text-indigo-500" />
            工作经历
          </h4>
          <div className="space-y-3">
            {resume.experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-indigo-100 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-slate-800">{exp.title}</p>
                    <p className="text-sm text-slate-500">{exp.company} · {exp.duration}</p>
                  </div>
                </div>
                <ul className="mt-2 space-y-1">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-slate-600 list-disc list-inside">{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            教育背景
          </h4>
          <div className="space-y-2">
            {resume.education.map((edu, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">{edu.school}</p>
                  <p className="text-sm text-slate-500">{edu.major} · {edu.degree}</p>
                </div>
                <span className="text-sm text-slate-400">{edu.duration}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <Code className="w-4 h-4 text-indigo-500" />
            技能
          </h4>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {resume.skills.hard.map((skill, i) => (
                <Tag key={i} variant="skill">{skill}</Tag>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {resume.skills.soft.map((skill, i) => (
                <Tag key={i} variant="default">{skill}</Tag>
              ))}
            </div>
          </div>
        </div>

        {resume.projects.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
              <FolderKanban className="w-4 h-4 text-indigo-500" />
              项目经历
            </h4>
            <div className="space-y-3">
              {resume.projects.map((proj, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-3">
                  <p className="font-medium text-slate-800">{proj.name}</p>
                  <p className="text-sm text-slate-600 mt-1">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.technologies.map((tech, j) => (
                      <span key={j} className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.summary && (
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-sm text-indigo-800 font-medium">{resume.summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
