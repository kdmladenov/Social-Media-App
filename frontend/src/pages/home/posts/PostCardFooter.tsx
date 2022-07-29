import React from 'react';
import Button from '../../../components/Button';
import PostComments from '../comments/PostComments';
import Reactions from '../reactions/Reactions';
import { ReactionsList } from '../reactions/ReactionsList';

import './styles/PostCardFooter.css';

const buttonGroupMap = [
  // { icon: 'fa fa-thumbs-up', name: 'Like' },
  { icon: 'fa fa-comment', name: 'Comment' },
  { icon: 'fa fa-share', name: 'Share' }
];

const PostCardFooter: React.FC<{
  postId: number;
  imageId?: number;
  type?: 'post' | 'image';
}> = ({ postId, imageId, type = 'post' }) => {
  return (
    <div className="post_footer flex_col">
      <div className="reactions_shares flex">
        <ReactionsList type={type} resourceId={postId} subResourceId={imageId} />
        <h3># Shares</h3>
      </div>
      <div className="footer_button_group flex">
        <Reactions type={type} resourceId={postId} subResourceId={imageId} />

        {buttonGroupMap.map((button) => (
          <Button key={button.icon}>
            <i className={button.icon}></i>
            <span>{button.name}</span>
          </Button>
        ))}
      </div>
      <PostComments type={type} postId={postId} imageId={imageId} />
    </div>
  );
};

export default PostCardFooter;
