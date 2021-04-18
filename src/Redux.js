import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from './features/customCounter/CustomCounterSlice'

const Redux = () => {
  const [number, setNumber] = useState(0)
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  return (
    <div>
      <h3>Redux Integration Test</h3>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span data-testid="count-value">{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(incrementByAmount(number | 0))}>
          incrementByAmount
        </button>
        <input
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter"
          type="text"
          value={number}
        />
      </div>
    </div>
  )
}

export default Redux
