import React, { useState, FormEvent } from 'react';
import { Group } from '../../containers/groups/GroupListContainer';
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
    
        axios.post('/api/groups', formData).then((response) => {
            setGroups(response.data);

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
                        value={formData.groupID}
                    />
                    <input
                        autoComplete="password"
                        name="password"
                        placeholder="name"
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <Button>Join</Button>
                </form>
    )
}

export default JoinForm