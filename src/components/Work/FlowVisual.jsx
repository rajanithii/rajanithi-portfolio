import { Fragment } from 'react';

// Vertical flow used for both the CareConnect architecture and the CropSure pipeline.
// Vertical by design, so the same markup works on mobile.
export default function FlowVisual({ layers, label }) {
  const description = `${label}: ${layers.map((l) => l.join(' and ')).join(', then ')}`;
  return (
    <div className="flow" role="img" aria-label={description}>
      {layers.map((layer, i) => (
        <Fragment key={layer.join('|')}>
          <div className="flow__layer">
            {layer.map((n) => (
              <div className="flow__node" data-node key={n}>
                {n}
              </div>
            ))}
          </div>
          {i < layers.length - 1 && <div className="flow__link" data-link aria-hidden="true" />}
        </Fragment>
      ))}
    </div>
  );
}
