import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { COMMENT } from '../constants/constants';
import getNestedComments from '../helpers/getNestedComments';
import useTypedSelector from '../hooks/useTypedSelector';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { commentsData } from '../inputs/dummyInputs/commentsDummyData';
import CommentType from '../models/CommentType';
import { createComment, listComments } from '../state/actions/commentsActions';
import { COMMENT_LIST_RESET } from '../state/constants/commentsConstants';
import Button from './Button';
import CommentCard from './CommentCard';
import DropDown from './Dropdown';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import Loader from './Loader';
import Message from './Message';
import './styles/PostComments.css';

const commentsAtStart = 1;
const additionalCommentToLoad = 10;

const PostComments: React.FC<{ postId: number }> = ({ postId }) => {
  const dispatch = useDispatch();

  const { comments, loading, error } = useTypedSelector((state) => state.commentsList);

  const { user: currentUserDetails } = useTypedSelector((state) => state.userDetails);

  const [endpoint, setEndpoint] = useState({
    ...defaultEndpoint['postComments']
  });

  const nestedComments = comments?.[postId]?.length ? getNestedComments(comments[postId]) : [];

  console.log(postId, nestedComments, 'nestedComments');

  const [commentsCount, setCommentsCount] = useState(commentsAtStart);

  const commentsCountHandler = () => setCommentsCount(commentsCount + additionalCommentToLoad);

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listComments(postId, `${page}${pageSize}${sort}${search}`));
  }, [
    dispatch,
    endpoint,
    postId
    // successCommentAsk,
    // successCommentDelete
  ]);

  return (
    <div className="post_comments">
      {loading ? (
        //  || loadingDelete || loadingRestore || loadingCreate
        <Loader />
      ) : error ? (
        // || errorDelete || errorRestore || errorCreate
        <Message type="error">
          {
            error
            // || errorDelete || errorRestore || errorCreate
          }
        </Message>
      ) : comments?.[postId]?.length > 0 ? (
        <>
          <div className="header flex">
            <Button
              classes="text"
              onClick={commentsCountHandler}
              disabled={nestedComments && commentsCount >= nestedComments?.length}
            >
              View previous comments
            </Button>
            Sort Dropdown
          </div>

          <div className="comments_container flex_col">
            {nestedComments
              ?.filter((comment) => comment.replyTo === -1)
              .slice(0, commentsCount)
              .map((comment) => (
                <CommentCard key={comment.commentId} comment={comment} />
              ))}
          </div>
        </>
      ) : (
        <InputBoxWithAvatar
          resourceId={postId}
          currentUserDetails={currentUserDetails}
          createAction={createComment}
          validationMin={COMMENT.MIN_CONTENT_LENGTH}
          validationMax={COMMENT.MAX_CONTENT_LENGTH}
          placeholder="Write your comment here ..."
          errorMessage={`The question should be ${COMMENT.MIN_CONTENT_LENGTH} - ${COMMENT.MAX_CONTENT_LENGTH} characters long`}
          closedButtonText={
            comments?.[postId]?.length ? `Write another comment` : `Write the first comment`
          }
        />
      )}
    </div>
  );
};

export default PostComments;
