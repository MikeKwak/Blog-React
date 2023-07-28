import React, { useEffect, useState, useContext } from 'react';
import GroupList from '../../components/groups/GroupList';
import axios from 'axios'; // Import Axios
import { UserContext } from '../auth/UserContext';

export type Group = {
    groupID: string;
    name: string;
};

const GroupListContainer: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const deleteGroup = (id: string) => {
        axios
            .post<string>('/api/groups/leave', { groupID: id })
            .then(() =>
                setGroups(groups.filter((group) => group.groupID !== id)),
            )
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get<Group[]>('/api/groups')
            .then((response) => {
                setGroups(response.data); 
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                setError(true);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <GroupList
                loading={loading}
                error={error}
                groups={groups}
                setGroups={setGroups}
                deleteGroup={deleteGroup}
            />
            ;
        </>
    );
};

export default GroupListContainer;
