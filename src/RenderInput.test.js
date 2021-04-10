import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RenderInput from './RenderInput'

// クリーンアップ関数を実行しておくことで、連続してテストを行う
// 前回のitのテストがアンマウント状態になるので、副作用など考慮しなくて良い
afterEach(() => cleanup())

describe('Rendering', () => {
  it('Should render all the elements correctly', () => {
    render(<RenderInput />)
    expect(screen.getByRole('button')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter')).toBeTruthy()
  })
})

describe('Input form onChange event', () => {
  it('Shoud update input value correctly', () => {
    render(<RenderInput />)
    const inputValue = screen.getByPlaceholderText('Enter')
    // type以外にもclick, doubleClickなど様々なユーサーのアクションを使用できる
    userEvent.type(inputValue, 'test') // textformにtestとタイピングすることをシュミレート
    expect(inputValue.value).toBe('test')
  })
})

describe('Console button conditionally triggered', () => {
  it('Shoud not trigger output function', () => {
    // 関数をpropsで受け取っている場合、jestで用意されているmock関数をダミーで使用する
    // 関数が呼び出されるかどうかのみテストする
    const outputConsole = jest.fn()
    render(<RenderInput outputConsole={outputConsole} />)
    userEvent.click(screen.getByRole('button'))
    expect(outputConsole).not.toHaveBeenCalled()
  })

  it('Should trigger output function', () => {
    const outputConsole = jest.fn()
    render(<RenderInput outputConsole={outputConsole} />)
    const inputValue = screen.getByPlaceholderText('Enter')
    userEvent.type(inputValue, 'test')
    userEvent.click(screen.getByRole('button'))
    expect(outputConsole).toHaveBeenCalledTimes[1]
  })
})
