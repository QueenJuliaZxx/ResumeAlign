import React from 'react';

interface ProgressProps {
  percent: number;
  size?: 'small' | 'default' | 'large';
  showText?: boolean;
  color?: string;
  strokeWidth?: number;
}

export const Progress: React.FC<ProgressProps> = ({
  percent,
  size = 'default',
  showText = true,
  color = '#6366F1',
  strokeWidth = 8,
}) => {
  const sizes = {
    small: 48,
    default: 80,
    large: 120,
  };
  
  const fontSizes = {
    small: 10,
    default: 14,
    large: 18,
  };

  const radius = (sizes[size] - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: sizes[size], height: sizes[size] }}>
      <svg className="transform -rotate-90" width={sizes[size]} height={sizes[size]}>
        <circle
          cx={sizes[size] / 2}
          cy={sizes[size] / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={sizes[size] / 2}
          cy={sizes[size] / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {showText && (
        <span className="absolute text-slate-800 font-semibold" style={{ fontSize: fontSizes[size] }}>
          {Math.round(percent)}%
        </span>
      )}
    </div>
  );
};
