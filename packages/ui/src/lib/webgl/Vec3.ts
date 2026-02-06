/**
 * Minimal Vec3 implementation for WebGL shader uniforms.
 * Replaces OGL's Vec3 — only the constructor and .set() are needed.
 */
export class Vec3 {
  data: Float32Array;

  constructor(x = 0, y = 0, z = 0) {
    this.data = new Float32Array([x, y, z]);
  }

  set(x: number, y: number, z: number): this {
    this.data[0] = x;
    this.data[1] = y;
    this.data[2] = z;
    return this;
  }
}
