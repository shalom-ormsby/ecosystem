/**
 * Minimal WebGL utilities — drop-in replacement for the OGL subset used
 * by the background shader components (OrbBackground, FaultyTerminal, WarpBackground).
 *
 * Only the classes actually consumed are implemented:
 *   Renderer, Program, Mesh, Triangle, Vec3, Color
 */
export { Renderer, type GL } from './Renderer';
export { Program } from './Program';
export { Mesh } from './Mesh';
export { Triangle } from './Triangle';
export { Vec3 } from './Vec3';
export { Color } from './Color';
