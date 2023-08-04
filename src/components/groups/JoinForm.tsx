import React, { useState, FormEvent } from 'react';
import { Group } from '../../contexts/GroupContext';
import Button from '../common/Button';
import axios from 'axios';

type JoinFormProps = {
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
};

type JoinFormData = {
    groupID: string;
    password: string;
}

const JoinForm: React.FC<JoinFormProps> = ({ setGroups }) => {
    const [ formData, setFormData ] = useState<JoinFormData>({
        groupID: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        axios.post<Group>('/api/groups/join', formData)
        .then((response) => {
            setGroups((prevGroups) => [ ...prevGroups, response.data]);
        }).catch((error) => {
            console.error('Error fetching groups:', error);
        })
    };

    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    return(
        <form onSubmit={handleSubmit}>
                    <input
                        autoComplete="groupID"
                        name="groupID"
                        placeholder="groupID"
                        onChange={handleChange}
                        value={formData.groupID}
                    />
                    <input
                        autoComplete="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <Button>Join</Button>
                </form>
    )
}

export default JoinForm