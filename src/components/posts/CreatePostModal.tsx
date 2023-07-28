import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { styled } from 'styled-components';
import Button from '../common/Button';
import { Post } from '../../containers/posts/PostListContainer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CreatePostBlock = styled(ReactModal)`
    width: 400px;
    height: 400px;
    border: 1px solid black;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

type PostFormData = {
    title: string;
    body: string;
};

type CreatePostModalProps = {
    isOpen: boolean;
    onRequestClose: React.Dispatch<React.SetStateAction<boolean>>;
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({
    isOpen,
    onRequestClose,
    setPosts
}) => {
    const [postForm, setPostForm] = useState<PostFormData>({
        title: '',
        body: ''
    });
    const { groupID } = useParams();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post<Post>(`/api/posts/${groupID}`, postForm)
        .then((response) => {
            setPosts((prevPosts) => [...prevPosts, response.data])
            onRequestClose(false)
        }).catch((error) => {
            console.error('Error fetching groups:', error);
        });
    };

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        setPostForm((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <CreatePostBlock
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(false)}
        >
            <h1>Create a Promise</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        autoComplete="title"
                        name="title"
                        placeholder="title"
                        onChange={handleChange}
                        value={postForm.title}
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        name="body"
                        placeholder="body"
                        onChange={handleChange}
                        value={postForm.body}
                    />
                </div>
                {/* <div>
                    <label>Tags:</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div> */}
                {/* <div>
                    <label>Deadline:</label>
                    <input
                        name="deadline"
                        placeholder="deadline"
                        onChange={handleChange}
                        value={postForm.deadline}
                    />
                </div> */}
                <Button type="submit">Submit</Button>
                <Button type="button" onClick={() => onRequestClose(false)}>
                    Cancel
                </Button>
            </form>
        </CreatePostBlock>
    );
};

export default CreatePostModal;
