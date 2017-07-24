'use strict'

import { assignTypeName } from './types'
import getBoundingBox from 'bound-points'
import Wireframe from 'screen-projected-lines'
import reindex from 'mesh-reindex'
import unindex from 'unindex-mesh'
import normals from 'normals'

export class Geometry {
  constructor({complex = null, flatten = false} = {}) {
    assignTypeName(this, 'geometry')
    Object.defineProperty(this, '_complex', {
      enumerable: false,
      writable: false,
      value: {},
    })

    this.flatten = Boolean(flatten)
    this.complex = complex || null
  }

  set complex(complex) {
    if (complex instanceof Geometry) {
      complex = complex.complex
    }

    if (complex) {
      if (this.flatten && complex.cells) {
        const cells = complex.cells.map((cell) => cell.slice())
        const flattened = reindex(unindex(complex.positions, cells))
        try {
          complex.normals = normals.vertexNormals(
            flattened.cells,
            flattened.positions)
        } catch (e) { console.warn("Unable to compute vertex normals.") }
        Object.assign(complex, flattened)
      }

      if (null == complex.normals && complex.positions && complex.cells) {
        try {
          complex.normals = normals.vertexNormals(
            complex.cells,
            complex.positions)
        } catch (e) { console.warn("Unable to compute vertex normals.") }
      }
    }

    Object.assign(this._complex, complex)
    return complex
  }

  get complex() {
    return this._complex || null
  }

  get positions() {
    return this.complex ? this.complex.positions : null
  }

  get normals() {
    return this.complex ? this.complex.normals : null
  }

  get uvs() {
    return this.complex ? this.complex.uvs : null
  }

  get cells() {
    return this.complex ? this.complex.cells : null
  }

  computeBoundingBox() {
    return getBoundingBox(this.positions)
  }
}
