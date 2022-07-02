import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { COMMENT } from '../constants/constants';
import getNestedComments from '../helpers/getNestedComments';
import useTypedSelector from '../hooks/useTypedSelector';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { createComment, listComments } from '../state/actions/commentsActions';
import Button from './Button';
import CommentCard from './CommentCard';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import Loader from './Loader';
import Message from './Message';
import './styles/PostComments.css';

const commentsAtStart = 1;
const additionalCommentToLoad = 10;

const PostComments: React.FC<{ postId: number }> = ({ postId }) => {
  const dispatch = useDispatch();

  const { user: currentUserDetails } = useTypedSelector((state) => state.userDetails);

  const { comments, loading, error } = useTypedSelector((state) => state.commentsList);

  const {
    // comment: createdComment,
    //Todo do not update
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate
  } = useTypedSelector((state) => state.commentCreate);

  const {
    // comment: editedComment,
    success: successEdit,
    loading: loadingEdit,
    error: errorEdit
  } = useTypedSelector((state) => state.commentEdit);

  const {
    // comment: deletedComment,
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete
  } = useTypedSelector((state) => state.commentDelete);

  const [endpoint, setEndpoint] = useState({
    ...defaultEndpoint['postComments']
  });

  const nestedComments = comments?.[postId]?.length ? getNestedComments(comments[postId]) : [];

  const [commentsCount, setCommentsCount] = useState(commentsAtStart);

  const commentsCountHandler = () => setCommentsCount(commentsCount + additionalCommentToLoad);

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listComments(postId, `${page}${pageSize}${sort}${search}`));
  }, [dispatch, endpoint, postId, successCreate, successEdit, successDelete]);

  return (
    <div className="post_comments">
      {loading || loadingCreate || loadingDelete || loadingEdit ? (
        <Loader />
      ) : error || errorCreate || errorDelete || errorEdit ? (
        <Message type="error">{error || errorCreate || errorDelete || errorEdit}</Message>
      ) : (
        <div className="comments_container flex_col">
          <InputBoxWithAvatar
            resourceId={postId}
            currentUserDetails={currentUserDetails}
            createAction={createComment}
            validationMin={COMMENT.MIN_CONTENT_LENGTH}
            validationMax={COMMENT.MAX_CONTENT_LENGTH}
            placeholder="Write a comment ..."
            errorMessage={`The comment should be ${COMMENT.MIN_CONTENT_LENGTH} - ${COMMENT.MAX_CONTENT_LENGTH} characters long`}
            closedButtonText={`Write ${
              comments?.[postId]?.length > 0 ? 'another' : 'the first'
            } comment`}
            closedAtStart={!(nestedComments?.length! === 0)}
          />
          {nestedComments?.length! > 0 &&
            nestedComments
              ?.filter((comment) => comment.replyTo === -1)
              .slice(0, commentsCount)
              .map((comment) => (
                <CommentCard
                  key={comment.commentId}
                  comment={comment}
                  currentUserDetails={currentUserDetails}
                />
              ))}

          {!(nestedComments && commentsCount >= nestedComments?.length) && (
            <Button classes="text comments_count" onClick={commentsCountHandler}>
              View other comments
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostComments;
