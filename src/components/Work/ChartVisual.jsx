import { useState } from 'react';

const W = 800;
const H = 420;
const LEFT = 100;
const RIGHT = 24;
const TOP = 28;
const BOTTOM = 40;
const TICK_STEP = 0.5;

// Monochrome line chart that draws itself (stroke-dashoffset, driven by the pinned timeline).
// Tooltip works on hover AND keyboard focus.
export default function ChartVisual({ points, label, unit, unitSpoken, valueLabel, yAxisLabel }) {
  const [hover, setHover] = useState(null);
  const n = points.length;
  const minValue = Math.min(...points.map((point) => point.value));
  const maxValue = Math.max(...points.map((point) => point.value));
  const minDomain = Math.floor(minValue / TICK_STEP) * TICK_STEP - TICK_STEP;
  const maxDomain = Math.ceil(maxValue / TICK_STEP) * TICK_STEP + TICK_STEP;
  const ticks = Array.from(
    { length: Math.round((maxDomain - minDomain) / TICK_STEP) + 1 },
    (_, i) => minDomain + i * TICK_STEP
  );
  const pos = points.map((p, i) => ({
    x: LEFT + (i * (W - LEFT - RIGHT)) / (n - 1),
    y: H - BOTTOM - ((p.value - minDomain) / (maxDomain - minDomain)) * (H - TOP - BOTTOM),
  }));
  const d = pos.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const active = hover !== null ? points[hover] : null;

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label={label}>
        <text x="18" y={H / 2} className="chart__axis-title" textAnchor="middle" transform={`rotate(-90 18 ${H / 2})`}>
          {yAxisLabel}
        </text>
        {ticks.map((tick) => {
          const y = H - BOTTOM - ((tick - minDomain) / (maxDomain - minDomain)) * (H - TOP - BOTTOM);
          return (
            <g key={tick}>
              <line data-grid x1={LEFT} x2={W - RIGHT} y1={y} y2={y} className="chart__grid" />
              <text x={LEFT - 12} y={y + 4} className="chart__tick" textAnchor="end">
                {tick.toFixed(1)}
              </text>
            </g>
          );
        })}
        <path d={d} pathLength="1" className="chart__line" data-chart-line />
        {pos.map((p, i) => (
          <g
            key={i}
            data-point
            className="chart__point"
            tabIndex={0}
            aria-label={`Year ${points[i].year}, ${valueLabel.toLowerCase()} ${points[i].value.toFixed(2)} ${unitSpoken}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
          >
            <circle cx={p.x} cy={p.y} r="16" className="chart__hit" />
            <circle cx={p.x} cy={p.y} r="4" className="chart__dot" />
          </g>
        ))}
      </svg>
      {active && (
        <div className="chart__tip" style={{ left: `${(pos[hover].x / W) * 100}%`, top: `${(pos[hover].y / H) * 100}%` }}>
          <span className="meta">YEAR</span>
          <strong>{active.year ?? '20XX'}</strong>
          <span className="meta">{valueLabel} ({unit})</span>
          <strong>{active.value.toFixed(2)} {unit}</strong>
        </div>
      )}
    </div>
  );
}
