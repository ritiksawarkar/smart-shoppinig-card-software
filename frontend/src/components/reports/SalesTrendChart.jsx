import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { TrendingUp } from 'lucide-react';

export const SalesTrendChart = ({ data = [] }) => {
  const [activePoint, setActivePoint] = useState(null);

  if (!data || data.length === 0) return null;

  const maxSales = Math.max(...data.map((d) => d.sales)) * 1.15 || 100000;
  const svgWidth = 800;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 20;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  // Calculate coordinates
  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1 || 1)) * chartW;
    const y = svgHeight - paddingY - (d.sales / maxSales) * chartH;
    return { ...d, x, y };
  });

  // Build SVG path
  const pathD = points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ''
  );

  // Area path for gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  const hoveredData = activePoint !== null ? points[activePoint] : points[points.length - 1];

  return (
    <Card padding="p-5" className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span>Sales & Revenue Trend Over Time</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Daily checkout revenue & transaction volume trajectory.
          </p>
        </div>

        {hoveredData && (
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-3 text-xs self-start sm:self-auto">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Date: </span>
              <span className="font-bold text-slate-800">{hoveredData.date}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Sales: </span>
              <span className="font-extrabold text-blue-900">{formatCurrency(hoveredData.sales)}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Txns: </span>
              <span className="font-bold text-indigo-700">{hoveredData.transactions}</span>
            </div>
          </div>
        )}
      </div>

      {/* SVG Chart Graphic */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.33, 0.66, 1].map((ratio, idx) => {
            const y = paddingY + ratio * chartH;
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={y}
                x2={svgWidth - paddingX}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          {/* Gradient Area Fill */}
          <path d={areaD} fill="url(#salesGradient)" />

          {/* Primary Trend Line */}
          <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

          {/* Interactive Point Circles */}
          {points.map((p, i) => {
            const isHovered = activePoint === i;
            return (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6 : 3.5}
                  className={`transition-all cursor-pointer ${
                    isHovered ? 'fill-blue-600 stroke-white stroke-2' : 'fill-white stroke-blue-600 stroke-2'
                  }`}
                  onMouseEnter={() => setActivePoint(i)}
                />

                {/* X Axis Date Label */}
                {(i === 0 || i === Math.floor(points.length / 2) || i === points.length - 1) && (
                  <text
                    x={p.x}
                    y={svgHeight - 2}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#64748b"
                    fontWeight="600"
                  >
                    {p.date}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
};

export default SalesTrendChart;
