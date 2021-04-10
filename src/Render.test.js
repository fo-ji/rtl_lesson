import React from 'react'
import { render, screen } from '@testing-library/react'
import Render from './Render'

// テストのタイトル
describe('Rendering', () => {
  // 具体的なテスト内容
  it('Shoud render all the elements correctly', () => {
    // renderを使用してコンポーネントの情報を取得する
    render(<Render />)
    // 取得した情報をscreenで出力する
    // screen.debug()
    // https://github.com/A11yance/aria-query#elements-to-roles
    // screen.debug(screen.getByRole('heading'))
    // https://jestjs.io/docs/expect
    expect(screen.getByRole('heading')).toBeTruthy()
    expect(screen.getByRole('textbox')).toBeTruthy()
    // buttonは複数ある想定
    expect(screen.getAllByRole('button')[0]).toBeTruthy()
    expect(screen.getAllByRole('button')[1]).toBeTruthy()

    // textの内容から検索する方法
    // screen.debug(screen.getByText('Udemy'))
    expect(screen.getByText('Udemy')).toBeTruthy()
    // 該当のtextがないことを証明するとき
    expect(screen.queryByText('Udeeeeemy')).toBeNull()

    // idから検索する方法
    expect(screen.getByTestId('copyright')).toBeTruthy()
  })
})
