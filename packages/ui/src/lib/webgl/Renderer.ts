/**
 * Minimal WebGL Renderer that creates a canvas and context.
 * Replaces OGL's Renderer — provides context creation, resize, and render dispatch.
 */
import type { Mesh } from './Mesh';

interface RendererOptions {
  alpha?: boolean;
  premultipliedAlpha?: boolean;
  dpr?: number;
}

/** WebGLRenderingContext with canvas narrowed to HTMLCanvasElement. */
export type GL = WebGLRenderingContext & { readonly canvas: HTMLCanvasElement };

export class Renderer {
  gl: GL;
  private dpr: number;

  constructor({ alpha = false, premultipliedAlpha = true, dpr = 1 }: RendererOptions = {}) {
    const canvas = document.createElement('canvas');
    this.dpr = dpr;

    const attrs: WebGLContextAttributes = {
      alpha,
      premultipliedAlpha,
      antialias: false,
      preserveDrawingBuffer: false,
    };

    const gl =
      (canvas.getContext('webgl2', attrs) as GL | null) ??
      (canvas.getContext('webgl', attrs) as GL | null);

    if (!gl) throw new Error('WebGL not supported');
    this.gl = gl;
  }

  setSize(width: number, height: number): void {
    const canvas = this.gl.canvas;
    canvas.width = width * this.dpr;
    canvas.height = height * this.dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    this.gl.viewport(0, 0, canvas.width, canvas.height);
  }

  render({ scene }: { scene: Mesh }): void {
    scene.draw();
  }
}
