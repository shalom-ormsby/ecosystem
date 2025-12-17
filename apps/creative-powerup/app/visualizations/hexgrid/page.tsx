'use client';

import { useEffect, useState } from 'react';

export default function HexGridPage() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const hexRadius = 30;
  const hexWidth = hexRadius * 2;
  const hexHeight = Math.sqrt(3) * hexRadius;
  const gap = .6; // Tight but visible spacing

  const horizSpacing = hexWidth * 0.75 + gap;
  const vertSpacing = hexHeight + gap;

  const cols = Math.ceil(size.width / horizSpacing) + 1; // Add one extra column to fill left edge
  const rows = Math.ceil(size.height / vertSpacing) + 1; // Add one extra row to fill top edge

  const hexPoints = Array.from({ length: 6 })
    .map((_, i) => {
      const angle = (Math.PI / 3) * i;
      const x = hexRadius + hexRadius * Math.cos(angle);
      const y = hexRadius + hexRadius * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
<main className="w-screen h-screen bg-gray-900 overflow-hidden relative">
        <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size.width} ${size.height}`}
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const x = col * horizSpacing - horizSpacing;
            const y = row * vertSpacing + ((col % 2 === 0) ? 0 : vertSpacing / 2) - vertSpacing;
            return (
              <polygon
                key={`${row}-${col}`}
                points={hexPoints}
                fill="black"
                stroke="#FFD415"
                strokeWidth="1"
                transform={`translate(${x}, ${y})`}
              />
            );
          })
        )}
      </svg>
    </main>
  );
}
