import React from 'react';

interface RadarChartProps {
  data: Record<string, number>;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, size = 200 }) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const center = size / 2;
  const maxRadius = size / 2 - 30;
  const levels = [0.25, 0.5, 0.75, 1];

  const getPoint = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const radius = value * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const getLabelPoint = (index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const radius = maxRadius + 20;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  return (
    <div className="relative inline-block">
      <svg width={size} height={size}>
        {levels.map((level) => (
          <polygon
            key={level}
            points={keys
              .map((_, i) => {
                const point = getPoint(level, i, keys.length);
                return `${point.x},${point.y}`;
              })
              .join(' ')}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
        ))}
        
        {keys.map((_, i) => {
          const point = getPoint(1, i, keys.length);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#E2E8F0"
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={values
            .map((value, i) => {
              const point = getPoint(value, i, keys.length);
              return `${point.x},${point.y}`;
            })
            .join(' ')}
          fill="rgba(99, 102, 241, 0.2)"
          stroke="#6366F1"
          strokeWidth="2"
        />

        {values.map((value, i) => {
          const point = getPoint(value, i, keys.length);
          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#6366F1"
            />
          );
        })}
      </svg>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {keys.map((key, i) => {
          const point = getLabelPoint(i, keys.length);
          return (
            <div
              key={key}
              className="absolute text-xs font-medium text-slate-600"
              style={{
                left: point.x,
                top: point.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {key}
            </div>
          );
        })}
      </div>
    </div>
  );
};
