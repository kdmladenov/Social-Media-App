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

const PostCard: React.FC<PostCardProps> = ({
  postId,
  author,
  message,
  images
  // reactions,
  // comments
}) => {
  // const dispatch = useDispatch();

  // const portalRefs = useTypedSelector((state) => state.portalRefs);
  // const {
  //   portalRefsMap: { toast_cart: toastCartRef }
  // } = portalRefs;

  const { fullName, avatar } = author;

  return (
    <div className={`post_card card`}>
      <div className="post_header">
        <Avatar imageUrl={avatar} fullName={fullName} />
      </div>
      <div className="message">
        <Link to={`/posts/${postId}`}>{message}</Link>
      </div>
      <div className="images">
        {images.map((image) => (
          <Link to={`/posts/${postId}`}>
            <img
              // src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`}
              src={image.image}
              alt="post"
              className="image"
            />
          </Link>
        ))}
      </div>
      <div>Reactions</div>
      <hr/>
      <div>
        Comments
        <InputBoxWithAvatar
          resourceId={postId}
          currentUserDetails={usersDummyData[0]}
          createAction={createComment}
          validationMin={COMMENT.MIN_CONTENT_LENGTH}
          validationMax={COMMENT.MAX_CONTENT_LENGTH}
          placeholder="Write your comment ..."
          errorMessage={`The comment should be ${COMMENT.MIN_CONTENT_LENGTH} - ${COMMENT.MAX_CONTENT_LENGTH} characters long`}
        />
      </div>
    </div>
  );
};

export default PostCard;
