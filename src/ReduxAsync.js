import { useDispatch, useSelector } from 'react-redux'
import {
  selectCount,
  selectUsername,
  fetchDummy,
  fetchJSON,
} from './features/customCounter/CustomCounterSlice'

const ReduxAsync = () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)
  const username = useSelector(selectUsername)

  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => dispatch(fetchDummy(5))}>fetchDummy</button>
      {username && <h1>{username}</h1>}
      <button onClick={() => dispatch(fetchJSON())}>fetchJSON</button>
    </div>
  )
}

export default ReduxAsync
