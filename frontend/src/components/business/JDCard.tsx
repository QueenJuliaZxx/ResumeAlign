import React from 'react';
import { Card, CardHeader, CardContent, Tag, RadarChart } from '../ui';
import type { JDData } from '../../types';
import { Building2, MapPin, DollarSign, Clock, Target, Brain, Heart, Eye } from 'lucide-react';

interface JDCardProps {
  jd: JDData;
  onImport?: () => void;
}

export const JDCard: React.FC<JDCardProps> = ({ jd, onImport }) => {
  const { basics } = jd;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">{basics.title}</h3>
          <p className="text-sm text-slate-500">{basics.company}</p>
        </div>
        {onImport && (
          <button onClick={onImport} className="text-sm text-indigo-500 hover:text-indigo-600">
            一键导入
          </button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400" />
            {basics.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <DollarSign className="w-4 h-4 text-slate-400" />
            {basics.salary}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="w-4 h-4 text-slate-400" />
            {basics.experience}
          </div>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <Target className="w-4 h-4 text-indigo-500" />
            核心职责
          </h4>
          <ul className="space-y-1">
            {jd.coreResponsibilities.map((r, i) => (
              <li key={i} className="text-sm text-slate-600 list-disc list-inside">{r}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <Brain className="w-4 h-4 text-indigo-500" />
            硬技能要求
          </h4>
          <div className="flex flex-wrap gap-2">
            {jd.hardSkills.map((skill, i) => (
              <Tag key={i} variant="skill">{skill}</Tag>
            ))}
          </div>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <Heart className="w-4 h-4 text-indigo-500" />
            软技能要求
          </h4>
          <div className="flex flex-wrap gap-2">
            {jd.softSkills.map((skill, i) => (
              <Tag key={i} variant="default">{skill}</Tag>
            ))}
          </div>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <Building2 className="w-4 h-4 text-indigo-500" />
            业务要求
          </h4>
          <ul className="space-y-1">
            {jd.businessRequirements.map((r, i) => (
              <li key={i} className="text-sm text-slate-600 list-disc list-inside">{r}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
            <Eye className="w-4 h-4 text-indigo-500" />
            隐性需求
          </h4>
          <div className="flex flex-wrap gap-2">
            {jd.hiddenRequirements.map((req, i) => (
              <Tag key={i} variant="gap">{req}</Tag>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-sm font-medium text-slate-700 mb-4">能力权重</h4>
          <div className="flex justify-center">
            <RadarChart data={jd.abilityWeights} size={180} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
