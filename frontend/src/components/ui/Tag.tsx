import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'skill' | 'highlight' | 'gap' | 'success';
  size?: 'sm' | 'md';
  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  onClick,
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-600',
    skill: 'bg-indigo-50 text-indigo-600',
    highlight: 'bg-emerald-50 text-emerald-600',
    gap: 'bg-red-50 text-red-600',
    success: 'bg-emerald-100 text-emerald-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${
        onClick ? 'cursor-pointer hover:opacity-80' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
