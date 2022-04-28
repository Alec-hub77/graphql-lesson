import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import './App.scss'
import { CREATE_USER } from './mutation/user';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';


function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const { data: useData, loading: userLoading } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  })
  const [newUser] = useMutation(CREATE_USER)

  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)
  

  useEffect(() => {
    if(!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  console.log(useData)

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({data}) => {
      console.log(data)
      setUsername('')
      setAge(0)
      refetch()
    })
  }
  
  const getAll = (e) => {
    e.preventDefault()
    refetch()
  }

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="app">
        <form>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
          <div className="btns">
            <button onClick={e => addUser(e)}>Create user</button>
            <button onClick={e => getAll(e)}>Get user</button>
          </div>
        </form>
        <div>
          { users.map((user) => (
            <div className="user" key={user.id}>
              <div>{user.id}</div>
              <div>{user.username}</div>
              <div>{user.age}</div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default App
