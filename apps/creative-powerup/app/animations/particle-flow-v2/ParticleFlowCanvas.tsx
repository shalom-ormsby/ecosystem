'use client';

import { useEffect, useRef } from 'react';

export type MotionMode = 'right-to-left' | 'on-camera' | 'flocking' | 'oceanic' | 'brownian' | 'random';

export interface ParticleFlowConfig {
    particleCount: number;
    speed: number;
    trailLength: number; // 0 to 0.99
    baseColor: string;
    flowIntensity: number;
    motionMode: MotionMode;
    decay: number; // 0 to 1, affects lifecycle
    isInteractive: boolean;
}

export default function ParticleFlowCanvas({ config }: { config: ParticleFlowConfig }) {
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
        let randomModeTimer = 0;
        let currentRandomMode: MotionMode = 'right-to-left';

        const MODES: MotionMode[] = ['right-to-left', 'on-camera', 'flocking', 'oceanic', 'brownian'];

        // Simplex noise (simplified)
        const noise = (x: number, y: number, z: number = 0) => {
            return Math.sin(x) * Math.cos(y) + Math.sin(z);
        };

        class Particle {
            x: number;
            y: number;
            z: number; // For 3D effects (on-camera)
            vx: number;
            vy: number;
            vz: number;
            size: number;
            life: number;
            maxLife: number;
            baseX: number; // For oceanic anchors

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.z = Math.random() * 1000; // Depth 0-1000
                this.vx = 0;
                this.vy = 0;
                this.vz = 0;
                this.baseX = this.x;
                this.size = Math.random() * 2 + 1;
                this.life = Math.random() * 100;
                // Decay affects max life. Low decay = long life.
                this.maxLife = 100 + Math.random() * 200 * (1 - config.decay + 0.1);
            }

            reset() {
                const mode = config.motionMode === 'random' ? currentRandomMode : config.motionMode;

                if (mode === 'on-camera') {
                    this.x = (Math.random() - 0.5) * width * 0.1 + width / 2;
                    this.y = (Math.random() - 0.5) * height * 0.1 + height / 2;
                    this.z = 1000; // Start far away
                } else {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.z = 0;
                }
                this.life = 0;
            }

            update() {
                const mode = config.motionMode === 'random' ? currentRandomMode : config.motionMode;
                const time = Date.now() * 0.001 * config.speed;

                if (mode === 'right-to-left') {
                    const angle = noise(this.x * 0.005, this.y * 0.005, time) * Math.PI * 2 * config.flowIntensity;
                    this.vx += Math.cos(angle) * 0.1;
                    this.vy += Math.sin(angle) * 0.1;
                    this.vx -= 0.5 * config.speed; // Drift left
                }
                else if (mode === 'on-camera') {
                    // Move "forward" in Z
                    this.z -= 10 * config.speed;

                    // Perspective project
                    const fov = 300;

                    // Move away from center based on perspective
                    const cx = width / 2;
                    const cy = height / 2;

                    // Initial random velocities outwards
                    this.vx = (this.x - cx) * 0.01 * config.speed;
                    this.vy = (this.y - cy) * 0.01 * config.speed;

                    if (this.z < -fov + 10) this.reset();
                }
                else if (mode === 'oceanic') {
                    // Sinusoidal waves
                    this.vx = Math.sin(this.y * 0.01 + time) * 0.5 * config.speed;
                    this.vy = Math.cos(this.x * 0.01 + time) * 0.5 * config.speed;
                    this.vx += 0.2 * config.speed; // Slight drift
                }
                else if (mode === 'brownian') {
                    this.vx += (Math.random() - 0.5) * config.speed;
                    this.vy += (Math.random() - 0.5) * config.speed;
                }
                else if (mode === 'flocking') {
                    // Simplified boids
                    const centerX = width / 2 + Math.sin(time) * 300;
                    const centerY = height / 2 + Math.cos(time * 0.7) * 200;

                    const dx = centerX - this.x;
                    const dy = centerY - this.y;
                    this.vx += dx * 0.0005 * config.speed;
                    this.vy += dy * 0.0005 * config.speed;

                    // Separation (noise)
                    this.vx += (Math.random() - 0.5) * 2 * config.speed;
                    this.vy += (Math.random() - 0.5) * 2 * config.speed;
                }

                // Interactive Attractor (Mouse)
                if (config.isInteractive && mouseX !== -1000) {
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const radius = 300; // Attraction radius

                    if (dist < radius) {
                        // Attraction force proportional to distance (closer = stronger)
                        const force = (radius - dist) / radius;
                        // Add to velocity vector towards mouse
                        this.vx += (dx / dist) * force * 1.5 * config.speed;
                        this.vy += (dy / dist) * force * 1.5 * config.speed;
                    }
                }

                // Friction
                this.vx *= 0.95;
                this.vy *= 0.95;

                // Apply velocity
                this.x += this.vx * config.speed;
                this.y += this.vy * config.speed;

                // Wrap or Reset
                if (mode !== 'on-camera') {
                    if (this.x < 0) this.x = width;
                    if (this.x > width) this.x = 0;
                    if (this.y < 0) this.y = height;
                    if (this.y > height) this.y = 0;
                }

                // Life cycle
                this.life++;
                // Decay check
                if (this.life > this.maxLife) {
                    this.reset();
                }

                // Pulse size
                this.size = Math.max(0.5, Math.sin(this.life * 0.05) * 2 + 1.5);
            }

            draw(context: CanvasRenderingContext2D) {
                context.beginPath();
                context.globalAlpha = Math.max(0, 1 - this.life / this.maxLife);
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fillStyle = config.baseColor;
                context.fill();
                context.globalAlpha = 1.0;
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
            // Random mode switching
            if (config.motionMode === 'random') {
                randomModeTimer++;
                if (randomModeTimer > 300) { // Every ~5 seconds
                    randomModeTimer = 0;
                    currentRandomMode = MODES[Math.floor(Math.random() * MODES.length)];
                }
            }

            // Trail calculation
            const clearAlpha = 1 - config.trailLength;

            ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0.01, clearAlpha)})`;
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            // Maintain particle count
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
    }, [config]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            style={{ background: 'black' }}
        />
    );
}
