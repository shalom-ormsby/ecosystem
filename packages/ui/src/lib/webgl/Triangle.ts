/**
 * Full-screen triangle geometry for fragment-shader-only rendering.
 * Replaces OGL's Triangle — a single oversized triangle that clips to the viewport.
 */
export class Triangle {
  gl: WebGLRenderingContext;
  positionBuffer: WebGLBuffer;
  uvBuffer: WebGLBuffer;
  positionSize = 2;
  uvSize = 2;
  count = 3;

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;

    // Oversized triangle covering the full viewport when clipped
    const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
    this.positionBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);
    this.uvBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
  }
}
