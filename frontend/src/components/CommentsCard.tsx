import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/Comments.css';
import { deleteComment, editComment, voteComment } from '../state/actions/commentsActions';

import EditButtons from './EditButtons';
import ShowMoreButton from './ShowMoreButton';
import Votes from './Votes';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import CommentsCardProps from '../models/components/CommentsCardProps';

const CommentsCard: React.FC<CommentsCardProps> = ({
  currentUser,
  userId: authorId,
  commentId,
  commentContent,
  thumbsUp,
  thumbsDown,
  userThumbsUpList,
  userThumbsDownList
}) => {
  const [editMode, setEditMode] = useState(false);
  const [contentComment, setContentComment] = useState(commentContent);

  const dispatch = useDispatch();

  const handleCommentEditButton = () => {
    setEditMode(true);
  };

  const handleCommentCloseButton = () => {
    setEditMode(false);
    setContentComment(commentContent);
  };

  const handleCommentDeleteButton = () => {
    dispatch(deleteComment(commentId));
    setEditMode(false);
  };

  const handleCommentSaveButton = () => {
    dispatch(editComment(commentId, contentComment));
    setEditMode(false);
  };

  return (
    <div className="comment_card card">
      <div className="votes_container">
        <Votes
          showButtons={true}
          voteAction={voteComment}
          itemId={commentId}
          reactionNameUp="THUMBS_UP"
          reactionNameDown="THUMBS_DOWN"
          votesUpCount={thumbsUp}
          votesDownCount={thumbsDown}
          userVotesUpList={userThumbsUpList}
          userVotesDownList={userThumbsDownList}
          currentUserId={currentUser?.userId}
          type="vertical"
          iconUp="fa fa-chevron-up"
          iconDown="fa fa-chevron-down"
        />
      </div>
      <div className="comment">
        <div className={`comment ${currentUser.userId === authorId ? 'current_user' : ''}`}>
          <div className="textarea ">
            {editMode ? (
              <input
                type="text"
                value={contentComment}
                onChange={(e) => setContentComment(e.target.value)}
              />
            ) : contentComment?.length > 300 ? (
              <ShowMoreButton breakpoint={300} text={contentComment} />
            ) : (
              contentComment
            )}
          </div>
          <EditButtons
            editMode={editMode}
            isUserAuthorized={currentUser?.userId === authorId}
            handleEditButton={handleCommentEditButton}
            handleCloseButton={handleCommentCloseButton}
            handleDeleteButton={handleCommentDeleteButton}
            handleSaveButton={handleCommentSaveButton}
          />

          {/* <InputBoxWithAvatar
            resourceId={commentId}
            currentUserDetails={currentUser}
            createAction={createComment}
            validationMin={COMMENT.MIN_CONTENT_LENGTH}
            validationMax={COMMENT.MAX_CONTENT_LENGTH}
            placeholder="Your reply ..."
            errorMessage={`The reply should be ${COMMENT.MIN_CONTENT_LENGTH} - ${COMMENT.MAX_CONTENT_LENGTH} characters long`}
            closedButtonText={
              commentsList?.length ? `Write another reply` : `Write the first reply`
            } */}
        </div>
      </div>
    </div>
  );
};

export default CommentsCard;
