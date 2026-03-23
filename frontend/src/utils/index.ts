export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const downloadFile = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatScore = (score: number): string => {
  return `${Math.round(score)}分`;
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return '#10B981';
  if (score >= 60) return '#F59E0B';
  return '#EF4444';
};

export const getGapLevelText = (level: 'low' | 'medium' | 'high'): string => {
  const map = { low: '低', medium: '中', high: '高' };
  return map[level];
};

export const getGapLevelColor = (level: 'low' | 'medium' | 'high'): string => {
  const map = { low: '#10B981', medium: '#F59E0B', high: '#EF4444' };
  return map[level];
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
