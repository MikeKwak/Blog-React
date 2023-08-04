import React, { useEffect, useState, useContext } from 'react';
import GroupList from '../../components/groups/GroupList';
import axios from 'axios'; // Import Axios
import { UserContext } from '../../contexts/UserContext';
import { Group } from '../../contexts/GroupContext';
import * as groupAPI from '../../lib/api/groups'


const GroupListContainer: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const deleteGroup = (id: string) => {
        //API call
        groupAPI.leave(id)
            .then(() =>
                setGroups(groups.filter((group) => group.groupID !== id)),
            )
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        console.log("groups/useEffect");
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
            return () => {
                console.log('컴포넌트가 화면에서 사라짐');
              };
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
