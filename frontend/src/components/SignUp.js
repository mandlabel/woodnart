import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
export const SignUp = () => {
  const [username, setUserName] = useState('valami')
  const [email, setEmail] = useState('valami')
  const [password, setPassword] = useState('valami')
  let history = useHistory();
  const signup = async () => {
    try {
      const { data } = await axios.post('/api/register', {
        username,
        email,
        password,
      })
      console.log(data)
      history.push('/signin')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
    <div className="card w-50 d-block mx-auto bg-light">
    <div className="form-outline">
        <label>Felhasználónév :</label>
        <input value={username} className="form-control w-50 d-block mx-auto" onChange={(e) => setUserName(e.target.value)} />
        <label>E-Mail :</label>
        <input type="text" className="form-control w-50 d-block mx-auto" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Jelszó :</label>
        <input type="password" className="form-control w-50 d-block mx-auto" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <div className="row d-block mx-auto">
    <button className="btn btn-dark mt-3 mb-2 p-1 d-block mx-auto" onClick={signup}>Regisztrál</button>
    </div>
    </div>
    </div>
  )
}
