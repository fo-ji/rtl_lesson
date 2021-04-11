const FrameworkList = (props) => {
  const { frameworks } = props

  if (!frameworks || !frameworks.length) return <h1>No data!!</h1>

  return (
    <div>
      <ul>
        {frameworks.map(({ id, item }) => (
          <li key={id}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default FrameworkList
