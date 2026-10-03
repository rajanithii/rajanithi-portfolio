import { useState } from 'react';

const W = 800;
const H = 420;
const PAD = 40;

// Monochrome line chart that draws itself (stroke-dashoffset, driven by the pinned timeline).
// Tooltip works on hover AND keyboard focus.
export default function ChartVisual({ points, label }) {
  const [hover, setHover] = useState(null);
  const n = points.length;
  const pos = points.map((p, i) => ({
    x: PAD + (i * (W - PAD * 2)) / (n - 1),
    y: H - PAD - p.y * (H - PAD * 2),
  }));
  const d = pos.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const active = hover !== null ? points[hover] : null;

  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label={label}>
        {[0, 1, 2, 3, 4].map((i) => {
          const y = PAD + (i * (H - PAD * 2)) / 4;
          return <line key={i} data-grid x1={PAD} x2={W - PAD} y1={y} y2={y} className="chart__grid" />;
        })}
        <path d={d} pathLength="1" className="chart__line" data-chart-line />
        {pos.map((p, i) => (
          <g
            key={i}
            data-point
            className="chart__point"
            tabIndex={0}
            aria-label={`Year ${points[i].year ?? 'not set'}, value ${points[i].value ?? 'not set'}`}
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
          <span className="meta">VALUE</span>
          <strong>{active.value ?? 'XX.XX'}</strong>
        </div>
      )}
    </div>
  );
}
