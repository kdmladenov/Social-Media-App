import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './styles/PostCard.css';
import { BASE_URL, COMMENT } from '../constants/constants';
import useTypedSelector from '../hooks/useTypedSelector';

import Button from './Button';
import Popover from './Popover';
import PostCardProps from '../models/components/PostCardProps';
import Avatar from './Avatar';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import usersDummyData from '../inputs/dummyInputs/usersDummyData';
import { createComment } from '../state/actions/commentsActions';
import PostCardFooter from './PostCardFooter';
import PostType from '../models/PostType';

const PostCard: React.FC<{ post: PostType }> = ({
  post
  // reactions,
  // comments
}) => {
  // const dispatch = useDispatch();

  // const portalRefs = useTypedSelector((state) => state.portalRefs);
  // const {
  //   portalRefsMap: { toast_cart: toastCartRef }
  // } = portalRefs;

  const {
    postId,
    userId,
    userFirstName,
    userLastName,
    userAvatar,
    authorId,
    authorFirstName,
    authorLastName,
    authorAvatar,
    message,
    image,
    feelingTypeId,
    feelingType,
    locationId,
    city,
    country,
    createdAt,
    updatedAt,
    isDeleted,
    totalDBItems
  } = post;

  // const { firstName, lastName, avatar } = author;

  return (
    <div className={`post_card card`}>
      <div className="post_header">
        <Avatar imageUrl={userAvatar} firstName={userFirstName} lastName={userLastName} />
      </div>
      <div className="message">
        <Link to={`/posts/${postId}`}>{message}</Link>
      </div>
      <div className="images">
        {[image].map((image) => (
          <Link key={image} to={`/posts/${postId}`}>
            <img
              crossOrigin="anonymous"
              src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`}
              alt="post"
              className="image"
            />
          </Link>
        ))}
      </div>
      <PostCardFooter postId={postId} />
    </div>
  );
};

export default PostCard;
