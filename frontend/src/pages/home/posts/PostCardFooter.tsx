import React, { useState } from 'react';
import Button from '../../../components/Button';
import PostComments from '../comments/PostComments';
import Reactions from '../reactions/Reactions';
import { ReactionsList } from '../reactions/ReactionsList';

import './styles/PostCardFooter.css';

const PostCardFooter: React.FC<{
  postId: number;
  imageId?: number;
  type?: 'post' | 'image';
}> = ({ postId, imageId, type = 'post' }) => {
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(true);

  return (
    <div className="post_footer flex_col">
      <div className="reactions_shares flex">
        <ReactionsList type={type} resourceId={postId} subResourceId={imageId} />
      </div>
      <div className="footer_button_group flex">
        <Reactions type={type} resourceId={postId} subResourceId={imageId} />
        <Button key="Comment" onClick={() => setIsCommentFormVisible(!isCommentFormVisible)}>
          <i className="fa fa-comment"></i>
          <span>Comment</span>
        </Button>
      </div>
      {isCommentFormVisible ? (
        <PostComments type={type} postId={postId} imageId={imageId} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostCardFooter;
