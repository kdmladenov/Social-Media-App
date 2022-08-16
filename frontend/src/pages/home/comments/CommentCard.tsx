import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { COMMENT } from '../../../data/constants';
import getTimeDuration from '../../../utils/getTimeDuration';
import CommentType from '../../../types/CommentType';
import UserType from '../../../types/UserType';
import {
  createComment,
  createImageComment,
  deleteComment,
  deleteImageComment,
  editComment,
  editImageComment
} from '../../../context/actions/commentsActions';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import EditButtons from '../../../components/EditButtons';
import InputBoxWithAvatar from '../../../components/InputBoxWithAvatar';
import { ReactionsList } from '../reactions/ReactionsList';
import './styles/CommentCard.css';
import Tooltip from '../../../components/Tooltip';
import Reactions from '../reactions/Reactions';

const CommentCard: React.FC<{
  comment: CommentType;
  currentUserDetails: UserType;
  type?: 'post' | 'image';
}> = ({ comment, currentUserDetails, type = 'post' }) => {
  const dispatch = useDispatch();

  const {
    commentId,
    postId,
    imageId,
    replyTo,
    authorId,
    authorFirstName,
    authorLastName,
    authorAvatar,
    createdAt,
    updatedAt,
    content,
    replies
  } = comment;

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [contentComment, setContentComment] = useState(content || '');

  const timeCreateOrUpdated = `${updatedAt ? updatedAt : createdAt!}`;

  const showReplyFormHandler = () => setShowReplyForm(!showReplyForm);

  const handleCommentEditButton = () => {
    setEditMode(true);
  };

  const handleCommentCloseButton = () => {
    setEditMode(false);
    setContentComment(content || '');
  };

  const handleCommentDeleteButton = () => {
    dispatch(type === 'post' ? deleteComment(commentId) : deleteImageComment(commentId));
    setEditMode(false);
  };

  const handleCommentSaveButton = () => {
    dispatch(
      type === 'post'
        ? editComment(commentId, contentComment)
        : editImageComment(commentId, contentComment)
    );
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

          <ReactionsList
            type={type === 'post' ? 'post_comment' : 'image_comment'}
            resourceId={commentId}
          />
        </div>
        <div className="footer flex">
          <>
            <Reactions
              type={type === 'post' ? 'post_comment' : 'image_comment'}
              resourceId={commentId}
              classes="text"
            />

            <Button classes="text" onClick={showReplyFormHandler}>
              {!showReplyForm ? 'Reply' : 'Cancel reply'}
            </Button>

            <Tooltip direction="top" text={new Date(timeCreateOrUpdated).toLocaleString()}>
              <Button classes="text">{getTimeDuration(timeCreateOrUpdated)}</Button>
            </Tooltip>
          </>
        </div>
        <div className={`reply_form ${showReplyForm ? 'show' : ''}`}>
          <InputBoxWithAvatar
            resourceId={postId}
            subResourceId={imageId}
            replyTo={commentId}
            currentUserDetails={currentUserDetails}
            createAction={type === 'post' ? createComment : createImageComment}
            validationMin={COMMENT.MIN_CONTENT_LENGTH}
            validationMax={COMMENT.MAX_CONTENT_LENGTH}
            placeholder={`Write a reply to ${authorFirstName} ${authorLastName}`}
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
