'use strict'
import { DynamicValue } from './dynamic'

const shaderAttributesCounter = DynamicValue.createCounter()

export class ShaderAttributes extends DynamicValue {
  static counter() { return shaderAttributesCounter }
  static counter() { return shaderAttributesCounter }
  static getTotalUniformCount() {
    const counter = ShaderAttributes.counter()
    const list = counter.list()
    const sum = list
      .map((ctx) => ShaderAttributes.getContextUniformCount(ctx))
      .reduce((a, b) => a + b, 0)
    return sum
  }

  static getContextUniformCount(ctx) {
    const counter = ShaderAttributes.counter()
    const list = counter.listSetForContext(ctx)
    const attributes = list.reduce((a, b) => Object.assign(a, b), {})
    const sum = Object.keys(attributes).length
    return sum
  }
  constructor(ctx) {
    super()
    shaderAttributesCounter.addValueForContext(ctx, this)
  }
}