import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';
import { Post } from '../../containers/posts/PostListContainer';
import CreatePostModal from './CreatePostModal';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../containers/auth/UserContext';

const PostListBlock = styled(Responsive)`
    position: relative;
    margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    /* 맨 위 포스트는 padding-top 없음 */
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]};
        }
    }
    p {
        margin-top: 2rem;
    }
`;

const CompletedButton = styled(Button)`
    position: absolute;
    right: 0px;
    &:hover {
        color: darkred;
    }
`

type PostItemProps = {
    post : Post
    handleCompletePost : (_id : string) => void
}

const PostItem: React.FC<PostItemProps> = ({ post, handleCompletePost }) => {
    const { publishedDate, tags, title, body, _id } = post;
    const username = post.user.username;
    const { user } = useContext(UserContext)

    return (
        <PostItemBlock>
            <h2>
                <Link to={`/@${username}/${_id}`}>{title}</Link>
            </h2>
            <SubInfo
                username={username}
                publishedDate={new Date(publishedDate)}
            />
            <Tags tags={tags} />
            <p>{body}</p>
            {(user && user.username === username) ? (<CompletedButton onClick={() => handleCompletePost(_id)}>
                Complete
            </CompletedButton>) : (<></>)}
        </PostItemBlock>
    );
};

interface PostListProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
    loading: boolean;
    error: boolean;
    showWriteButton: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, setPosts, loading, error, showWriteButton }) => {
    const [ createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false)
    const { groupID } = useParams();

    if (error) {
        return <PostListBlock>Error : User / Group not selected</PostListBlock>;
    }

    const handleCompletePost = (_id : string) => {
        axios.delete(`/api/posts/${groupID}/${_id}`).then(() => {
            setPosts(posts.filter((post) => (post._id !== _id)))
        })
        
    }

    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                {showWriteButton && (
                    <Button cyan onClick={() => setCreateModalIsOpen(true)}>
                        새 글 작성하기
                    </Button>
                )}
            </WritePostButtonWrapper>

            <CreatePostModal isOpen={createModalIsOpen} onRequestClose={() => setCreateModalIsOpen(false)} setPosts={setPosts} />
          
            

            {!loading && posts && (
                <div>
                    {posts.map((post) => (
                        <PostItem post={post} handleCompletePost={handleCompletePost} key={post._id} />
                    ))}
                </div>
            )}
        </PostListBlock>
    );
};

export default PostList;
