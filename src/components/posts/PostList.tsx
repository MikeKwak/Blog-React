import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';
import { Post } from '../../containers/posts/PostListContainer';

const PostListBlock = styled(Responsive)`
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

type PostItemProps = {
    post : Post
}


const PostItem: React.FC<PostItemProps> = ({ post }) => {
    const { publishedDate, user, tags, title, body, _id } = post;
    const username = user.username;
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
        </PostItemBlock>
    );
};

interface PostListProps {
    posts: Post[];
    loading: boolean;
    error: boolean;
    showWriteButton: boolean;
}

const PostList: React.FC<PostListProps> = ({
    posts,
    loading,
    error,
    showWriteButton,
}) => {
    // 에러 발생 시
    if (error) {
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
    }

    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                {showWriteButton && (
                    <Button cyan to="/write">
                        새 글 작성하기
                    </Button>
                )}
            </WritePostButtonWrapper>
            {!loading && posts && (
                <div>
                    {posts.map((post) => (
                        <PostItem post={post} key={post._id} />
                    ))}
                </div>
            )}
        </PostListBlock>
    );
};

export default PostList;
