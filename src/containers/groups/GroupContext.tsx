import { createContext, useState } from 'react';

export type Group = {
    groupID: string;
    name: string;
};

export const GroupContext = createContext<{
    group: Group;
    setGroup: (group: Group) => void;
}>({
    group: {
        groupID: '',
        name: '',
    },
    setGroup: () => {},
});

interface GroupProviderProps {
    children: React.ReactNode;
}

export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
    const [group, setGroup] = useState<Group>({
        groupID: '',
        name: '',
    });

    return (
        <GroupContext.Provider value={{ group, setGroup }}>
            {children}
        </GroupContext.Provider>
    );
};
