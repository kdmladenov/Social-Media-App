import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/CommentsAndReplies.css';
import {
  createReply,
  deleteComment,
  editComment,
  voteComment
} from '../state/actions/commentsAndRepliesActions';
import { REPLY, REPLIES_COUNT_AT_START } from '../constants/constants';

import EditButtons from './EditButtons';
import ShowMoreButton from './ShowMoreButton';
import ReplyCard from './ReplyCard';
import Votes from './Votes';
import Button from './Button';
import Divider from './Divider';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import CommentsAndRepliesCardProps from '../models/components/CommentsAndRepliesCardProps';
import ReplyType from '../models/ReplyType';

const CommentsAndRepliesCard: React.FC<CommentsAndRepliesCardProps> = ({
  currentUser,
  userId: authorId,
  commentId,
  commentContent,
  replies,
  thumbsUp,
  thumbsDown,
  userThumbsUpList,
  userThumbsDownList
}) => {
  const [editMode, setEditMode] = useState(false);
  const [contentComment, setContentComment] = useState(commentContent);
  const repliesList: ReplyType[] = JSON.parse(replies);
  const [showAllReplies, setShowAllReplies] = useState(false);

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
    <div className="comment_and_reply_card card">
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
      <div className="comment_and_reply">
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
        </div>
        <Divider>
          <h5>Replies</h5>
        </Divider>
        <div className="Replies">
          {repliesList?.length && (
            <ul className="reply_list">
              {(showAllReplies ? repliesList : repliesList?.slice(0, REPLIES_COUNT_AT_START))?.map(
                (reply) => (
                  <ReplyCard
                    key={reply.replyId}
                    {...reply}
                    currentUser={currentUser}
                    createReplyMode={false}
                    fullName={reply.fullName}
                    avatar={reply.avatar}
                  />
                )
              )}
            </ul>
          )}
          <div className="replies_footer">
            {repliesList?.length > REPLIES_COUNT_AT_START && (
              <Button classes="text" onClick={() => setShowAllReplies(!showAllReplies)}>
                <i className={`fa fa-chevron-${!showAllReplies ? 'down' : 'up'}`} />
                {!showAllReplies
                  ? `See more replies (${repliesList?.length - REPLIES_COUNT_AT_START})`
                  : 'Collapse replies'}
              </Button>
            )}
          </div>
          <InputBoxWithAvatar
            resourceId={commentId}
            currentUserDetails={currentUser}
            createAction={createReply}
            validationMin={REPLY.MIN_CONTENT_LENGTH}
            validationMax={REPLY.MAX_CONTENT_LENGTH}
            placeholder="Your reply ..."
            errorMessage={`The reply should be ${REPLY.MIN_CONTENT_LENGTH} - ${REPLY.MAX_CONTENT_LENGTH} characters long`}
            closedButtonText={
              repliesList?.length ? `Write another reply` : `Write the first reply`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CommentsAndRepliesCard;
