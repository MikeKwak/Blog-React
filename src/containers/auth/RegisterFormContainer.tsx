import { ChangeEvent, FormEvent,  useState } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



type RegisterForm = {
    username: string;
    password: string;
    passwordConfirm: string;
}

const RegisterFormContainer = () => {
    const [ form, setForm ] = useState<RegisterForm>({
        username: '',
        password: '',
        passwordConfirm: '',
    })
    const [ error, setError ] = useState("")
    const [ auth, setAuth ] = useState(false);

    const navigate = useNavigate();
    

    const onChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        
        setForm((prevForm) => ({
            ...prevForm, 
            [name]: value,
        }))
    }

    const onSubmit = async (e : FormEvent) => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;

        if ([username, password, passwordConfirm].includes('')){
            setError('Error: Missing Field');
            return;
        }

        if(password !== passwordConfirm){
            setError('Error: Passwords do not match');
            setForm((prevForm) => ({
                ...prevForm,
                [password]: '',
                [passwordConfirm]: '',
            }))
            return;
        }

        try {
            const response = await axios.post('/api/auth/register', { username, password });
            const user = response.data;
            console.log(user);

            navigate(`/${username}/groups`);
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage not working')
            }
        } catch (e : any) {
            if(e.response.status === 400){
                setError("Username too long or short")
            }else if(e.response.status === 409){
                setError("Username Taken")
            }else if(e.response.status === 500){
                setError("Server Error : contact help")
            }
        }
    }

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default RegisterFormContainer;
