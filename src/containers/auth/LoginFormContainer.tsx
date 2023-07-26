import { ChangeEvent, FormEvent, useState } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

type LoginForm = {
    username: string;
    password: string;
}

const LoginFormContainer = () => {
    const [form, setForm] = useState<LoginForm>({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { username, password } = form;

        if ([username, password].includes('')) {
            setError('Error: Missing Field');
            return;
        }

        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password,
            });
            const user = response.data;
            console.log(user);
            setUser(user);

            navigate(`/${username}/groups`);
        } catch (e: any) {
            if (e.response.status === 401) {
                setError('Unathorized');
            } else if (e.response.status === 500) {
                setError('Server Error : contact help');
            }
        }
    };
    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default LoginFormContainer;
