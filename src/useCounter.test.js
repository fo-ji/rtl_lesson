import { useCounter } from './useCounter'
import { act, renderHook } from '@testing-library/react-hooks'
import { cleanup } from '@testing-library/react'

// 各テストケースの直後にクリーンアップ
afterEach(() => cleanup())

describe('useCounter custom Hook', () => {
  it('Should increment by 1', () => {
    // renderHook関数でhooksを呼び出し、結果は{ result } で受け取る
    const { result } = renderHook(() => useCounter(3))
    expect(result.current.count).toBe(3)
    // act = 実行の処理を囲む必要あり
    act(() => {
      result.current.increment()
    })
    expect(result.current.count).toBe(4)
  })

  it('Should decrement by 1', () => {
    const { result } = renderHook(() => useCounter(3))
    expect(result.current.count).toBe(3)
    act(() => {
      result.current.decrement()
    })
    expect(result.current.count).toBe(2)
  })

  it('Should double the counter value', () => {
    const { result } = renderHook(() => useCounter(3))
    expect(result.current.count).toBe(3)
    act(() => {
      result.current.double()
    })
    expect(result.current.count).toBe(6)
  })

  it('Should triple the counter value', () => {
    const { result } = renderHook(() => useCounter(3))
    expect(result.current.count).toBe(3)
    act(() => {
      result.current.triple()
    })
    expect(result.current.count).toBe(9)
  })

  it('Should reset zero', () => {
    const { result } = renderHook(() => useCounter(3))
    expect(result.current.count).toBe(3)
    act(() => {
      result.current.reset()
    })
    expect(result.current.count).toBe(0)
  })
})
