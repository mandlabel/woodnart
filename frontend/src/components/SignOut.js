import { useContext } from 'react'
import axios from 'axios'
import { profileContext } from '../context/profileContext';
import { useHistory } from "react-router-dom";

export const SignOut = async () => {
    const { getLogged } = useContext(profileContext);
    let history = useHistory();
    history.push('/')  
    await axios.get("/api/logout")
    await getLogged();
    
}