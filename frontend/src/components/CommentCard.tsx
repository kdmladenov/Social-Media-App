import React, { useState } from 'react';
import { isConditionalExpression } from 'typescript';
import getTimeDuration from '../helpers/getTimeDuration';
import CommentType from '../models/CommentType';
import Avatar from './Avatar';
import Button from './Button';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import Reactions from './Reactions';
import './styles/CommentCard.css';
import Tooltip from './Tooltip';

const TIME_TO_DO = '2022-06-26 15:17:36';

const CommentCard: React.FC<{ comment: CommentType }> = ({ comment }) => {
  const {
    commentId,
    postId,
    replyTo,
    authorFirstName,
    authorLastName,
    authorAvatar,
    createdAt,
    content,
    replies
  } = comment;

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const showReplyFormHandler = () => setShowReplyForm(!showReplyForm);

  const repliesToRender = (replies || []).map((item) => (
    <CommentCard key={commentId} comment={item} />
  ));

  return (
    <div
      className={`comment_card${replyTo === -1 ? ' top' : ''}${
        replies?.length === 0 || !showReplies ? ' last' : ''
      }`}
    >
      <div className="single_comment">
        <Avatar classes="image_only" imageUrl={authorAvatar} />
        <div className="content flex_col">
          <span className="author_name">
            <strong>{`${authorFirstName} ${authorLastName}`}</strong>
          </span>
          <p>{content}</p>
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
        <div className={`reply_form ${showReplyForm ? 'show' : ''}`}>{'InputBoxWithAvatar'}</div>

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
