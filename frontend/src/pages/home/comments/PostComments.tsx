import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { COMMENT } from '../../../data/constants';
import getNestedComments from '../../../utils/getNestedComments';
import useTypedSelector from '../../../hooks/useTypedSelector';
import defaultEndpoint from '../../../data/inputs/defaultEndpoint';
import {
  createComment,
  createImageComment,
  listComments,
  listImageComments
} from '../../../context/actions/commentsActions';
import Button from '../../../components/Button';
import CommentCard from './CommentCard';
import InputBoxWithAvatar from '../../../components/InputBoxWithAvatar';
import './styles/PostComments.css';

const commentsAtStart = 1;
const additionalCommentToLoad = 10;

const PostComments: React.FC<{
  postId: number;
  imageId?: number;
  type?: 'post' | 'image';
}> = ({ postId, imageId, type = 'post' }) => {
  const dispatch = useDispatch();

  const { user: currentUserDetails } = useTypedSelector((state) => state.userDetails);

  const { comments } = useTypedSelector((state) => state.commentsList);
  const { imageComments } = useTypedSelector((state) => state.imageCommentsList);
  const { success: successCommentCreate } = useTypedSelector((state) => state.commentCreate);
  const { success: successCommentEdit } = useTypedSelector((state) => state.commentEdit);
  const { success: successCommentDelete } = useTypedSelector((state) => state.commentDelete);
  const { success: successImageCommentCreate } = useTypedSelector(
    (state) => state.imageCommentCreate
  );
  const { success: successImageCommentEdit } = useTypedSelector((state) => state.imageCommentEdit);
  const { success: successImageCommentDelete } = useTypedSelector(
    (state) => state.imageCommentDelete
  );

  const [endpoint, setEndpoint] = useState({
    ...defaultEndpoint['postComments']
  });

  const nestedComments =
    type === 'post' && comments?.[postId]?.length
      ? getNestedComments(comments[postId])
      : type === 'image' && imageComments?.[`${postId}/${imageId}`]?.length
      ? getNestedComments(imageComments?.[`${postId}/${imageId}`])
      : [];

  const [commentsCount, setCommentsCount] = useState(commentsAtStart);

  const commentsCountHandler = () => setCommentsCount(commentsCount + additionalCommentToLoad);

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;
    if (type === 'post') {
      dispatch(listComments(postId, `${page}${pageSize}${sort}${search}`));
    } else if (type === 'image' && imageId) {
      dispatch(listImageComments(postId, imageId, `${page}${pageSize}${sort}${search}`));
    }
  }, [
    dispatch,
    endpoint,
    postId,
    imageId,
    type,
    successCommentCreate,
    successCommentEdit,
    successCommentDelete,
    successImageCommentCreate,
    successImageCommentEdit,
    successImageCommentDelete
  ]);

  return comments?.[postId]?.length > 0 || imageComments?.[`${postId}/${imageId}`]?.length ? (
    <div className="post_comments">
      <div className="comments_container flex_col">
        <InputBoxWithAvatar
          resourceId={postId}
          subResourceId={imageId}
          currentUserDetails={currentUserDetails}
          createAction={type === 'post' ? createComment : createImageComment}
          validationMin={COMMENT.MIN_CONTENT_LENGTH}
          validationMax={COMMENT.MAX_CONTENT_LENGTH}
          placeholder="Write a comment ..."
          errorMessage={`The comment should be ${COMMENT.MIN_CONTENT_LENGTH} - ${COMMENT.MAX_CONTENT_LENGTH} characters long`}
          closedButtonText={`Write ${
            comments?.[postId]?.length > 0 || imageComments?.[`${postId}/${imageId}`]?.length
              ? 'another'
              : 'the first'
          } comment`}
          closedAtStart={comments?.[postId]?.length > 0}
        />

        {nestedComments?.length! > 0 &&
          nestedComments
            ?.filter((comment) => comment.replyTo === -1)
            .slice(0, commentsCount)
            .map((comment) => (
              <CommentCard
                key={comment?.commentId}
                comment={comment}
                currentUserDetails={currentUserDetails}
                type={type}
              />
            ))}

        {!(nestedComments && commentsCount >= nestedComments?.length) && (
          <Button classes="text comments_count" onClick={commentsCountHandler}>
            View other comments
          </Button>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PostComments;
