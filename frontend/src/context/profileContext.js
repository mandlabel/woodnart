import React, { createContext, useEffect, useState } from "react";
import axios from "axios"
import PropTypes from 'prop-types';

export const profileContext = createContext()

function ProfileProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined)

    const getLoggedStatus = async () => {
        const logged = await axios.get('/api/getLogged')
        setLoggedIn(logged.data)
    }
    useEffect(() => {
        getLoggedStatus()
    }, []);

    return (
        <profileContext.Provider value={{ 
            loggedIn, getLoggedStatus
        }}>
            {props.children}
        </profileContext.Provider>
    )
}

ProfileProvider.propTypes = {
    children: PropTypes.node,
}

export { ProfileProvider }

