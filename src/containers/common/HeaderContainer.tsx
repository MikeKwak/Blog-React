import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/common/Header';
import axios from 'axios';
import { UserContext } from '../auth/UserContext';


const HeaderContainer = () => {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    const onLogout = async () => {
        setLoggedIn(false)
        setUser(null)
        await axios.post('/api/auth/logout');
      };

  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;