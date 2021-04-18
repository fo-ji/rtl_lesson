import { render, screen, cleanup } from '@testing-library/react'
import useEvent from '@testing-library/user-event'
// Redux用のテストストアが必要でstore.jsで行っていることを記述する必要がある
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import customCounterReducer from '../src/features/customCounter/CustomCounterSlice'

import Redux from './Redux'
import userEvent from '@testing-library/user-event'

// 各ケース前にクリーンアップする設定
afterEach(() => {
  cleanup()
})

describe('Redux Integration Test', () => {
  // 各ケースの前に毎回テスト用のストアを生成
  // 毎回Sliceで定義した初期値を参照する
  let store
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    })
  })

  it('Should display value with increment by 1 per click', () => {
    render(
      // reduxを使用するコンポーネントを通常通りラップする
      <Provider store={store}>
        <Redux />
      </Provider>
    )
    userEvent.click(screen.getByText('+'))
    userEvent.click(screen.getByText('+'))
    userEvent.click(screen.getByText('+'))
    expect(screen.getByTestId('count-value')).toHaveTextContent(3)
  })

  it('Should display value decrement by 1 per click', () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    )
    userEvent.click(screen.getByText('-'))
    userEvent.click(screen.getByText('-'))
    expect(screen.getByTestId('count-value')).toHaveTextContent(-2)
  })

  it('Should display value with incrementByAmount', () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    )
    userEvent.type(screen.getByPlaceholderText('Enter'), '30')
    userEvent.click(screen.getByText('incrementByAmount'))
    expect(screen.getByTestId('count-value')).toHaveTextContent(30)
  })
})
