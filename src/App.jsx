import { useState, useCallback } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(()=>{
    let pass = "" //we will add the generated passwords in this `pass` variable and using setPassword method we'll store the password into state variable `password`
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+{}:~`/|<>.,[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
    }

  }, [length, numberAllowed, charAllowed, setPassword])

  return (
    <>
      <h1 className='text-sky-400 text-4xl text-center my-4'>Password</h1>
    </>
  )
}

export default App
