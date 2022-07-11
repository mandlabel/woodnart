
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { profileContext } from "./context/profileContext";


export const Nav = () => {
  const { loggedIn } = useContext(profileContext)
  const [ admin, setAdmin ] = useState(undefined)

  const getAdmin = async () => {
    const { data: user } = await axios.get('/api/currentUser')
    setAdmin(user.admin)
  }
  useEffect(() => {
    getAdmin()
  }, []);
    return ( 
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <ul className="nav navbar-nav">
        <li className="nav-item">
            <Link className="navbar-brand text-center " to="/"> WOOD N ART <img src="logom.png" className="text-center" maxwidth="60" height="60"/></Link>
 
        </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Termékek</Link>
          </li>
          {loggedIn === false && (
            <>
              <li className="nav-item">
                <Link to="/signin" className="nav-link">Bejelentkezés</Link>
              </li>
            </>
          )}
          {loggedIn === true && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Kosár</Link>
              </li>
              {admin === true && (
                <>
              <li className="nav-item">
                <Link className="nav-link btn btn-danger" to="/upload">Termék feltöltése</Link>
              </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/signout">Kijelentkezés</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    )
}
