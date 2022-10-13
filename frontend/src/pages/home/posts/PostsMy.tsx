import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { listMyPosts } from '../../../context/actions/postActions';
import defaultEndpoint from '../../../data/inputs/defaultEndpoint';
import useTypedSelector from '../../../hooks/useTypedSelector';
import PostCard from './PostCard';
import './styles/PostsMy.css';

const PostsMy: React.FC = () => {
  const dispatch = useDispatch();

  const [endpoint, setEndpoint] = useState(defaultEndpoint['postsMy']);

  const { posts, loading, error } = useTypedSelector((state) => state.postsMyList);

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listMyPosts(`${page}${pageSize}${sort}${search}`));
  }, [dispatch, endpoint]);

  return (
    <section className="posts_my_container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : posts?.length > 0 ? (
        <>
          {posts.map((post) => (
            <PostCard key={post?.postId} post={post} />
          ))}
        </>
      ) : (
        <h2>You have no posts</h2>
      )}
    </section>
  );
};

export default PostsMy;
