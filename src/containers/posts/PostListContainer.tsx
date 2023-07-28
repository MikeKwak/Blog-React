import React, { useEffect, useState, useContext } from 'react';
import PostList from '../../components/posts/PostList';
import axios from 'axios'; // Import Axios
import { UserContext } from '../auth/UserContext';
import { useParams } from 'react-router-dom';

export type Post = {
    _id: string;
    title: string;
    body: string;
    tags: string[];
    publishedDate: Date;
    user: {
        _id: string;
        username: string;
    };
}

const PostListContainer: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const { user } = useContext(UserContext);
    const { groupID } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get<Post[]>(`/api/posts/${groupID}`)
            .then((response) => {
                setPosts(response.data); // Update the state with the fetched posts
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                setError(true);
                setLoading(false);

            });
    }, []);

    return (
        <PostList
            loading={loading}
            error={error}
            posts={posts}
            setPosts={setPosts}
            showWriteButton={user ? true : false}
        />
    );
};

export default PostListContainer;
