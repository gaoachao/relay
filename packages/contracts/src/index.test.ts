import { describe, expect, it } from 'vitest'

import { BoundingBoxSchema } from './index.js'

describe('BoundingBoxSchema', () => {
  it('accepts a normalized box contained by the frame', () => {
    expect(BoundingBoxSchema.parse({ x: 0.2, y: 0.1, width: 0.6, height: 0.8 })).toEqual({
      x: 0.2,
      y: 0.1,
      width: 0.6,
      height: 0.8,
    })
  })

  it('rejects boxes that extend beyond the normalized frame', () => {
    expect(BoundingBoxSchema.safeParse({ x: 0.8, y: 0.7, width: 0.3, height: 0.4 }).success).toBe(
      false,
    )
  })
})
