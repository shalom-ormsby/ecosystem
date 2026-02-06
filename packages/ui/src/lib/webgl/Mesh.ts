/**
 * Minimal Mesh that binds geometry attributes and draws.
 * Replaces OGL's Mesh — combines a Triangle geometry with a Program.
 */
import type { Triangle } from './Triangle';
import type { Program } from './Program';

export class Mesh {
  gl: WebGLRenderingContext;
  geometry: Triangle;
  program: Program;

  constructor(gl: WebGLRenderingContext, { geometry, program }: { geometry: Triangle; program: Program }) {
    this.gl = gl;
    this.geometry = geometry;
    this.program = program;
  }

  draw(): void {
    const { gl, geometry, program } = this;

    program.use();
    program.uploadUniforms();

    const posLoc = program.getAttribLocation('position');
    if (posLoc >= 0) {
      gl.bindBuffer(gl.ARRAY_BUFFER, geometry.positionBuffer);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, geometry.positionSize, gl.FLOAT, false, 0, 0);
    }

    const uvLoc = program.getAttribLocation('uv');
    if (uvLoc >= 0) {
      gl.bindBuffer(gl.ARRAY_BUFFER, geometry.uvBuffer);
      gl.enableVertexAttribArray(uvLoc);
      gl.vertexAttribPointer(uvLoc, geometry.uvSize, gl.FLOAT, false, 0, 0);
    }

    gl.drawArrays(gl.TRIANGLES, 0, geometry.count);
  }
}
