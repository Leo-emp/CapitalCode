// # Tests for Gemini helpers — stripFences, parsers
import { describe, it, expect } from 'vitest'
import { stripFences } from '../../src/lib/gemini'

describe('stripFences', () => {
  it('strips ```json fences', () => {
    const input = '```json\n{"key": "value"}\n```'
    expect(stripFences(input)).toBe('{"key": "value"}')
  })

  it('strips plain ``` fences', () => {
    const input = '```\n{"key": "value"}\n```'
    expect(stripFences(input)).toBe('{"key": "value"}')
  })

  it('leaves clean JSON unchanged', () => {
    const input = '{"key": "value"}'
    expect(stripFences(input)).toBe('{"key": "value"}')
  })

  it('trims whitespace', () => {
    const input = '  {"key": "value"}  '
    expect(stripFences(input)).toBe('{"key": "value"}')
  })

  it('handles multiline JSON inside fences', () => {
    const input = '```json\n{\n  "a": 1,\n  "b": 2\n}\n```'
    const result = stripFences(input)
    expect(JSON.parse(result)).toEqual({ a: 1, b: 2 })
  })
})
