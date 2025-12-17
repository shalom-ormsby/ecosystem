'use client';
import { useEffect, useState } from 'react';

const HexGrid = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const shrink = setTimeout(() => setScale(0.5), 1500); // shrink after 1.5s
    return () => clearTimeout(shrink);
  }, []);

  const hexSize = 80;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const hexWidth = hexSize * Math.sqrt(3);
  const hexHeight = hexSize * 1.5;

  const cols = Math.ceil(width / hexWidth);
  const rows = Math.ceil(height / hexHeight);

  const hexes = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexWidth + (row % 2 === 0 ? 0 : hexWidth / 2);
      const y = row * hexHeight * 0.75;

      const isBlack = row + col >= Math.floor(rows / 2) && col <= cols - row;

      hexes.push(
        <polygon
          key={`${row}-${col}`}
          points={hexagonPoints(x, y, hexSize)}
          stroke="gold"
          strokeWidth="1"
          fill={isBlack ? 'black' : 'transparent'}
        />
      );
    }
  }

  return (
    <svg
      width="100vw"
      height="100vh"
      viewBox={`0 0 ${width} ${height}`}
      className="absolute top-0 left-0"
      style={{
        transition: 'transform 2s ease-in-out',
        transform: `scale(${scale})`,
      }}
    >
      {hexes}
    </svg>
  );
};

function hexagonPoints(cx: number, cy: number, r: number) {
  return [...Array(6).keys()]
    .map(i => {
      const angle = Math.PI / 3 * i;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');
}

export default HexGrid;