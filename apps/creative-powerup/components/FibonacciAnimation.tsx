"use client";

import React, { useEffect, useRef } from "react";

export default function FibonacciAnimation() {
  const groupRef = useRef<SVGGElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svgNS = "http://www.w3.org/2000/svg";
    const maxDots = 1000;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const dots: SVGCircleElement[] = [];
    let n = 0;
    let direction = 1; // 1 = growing, -1 = shrinking
    let timeoutId: number | null = null;
    let isRunning = true;

    function animateDots(multiplier: number) {
      if (!isRunning) return;
      if (!groupRef.current) return;

      if (direction === 1 && n < maxDots) {
        const angle = n * goldenAngle;
        const radius = Math.sqrt(n) * 7.5; // Increased multiplier to fill viewport
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        const dot = document.createElementNS(svgNS, "circle");
        dot.setAttribute("cx", x.toString());
        dot.setAttribute("cy", y.toString());
        dot.setAttribute("r", "0");

        // Add CSS transition for smooth animation
        dot.style.transition = "r 0.3s ease-out";

        const progress = n / maxDots;
        const r = Math.round(255 + (254 - 255) * progress);
        const g = Math.round(214 + (72 - 214) * progress);
        const b = Math.round(0 + (216 - 0) * progress);
        const fill = `rgb(${r}, ${g}, ${b})`;
        dot.setAttribute("fill", fill);

        groupRef.current.appendChild(dot);
        dots.push(dot);

        // Trigger animation by setting radius after a brief delay
        requestAnimationFrame(() => {
          dot.setAttribute("r", "5");
        });

        n++;
      } else if (direction === -1 && dots.length > 0) {
        const dot = dots.pop();
        if (!dot) return;

        // Animate shrinking with CSS transition
        dot.style.transition = "r 0.3s ease-in";
        dot.setAttribute("r", "0");

        // Remove after animation completes
        setTimeout(() => {
          if (groupRef.current && groupRef.current.contains(dot)) {
            groupRef.current.removeChild(dot);
          }
        }, 300);

        n--;
      } else {
        direction *= -1;
      }

      // Breathing effect: easing based on progress
      const progress = n / maxDots;
      // Use ease-in-out: slow at start/end, fast in middle
      const easedProgress = direction === 1
        ? 1 - Math.pow(1 - progress, 2) // Ease-out when growing
        : Math.pow(progress, 2); // Ease-in when shrinking

      const minDelay = 2;
      const maxDelay = 15;
      const baseDelay = minDelay + (maxDelay - minDelay) * (1 - easedProgress);

      timeoutId = window.setTimeout(() => {
        if (isRunning) {
          requestAnimationFrame(() => animateDots(direction === -1 ? 2 : 1));
        }
      }, baseDelay);
    }

    if (svgRef.current) {
      svgRef.current.style.backgroundColor = "transparent";
    }

    requestAnimationFrame(() => animateDots(1));

    return () => {
      isRunning = false;
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const viewBoxSize = 500;
  const center = viewBoxSize / 2;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      style={{
        width: '98vmin',
        height: '98vmin',
        display: 'block',
        maxWidth: '98vw',
        maxHeight: '98vh'
      }}
    >
      <g ref={groupRef} transform={`translate(${center}, ${center})`} />
    </svg>
  );
}