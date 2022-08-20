import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { listMyPosts } from '../../../context/actions/postActions';
import defaultEndpoint from '../../../data/inputs/defaultEndpoint';
import useTypedSelector from '../../../hooks/useTypedSelector';


import PostCard from './PostCard';

import './styles/PostsMy.css';

const PostsMy: React.FC = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const [endpoint, setEndpoint] = useState(defaultEndpoint['postsMy']);

  const { posts, loading, error } = useTypedSelector((state) => state.postsMyList);

  useEffect(() => {
    // dispatch({ type: POST_CREATE_RESET });
    // if (userInfo?.role !== 'admin') {
    //   navigate('/login');
    // }
    // if (successCreate) {
    //   navigate(`/admin/products/${createdPost.postId}/edit/details`);
    // } else {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listMyPosts(`${page}${pageSize}${sort}${search}`));
    // }
  }, [
    dispatch,
    // navigate,
    // userInfo,
    // successDelete,
    // successRestore,
    // successCreate,
    // createdPost,
    endpoint
  ]);

  return (
    <section className="posts_my_container">
      {loading ? (
        //  || loadingDelete || loadingRestore || loadingCreate
        <Loader />
      ) : error ? (
        // || errorDelete || errorRestore || errorCreate
        <Message type="error">
          {
            error
            // || errorDelete || errorRestore || errorCreate
          }
        </Message>
      ) : posts?.length > 0 ? (
        <>
          {posts.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </>
      ) : (
        <h2>You have no posts</h2>
      )}
    </section>
  );
};

export default PostsMy;
