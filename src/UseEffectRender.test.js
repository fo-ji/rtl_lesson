import { render, screen } from '@testing-library/react'
import UseEffectRender from './UseEffectRender'

describe('useEffect rendering', () => {
  it('Should render only after async function resolved', async () => {
    render(<UseEffectRender />)
    // [//]で囲む（正規表現）と比較対象に中の文字列が含まれるか真偽値で判定する
    expect(screen.queryByText(/I am/)).toBeNull()
    expect(await screen.findByText(/I am/)).toBeInTheDocument()
  })
})
