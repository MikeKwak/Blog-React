import client from './client';

export const login = ({
    username,
    password,
}: {
    username: String;
    password: String;
}) => client.post('/api/auth/login', { username, password });

export const register = async ({
    username,
    password,
}: {
    username: String;
    password: String;
}) => {
    const response = await client.post('/api/auth/register', {
        username,
        password,
    });
    return response.data;
};

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');

// 로그아웃
export const logout = () => client.post('/api/auth/logout');
