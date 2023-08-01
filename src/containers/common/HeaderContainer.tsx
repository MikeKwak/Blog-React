import { useContext } from 'react';
import Header from '../../components/common/Header';
import axios from 'axios';
import { UserContext } from '../auth/UserContext';


const HeaderContainer = () => {
    const { user, setUser } = useContext(UserContext);

    const onLogout = async () => {
        setUser(null)
        await axios.post('/api/auth/logout');
      };

  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;