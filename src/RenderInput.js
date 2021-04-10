import { useState } from 'react'

const RenderInput = (props) => {
  const { outputConsole } = props
  const [input, setInput] = useState('')

  const outputValue = () => {
    if (input) {
      outputConsole(input)
    }
  }

  const updateValue = (e) => {
    setInput(e.target.value)
  }

  return (
    <div>
      <input
        onChange={updateValue}
        placeholder="Enter"
        type="text"
        value={input}
      />
      <button onClick={outputValue}>Console</button>
    </div>
  )
}

export default RenderInput
