import { render, screen, cleanup } from '@testing-library/react'
import FrameworkList from './FrameworkList'

afterEach(() => cleanup())

describe('Rendering the list with props', () => {
  it('Should render No data!! when no data propped', () => {
    render(<FrameworkList />)
    expect(screen.getByText('No data!!')).toBeInTheDocument()
  })

  it('Should render list item correctly', () => {
    const dummyData = [
      { id: 1, item: 'React dummy' },
      { id: 2, item: 'Angular dummy' },
      { id: 3, item: 'Vue dummy' },
    ]
    render(<FrameworkList frameworks={dummyData} />)
    const frameworkItems = screen
      .getAllByRole('listitem')
      .map((el) => el.textContent)

    // dummyDataのitemの情報だけを抽出して、配列にする
    const dummyItems = dummyData.map((el) => el.item)
    // propsで受け取った値とrenderする値はイコールか
    expect(frameworkItems).toEqual(dummyItems)
    // また、成功している場合、「No data!!」は表示されないか
    expect(screen.queryByText('No data!!')).toBeNull()
  })
})
