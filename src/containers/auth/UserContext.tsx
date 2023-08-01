import { createContext, useState } from 'react';

export type User = {
    _id: string;
    username: string;
    groups?: {
        _id: string;
        name: string;
    }[];
};

// Create the context with an initial value of null
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
