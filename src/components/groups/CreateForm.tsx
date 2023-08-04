import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { Group } from '../../contexts/GroupContext';
import Button from '../common/Button';
import axios from 'axios';

type CreateFormProps = {
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
};

type CreateFormData = {
    name: string;
    password: string;
};

const CreateForm: React.FC<CreateFormProps> = ({ setGroups }) => {
    const [formData, setFormData] = useState<CreateFormData>({
        name: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios
            .post<Group>('/api/groups/create', formData)
            .then((response) => {
                const newGroup: Group = {
                    groupID: response.data.groupID,
                    name: response.data.name,
                };
                setGroups((prevGroups) => [...prevGroups, newGroup]);
                // setGroups(response.data);
            })
            .catch((error) => {
                console.error('Error fetching groups:', error);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                autoComplete="name"
                name="name"
                placeholder="name"
                onChange={handleChange}
                value={formData.name}
            />
            <input
                autoComplete="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                value={formData.password}
            />
            <Button>Create</Button>
        </form>
    );
};

export default CreateForm;
