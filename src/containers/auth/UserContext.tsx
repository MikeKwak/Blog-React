import { createContext, useState } from 'react';

export interface User {
    _id: String;
    username: string;
    groups?: {
        _id: string;
        name: string;
    }[];
}

// Define the default user object
export const defaultUser: User = {
    _id: '',
    username: '',
};

// Create the context with an initial value
export const UserContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
}>({
    user: null,
    setUser: () => {},
});

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
