'use client';

import { useEffect, useRef } from 'react';

export interface AntigravityConfig {
    particleCount: number;
    speed: number;
    trailLength: number;
    baseColor: string;
    flowIntensity: number;
}

export default function AntigravityCanvas({ config }: { config: AntigravityConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = 0;
        let height = 0;
        let mouseX = -1000;
        let mouseY = -1000;

        // Simplex noise implementation (simplified for this use case)
        // In a real prod app we might import 'simplex-noise' or similar
        // For now, using a basic pseudo-random noise function for the flow field
        const noise = (x: number, y: number) => {
            return Math.sin(x * 0.01) + Math.cos(y * 0.01);
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            life: number;
            maxLife: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * config.speed; // Use config speed
                this.vy = (Math.random() - 0.5) * config.speed;
                this.size = Math.random() * 2 + 1;
                this.life = Math.random() * 100;
                this.maxLife = 100 + Math.random() * 100;
            }

            update() {
                // Flow field influence
                const angle = noise(this.x * 0.005, this.y * 0.005) * Math.PI * 2 * config.flowIntensity;
                this.vx += Math.cos(angle) * 0.1 * (config.speed * 0.5);
                this.vy += Math.sin(angle) * 0.1 * (config.speed * 0.5);

                // Mouse interaction (repulsion)
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    this.vx += (dx / dist) * force * 1;
                    this.vy += (dy / dist) * force * 1;
                }

                // Friction
                this.vx *= 0.95;
                this.vy *= 0.95;

                // Update position
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Life cycle for "breathing" size
                this.life++;
                // Pulse size slightly
                this.size = Math.max(0.5, Math.sin(this.life * 0.05) + 1.5);
            }

            draw(context: CanvasRenderingContext2D) {
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fillStyle = config.baseColor;
                context.fill();
            }
        }

        const init = () => {
            resize();
            particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const animate = () => {
            // Trail effect using semi-transparent clear rect
            // High trail length = low opacity clear = long trails
            // config.trailLength is 0-1 (short to long).
            // We need alpha for fillRect.
            // 0 trail -> clear completely (alpha 1)
            // 1 trail -> clear very little (alpha 0.05)

            const clearAlpha = 1 - (config.trailLength * 0.9);

            ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0.01, clearAlpha)})`;
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            // Maintain particle count if config changed dynamically
            if (particles.length < config.particleCount) {
                for (let i = particles.length; i < config.particleCount; i++) {
                    particles.push(new Particle());
                }
            } else if (particles.length > config.particleCount) {
                particles.splice(config.particleCount);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [config]); // Re-run effect slightly if config object reference changes, but we handle dynamic updates inside loop too where possible

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            style={{ background: 'black' }}
        />
    );
}
