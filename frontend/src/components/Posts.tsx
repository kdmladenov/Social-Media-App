import React from 'react';
import postsDummyData from '../inputs/dummyInputs/postsDummyData';
import PostCard from './PostCard';

import './styles/Posts.css'


const Posts: React.FC = () => {
  return (
    <section className='posts_container'>
      {postsDummyData.map((post, index) => (
        <PostCard
          postId={post.postId}
          author={post.author}
          message={post.message}
          images={post.images}
        />
      ))}
    </section>
  );
};

export default Posts;
