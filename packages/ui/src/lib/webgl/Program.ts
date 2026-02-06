/**
 * Minimal shader Program for compiling GLSL and managing uniforms.
 * Replaces OGL's Program — handles compilation, linking, and uniform uploads.
 *
 * Supported uniform value types:
 *   number        → gl.uniform1f
 *   boolean       → gl.uniform1i (0 or 1, for GLSL bool)
 *   Float32Array  → gl.uniform{2,3,4}fv (by length)
 *   Vec3 / Color  → gl.uniform3fv (they extend Float32Array)
 */

interface UniformDef {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

interface ProgramOptions {
  vertex: string;
  fragment: string;
  uniforms?: Record<string, UniformDef>;
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

export class Program {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  uniforms: Record<string, UniformDef>;
  private uniformLocations: Map<string, WebGLUniformLocation>;
  private attributeLocations: Map<string, number>;

  constructor(gl: WebGLRenderingContext, { vertex, fragment, uniforms = {} }: ProgramOptions) {
    this.gl = gl;
    this.uniforms = uniforms;

    const vs = compile(gl, gl.VERTEX_SHADER, vertex);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragment);

    this.program = gl.createProgram()!;
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(this.program);
      throw new Error(`Program link error: ${info}`);
    }

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    // Cache uniform locations (only for uniforms the shader actually uses)
    this.uniformLocations = new Map();
    for (const name in uniforms) {
      const loc = gl.getUniformLocation(this.program, name);
      if (loc !== null) {
        this.uniformLocations.set(name, loc);
      }
    }

    // Cache attribute locations
    this.attributeLocations = new Map();
    const numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttribs; i++) {
      const attrib = gl.getActiveAttrib(this.program, i);
      if (attrib) {
        this.attributeLocations.set(attrib.name, gl.getAttribLocation(this.program, attrib.name));
      }
    }
  }

  use(): void {
    this.gl.useProgram(this.program);
  }

  getAttribLocation(name: string): number {
    return this.attributeLocations.get(name) ?? -1;
  }

  uploadUniforms(): void {
    const gl = this.gl;
    for (const [name, loc] of this.uniformLocations) {
      const value = this.uniforms[name]?.value;
      if (value === undefined || value === null) continue;

      if (typeof value === 'boolean') {
        gl.uniform1i(loc, value ? 1 : 0);
      } else if (typeof value === 'number') {
        gl.uniform1f(loc, value);
      } else if (value instanceof Float32Array) {
        switch (value.length) {
          case 1: gl.uniform1fv(loc, value); break;
          case 2: gl.uniform2fv(loc, value); break;
          case 3: gl.uniform3fv(loc, value); break;
          case 4: gl.uniform4fv(loc, value); break;
        }
      } else if (value && value.data instanceof Float32Array) {
        // Vec3, Color — classes that wrap a Float32Array in .data
        const arr = value.data as Float32Array;
        switch (arr.length) {
          case 2: gl.uniform2fv(loc, arr); break;
          case 3: gl.uniform3fv(loc, arr); break;
          case 4: gl.uniform4fv(loc, arr); break;
        }
      }
    }
  }
}
