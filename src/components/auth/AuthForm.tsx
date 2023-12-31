import React, { ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

type AuthFormProps = {
    type: 'login' | 'register';
    form: {
        username: string;
        password: string;
        passwordConfirm?: string; 
    };
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    error: string;
}

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5 rem;
    outline: none;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
`;

const ButtonWithMarginTop = styled(Button)`
    margin-top: 1rem;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const textMap = {
    login: 'Login',
    register: 'Register',
};

const AuthForm : React.FC<AuthFormProps>= ({ type, form, onChange, onSubmit, error }) => {
    const text = textMap[type];
    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <StyledInput
                    autoComplete="username"
                    name="username"
                    placeholder="username"
                    onChange={onChange}
                    value={form.username}
                />
                <StyledInput
                    autoComplete="new-password"
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={onChange}
                    value={form.password}
                />
                {type === 'register' && (
                    <StyledInput
                        autoComplete="new-password"
                        name="passwordConfirm"
                        placeholder="confirm password"
                        type="password"
                        onChange={onChange}
                        value={form.passwordConfirm}
                    />
                )}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {/* same as <Button cyan={true} fullwidth{true} */}
                <ButtonWithMarginTop cyan fullWidth>
                    {text}
                </ButtonWithMarginTop>
            </form>
            <Footer>
                {type === 'login' ? (
                    <Link to="/register">Register</Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;
