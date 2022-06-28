import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import getNestedComments from '../helpers/getNestedComments';
import useTypedSelector from '../hooks/useTypedSelector';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { commentsData } from '../inputs/dummyInputs/commentsDummyData';
import CommentType from '../models/CommentType';
import { listComments } from '../state/actions/commentsActions';
import Button from './Button';
import CommentCard from './CommentCard';
import DropDown from './Dropdown';
import './styles/PostComments.css';

const commentsAtStart = 1;
const additionalCommentToLoad = 10;

const PostComments: React.FC<{ postId: number }> = ({ postId }) => {
  const dispatch = useDispatch();

  const { comments, loading, error } = useTypedSelector((state) => state.commentsList);

  const [endpoint, setEndpoint] = useState({
    ...defaultEndpoint['postComments']
  });

  const nestedComments = comments?.length ? getNestedComments(comments) : [];

  const [commentsCount, setCommentsCount] = useState(commentsAtStart);

  const commentsCountHandler = () => setCommentsCount(commentsCount + additionalCommentToLoad);

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;

    dispatch(listComments(postId, `${page}${pageSize}${sort}${search}`));
  }, [
    dispatch,
    postId,
    endpoint
    // successCommentAsk,
    // successCommentDelete
  ]);

  return (
    <div className="post_comments">
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
    </div>
  );
};

export default PostComments;
