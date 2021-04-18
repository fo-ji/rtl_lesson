import { useDispatch, useSelector } from 'react-redux'
import {
  selectCount,
  fetchDummy,
} from './features/customCounter/CustomCounterSlice'

const ReduxAsync = () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)

  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => dispatch(fetchDummy(5))}>fetchDummy</button>
    </div>
  )
}

export default ReduxAsync
