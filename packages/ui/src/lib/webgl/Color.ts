/**
 * Minimal Color implementation for WebGL shader uniforms.
 * Replaces OGL's Color — stores three floats (r, g, b).
 */
export class Color {
  data: Float32Array;

  constructor(r = 0, g = 0, b = 0) {
    this.data = new Float32Array([r, g, b]);
  }
}
