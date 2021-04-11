import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import MockServer from './MockServer'

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    // 外部APIにアクセスするのではなく、擬似的にmockServerにアクセスする
    return res(ctx.status(200), ctx.json({ username: 'Bred dummy' }))
  })
)

// mockServerの初期設定
beforeAll(() => server.listen())
afterEach(() => {
  // 各テストが終了後に再起動するように設定する
  server.resetHandlers()
  cleanup()
})
// 全てのテストが終了したらサーバーを閉じる
afterAll(() => server.close())

describe('Mocking API', () => {
  it('[Fetch success]Should display fetched correctly and button disable', async () => {
    render(<MockServer />)
    userEvent.click(screen.getByRole('button'))
    expect(await screen.findByText('Bred dummy')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
  })

  it('[Fetch failure]Should display error msg, no render heading and button abled', async () => {
    // 大元で定義したserverの設定をカスタマイズしたいときはuseで書き換える
    // このitの中だけ有効
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users/1',
        (req, res, ctx) => {
          return res(ctx.status(404))
        }
      )
    )
    render(<MockServer />)
    userEvent.click(screen.getByRole('button'))
    expect(await screen.findByTestId('error')).toHaveTextContent(
      'Fetching Failed !'
    )
    expect(screen.queryByRole('haeding')).toBeNull()
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
  })
})
