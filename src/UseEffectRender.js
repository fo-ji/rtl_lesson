import { useEffect, useState } from 'react'
import axios from 'axios'

const UseEffectRender = () => {
  const [user, setUser] = useState(null)

  // const fetchJSON = async () => {
  //   const res = await axios.get('https://jsonplaceholder.typicode.com/users/1')
  //   return res.data
  // }

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await fetchJSON()
  //     setUser(user)
  //   }
  //   fetchUser()
  // }, [])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users/1').then((res) => {
      setUser(res ? res.data : null)
    })
  }, [])

  return (
    <div>
      {user ? (
        <p>
          I am {user.username} : {user.email}
        </p>
      ) : null}
    </div>
  )
}

export default UseEffectRender
