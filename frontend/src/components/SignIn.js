import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

export const SignIn = () => {
    const [username, setUserName] = useState('valami')
    const [password, setPassword] = useState('valami')

    let history = useHistory();
    const toregister = () => {
      history.push('/signup')
    }
    const signin = async () => {
      try {
        await axios.post('/api/login', {
          username,
          password
        })
        history.push('/')
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
            <label>Jelszó :</label>
            <input type="password" className="form-control w-50 d-block mx-auto" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="row d-block mx-auto">
        <button className="btn btn-dark mt-3 mb-2 p-1 d-block mx-auto" onClick={signin}>Belépek</button>
        <button className="btn btn-danger mt-3 mb-2 p-1 d-block mx-auto" onClick={toregister}>Nincs fiókom</button>
        </div>
        </div>
        </div>
    )
}
