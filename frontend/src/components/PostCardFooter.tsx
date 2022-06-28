import React from 'react';
import { commentsData } from '../inputs/dummyInputs/commentsDummyData';
import Button from './Button';
import CommentCard from './CommentCard';
import PostComments from './PostComments';
import Reactions from './Reactions';
import './styles/PostCardFooter.css';

const buttonGroupMap = [
  // { icon: 'fa fa-thumbs-up', name: 'Like' },
  { icon: 'fa fa-comment', name: 'Comment' },
  { icon: 'fa fa-share', name: 'Share' }
];

const PostCardFooter: React.FC<{ postId: number }> = ({ postId }) => {
  return (
    <div className="post_footer flex_col">
      <div className="reactions_shares flex">
        <div className="reactions flex">
          <i className="fa fa-thumbs-up"></i>
          <span>{postId}</span>
        </div>
      </div>
      <div className="footer_button_group flex">
        <Reactions>
          <Button>
            <i className="fa fa-thumbs-up"></i>
            <span>Like</span>
          </Button>
        </Reactions>

        {buttonGroupMap.map((button) => (
          <Button key={button.icon}>
            <i className={button.icon}></i>
            <span>{button.name}</span>
          </Button>
        ))}
      </div>
      <PostComments postId={postId} />
    </div>
  );
};

export default PostCardFooter;
