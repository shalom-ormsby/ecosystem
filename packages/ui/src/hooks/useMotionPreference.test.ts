import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMotionPreference } from './useMotionPreference'
import { useCustomizer } from '../lib/store/customizer'

// Helper to mock matchMedia with a specific matches value
function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

describe('useMotionPreference', () => {
  beforeEach(() => {
    // Reset the Zustand store to defaults before each test
    useCustomizer.setState({
      motion: 5,
      prefersReducedMotion: false,
    })
    // Default: system does not prefer reduced motion
    mockMatchMedia(false)
  })

  it('returns scale, shouldAnimate, and prefersReducedMotion', () => {
    const { result } = renderHook(() => useMotionPreference())

    expect(result.current).toHaveProperty('scale')
    expect(result.current).toHaveProperty('shouldAnimate')
    expect(result.current).toHaveProperty('prefersReducedMotion')
  })

  it('returns default values from the store', () => {
    const { result } = renderHook(() => useMotionPreference())

    expect(result.current.scale).toBe(5)
    expect(result.current.shouldAnimate).toBe(true)
    expect(result.current.prefersReducedMotion).toBe(false)
  })

  it('shouldAnimate is false when scale is 0', () => {
    useCustomizer.setState({ motion: 0 })

    const { result } = renderHook(() => useMotionPreference())

    expect(result.current.scale).toBe(0)
    expect(result.current.shouldAnimate).toBe(false)
  })

  it('shouldAnimate is false when system prefers reduced motion', () => {
    // Mock the system preference to prefer reduced motion
    mockMatchMedia(true)

    const { result } = renderHook(() => useMotionPreference())

    expect(result.current.prefersReducedMotion).toBe(true)
    expect(result.current.shouldAnimate).toBe(false)
  })

  it('shouldAnimate is false when both scale is 0 and system prefers reduced motion', () => {
    useCustomizer.setState({ motion: 0 })
    mockMatchMedia(true)

    const { result } = renderHook(() => useMotionPreference())

    expect(result.current.scale).toBe(0)
    expect(result.current.prefersReducedMotion).toBe(true)
    expect(result.current.shouldAnimate).toBe(false)
  })

  it('shouldAnimate is true when scale is above 0 and system does not prefer reduced motion', () => {
    useCustomizer.setState({ motion: 10 })

    const { result } = renderHook(() => useMotionPreference())

    expect(result.current.scale).toBe(10)
    expect(result.current.shouldAnimate).toBe(true)
  })

  it('reflects changes when motion is updated via the store', () => {
    const { result } = renderHook(() => useMotionPreference())

    expect(result.current.scale).toBe(5)
    expect(result.current.shouldAnimate).toBe(true)

    act(() => {
      useCustomizer.setState({ motion: 0 })
    })

    expect(result.current.scale).toBe(0)
    expect(result.current.shouldAnimate).toBe(false)
  })
})
