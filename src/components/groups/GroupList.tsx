import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { Group } from '../../containers/groups/GroupListContainer';
import CreateForm from './CreateForm';
import JoinForm from './JoinForm';
import { UserContext } from '../../containers/auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const GroupListBlock = styled.div`
    margin-top: 2rem;
    display: flex;
`;

const GroupItemBlock = styled.div`
    position: relative;
    margin-left: 20px;
    &:first-child {
        margin-left: 0%;
    }
`;

const GroupLink = styled(Link)`
    border: 1px solid black;
    border-radius: 4px;
    padding: 13px;
    padding-top: 25px;

    text-decoration: none;
    color: #333;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const DeleteButton = styled.button`
    position: absolute;
    top: -17px;
    right: 5px;
    background: transparent;
    border: none;
    color: red;
    cursor: pointer;

    &:hover {
        color: darkred;
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
    deleteGroup: (id: string) => void;
};

const GroupItem: React.FC<GroupItemProps> = ({ group, deleteGroup }) => {
    const { user } = useContext(UserContext);
    const { name, groupID } = group;

    const handleDeleteGroup = () => {
        
        deleteGroup(groupID)
        
    };

    const username = user?.username || 'guest';
    return (
        <GroupItemBlock>
            <GroupLink to={`/${username}/${groupID}`}>{name}</GroupLink>
            <DeleteButton onClick={handleDeleteGroup}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </DeleteButton>
        </GroupItemBlock>
    );
};

type GroupListProps = {
    groups: Group[];
    loading: boolean;
    error: boolean;
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
    deleteGroup : (id: string) => void;
};

const GroupList: React.FC<GroupListProps> = ({
    groups,
    loading,
    error,
    setGroups,
    deleteGroup
}) => {
    const [formType, setFormType] = useState<string>('join');

    if (error) {
    }
    console.log(groups)
    return (
        <>
            {!loading && groups && (
                <GroupListBlock>
                    
                    {groups.map((group) => (
                        <GroupItem
                            group={group}
                            deleteGroup={deleteGroup}
                            key={group.groupID}
                        />
                    ))}
                </GroupListBlock>
            )}

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
                <JoinForm setGroups={setGroups} />
            )}
        </>
    );
};

export default GroupList;
