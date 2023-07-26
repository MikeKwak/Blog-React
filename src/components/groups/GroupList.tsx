import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { Group } from '../../containers/groups/GroupListContainer';
import CreateForm from './CreateForm';
import JoinForm from './JoinForm';
import { UserContext } from '../../containers/auth/UserContext'

const GroupListBlock = styled.div`
    margin-top: 2rem;
    display: flex;
`;

const GroupItemBlock = styled(Link)`
    width: 300px;
    border: 1px solid black;
    border-radius: 4px;
    padding: 16px;
    margin-left: 20px;
    text-decoration: none;
    color: #333;
    transition: background-color 0.2s ease-in-out;
    &:first-child {
        margin-left: 0%;
    }
    &:hover {
        background-color: #f5f5f5;
    }
`;

const CreateJoinButtonsWrapper = styled.div`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

type GroupItemProps = {
    group: Group;
};

const GroupItem: React.FC<GroupItemProps> = ({ group }) => {
    const { user } = useContext(UserContext);
    const { name, groupID } = group;

    const username = user?.username || 'guest';
    return <GroupItemBlock to={`/${username}/${groupID}`}>{name}</GroupItemBlock>;
};

type GroupListProps = {
    groups: Group[];
    loading: boolean;
    error: boolean;
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>
};

const GroupList: React.FC<GroupListProps> = ({ groups, loading, error, setGroups }) => {
    const [formType, setFormType] = useState<string>('join');

    if (error) {
    }

    return (
        <>
            <GroupListBlock>
                {!loading && groups && (
                    <div>
                        {groups.map((group) => (
                            <GroupItem group={group} key={group.groupID} />
                        ))}
                    </div>
                )}
            </GroupListBlock>

            <CreateJoinButtonsWrapper>
                <Button cyan onClick={() => setFormType('create')}>
                    Create A Group
                </Button>
                <Button cyan onClick={() => setFormType('join')}>
                    Join A Group
                </Button>
            </CreateJoinButtonsWrapper>
            
            {formType === 'create' ? (
                <CreateForm setGroups={setGroups} />
            ) : (
                <JoinForm setGroups={setGroups}/>
            )}
        </>
    );
};

export default GroupList;

