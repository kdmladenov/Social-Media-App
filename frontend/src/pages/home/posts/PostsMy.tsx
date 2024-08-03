import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { listMyPosts } from '../../../context/actions/postActions';
import defaultEndpoint from '../../../data/inputs/defaultEndpoint';
import useTypedSelector from '../../../hooks/useTypedSelector';
import PostCard from './PostCard';
import Pagination from '../../../components/Pagination';
import './styles/PostsMy.css';

const PostsMy: React.FC<{ showUserPostsOnly?: boolean }> = ({ showUserPostsOnly = false }) => {
  const dispatch = useDispatch();

  const [endpoint, setEndpoint] = useState(defaultEndpoint['postsMy']);

  const { posts, loading, error } = useTypedSelector((state) => state.postsMyList);
  const {  userInfo : {userId} } = useTypedSelector((state) => state.userLogin);

  const postsToShow = showUserPostsOnly ? posts?.filter((post) => post.userId === userId) : posts;

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
      ) : postsToShow?.length > 0 ? (
        <>
          {postsToShow.map((post) => (
            <PostCard key={post?.postId} post={post} />
          ))}
          <Pagination
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
            pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
            totalItems={postsToShow?.[0]?.totalDBItems}
          />
        </>
      ) : (
        <h2>You have no posts</h2>
      )}
    </section>
  );
};

export default PostsMy;
