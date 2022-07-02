import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isConditionalExpression } from 'typescript';
import { COMMENT } from '../constants/constants';
import getTimeDuration from '../helpers/getTimeDuration';
import CommentType from '../models/CommentType';
import UserType from '../models/UserType';
import { createComment, deleteComment, editComment } from '../state/actions/commentsActions';
import Avatar from './Avatar';
import Button from './Button';
import EditButtons from './EditButtons';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import Reactions from './Reactions';
import './styles/CommentCard.css';
import Tooltip from './Tooltip';

const TIME_TO_DO = '2022-06-26 15:17:36';

const CommentCard: React.FC<{ comment: CommentType; currentUserDetails: UserType }> = ({
  comment,
  currentUserDetails
}) => {
  const dispatch = useDispatch();

  const {
    commentId,
    postId,
    replyTo,
    replyToAuthorFirstName,
    replyToAuthorLastName,
    authorId,
    authorFirstName,
    authorLastName,
    authorAvatar,
    createdAt,
    content,
    replies
  } = comment;

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [contentComment, setContentComment] = useState(content || '');

  const showReplyFormHandler = () => setShowReplyForm(!showReplyForm);


  const handleCommentEditButton = () => {
    setEditMode(true);
  };

  const handleCommentCloseButton = () => {
    setEditMode(false);
    setContentComment(content || '');
  };

  const handleCommentDeleteButton = () => {
    dispatch(deleteComment(commentId));
    setEditMode(false);
  };

  const handleCommentSaveButton = () => {
    dispatch(editComment(commentId, contentComment));
    setEditMode(false);
  };


  const repliesToRender = (replies || []).map((item) => (
    <CommentCard key={commentId} comment={item} currentUserDetails={currentUserDetails} />
  ));

  return (
    <div
      className={`comment_card${replyTo === -1 ? ' top' : ''}${
        replies?.length === 0 || !showReplies ? ' last' : ''
      }`}
    >
      <div className={`single_comment${showReplyForm ? ' reply' : ''}`}>
        <Avatar classes="image_only" imageUrl={authorAvatar} />
        <div className="content flex_col">
          <span className="author_name">
            <strong>{`${authorFirstName} ${authorLastName}`}</strong>
          </span>
          <div className="comment_content">
            {editMode ? (
              <input
                type="text"
                value={contentComment}
                onChange={(e) => setContentComment(e.target.value)}
              />
            ) : (
              contentComment
            )}
          </div>
          <EditButtons
            editMode={editMode}
            isUserAuthorized={currentUserDetails?.userId === authorId}
            handleEditButton={handleCommentEditButton}
            handleCloseButton={handleCommentCloseButton}
            handleDeleteButton={handleCommentDeleteButton}
            disabledDelete={!!replies?.length}
            handleSaveButton={handleCommentSaveButton}
          />

          <div className="reactions_list  flex card">
            <i className="fa fa-thumbs-up"></i>
            90
          </div>
        </div>
        <div className="footer flex">
          <>
            {/* <Reactions type="comment" /> */}

            <Button classes="text" onClick={showReplyFormHandler}>
              {!showReplyForm ? 'Reply' : 'Cancel'}
            </Button>

            <Tooltip direction="top" text={TIME_TO_DO}>
              <Button classes="text">{getTimeDuration(TIME_TO_DO)}</Button>
            </Tooltip>
          </>
        </div>
        <div className={`reply_form ${showReplyForm ? 'show' : ''}`}>
          <InputBoxWithAvatar
            resourceId={postId}
            replyTo={commentId}
            currentUserDetails={currentUserDetails}
            createAction={createComment}
            validationMin={COMMENT.MIN_CONTENT_LENGTH}
            validationMax={COMMENT.MAX_CONTENT_LENGTH}
            placeholder={`Write a reply to ${replyToAuthorFirstName} ${replyToAuthorLastName}`}
            errorMessage={`The comment should be ${COMMENT.MIN_CONTENT_LENGTH} - ${COMMENT.MAX_CONTENT_LENGTH} characters long`}
          />
        </div>

        <Button
          classes={`text replies${replies?.length ? ' show' : ''}`}
          onClick={() => setShowReplies(!showReplies)}
        >{`${showReplies ? `Hide` : `Show ${replies?.length} more`} repl${
          replies?.length === 1 ? 'y' : 'ies'
        }`}</Button>
      </div>
      {showReplies && repliesToRender}
    </div>
  );
};

export default CommentCard;
