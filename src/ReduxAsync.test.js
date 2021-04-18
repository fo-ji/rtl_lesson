import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import customCounterReducer from './features/customCounter/CustomCounterSlice'
import ReduxAsync from './ReduxAsync'

afterEach(() => {
  cleanup()
})

describe('ReduxAsync test', () => {
  let store
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    })
  })

  it('Should display value with 100 * payload', async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    )
    userEvent.click(screen.getByText('fetchDummy'))
    // 非同期処理や最終的に存在する値を検索するときはfindbyを使用する
    expect(await screen.findByTestId('count-value')).toHaveTextContent(105)
  })
})
