import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './styles/Comments.css';
import { getUserDetails } from '../state/actions/userActions';
import { createComment, listComments } from '../state/actions/commentsActions';
import { listPostDetails } from '../state/actions/postActions';
import { COMMENT } from '../constants/constants';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { commentsSortOptionsMap } from '../inputs/sortDropdownOptionsMaps';
import { commentsListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';

import Button from './Button';
import Message from './Message';
import Loader from './Loader';
import HeaderControls from './HeaderControls';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import Pagination from './Pagination';
import CommentsCard from './CommentsCard';
import scrollTo from '../helpers/scrollTo';
import CommentsProps from '../models/components/CommentsProps';
import useTypedSelector from '../hooks/useTypedSelector';

const Comments: React.FC<CommentsProps> = ({
  match,
  postId: postIdProp,
  setCommentsCount,
  isScreen,
  commentsRef
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postId = postIdProp || match.params.postId;

  const [endpoint, setEndpoint] = useState({
    ...defaultEndpoint['comments'],
    pageSize: `pageSize=${isScreen ? 6 : 3}&`
  });

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const { user: currentUserDetails } = useTypedSelector((state) => state.userDetails);

  const { post } = useTypedSelector((state) => state.postDetails);

  const { comments, loading, error } = useTypedSelector((state) => state.commentsList);

  const { success: successCommentCreate } = useTypedSelector((state) => state.commentCreate);

  const { success: successCommentDelete } = useTypedSelector((state) => state.commentDelete);

  useEffect(() => {
    dispatch(getUserDetails(userInfo?.userId));
    dispatch(listPostDetails(postId));
  }, [dispatch, userInfo?.userId, postId]);

  useEffect(() => {
    if (comments?.length > 0 && setCommentsCount) {
      setCommentsCount(comments[0]?.totalDBItems);
    }
  }, [setCommentsCount, comments, successCommentCreate, successCommentDelete]);

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;

    dispatch(listComments(postId, `${page}${pageSize}${sort}${search}`));
  }, [
    dispatch,
    postId,
    endpoint,
    successCommentCreate,
    successCommentDelete,
  ]);

  return (
    <div className="comments">
      {comments?.length > 0 && (
        <HeaderControls
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          query={endpoint}
          resource="comments"
          sortOptionsMap={commentsSortOptionsMap}
          pageSizeOptionsMap={isScreen ? commentsListPageSizeOptionsMap : undefined}
          breadcrumbsPaths={
            isScreen && post
              ? [
                  { label: post?.title, path: `/posts/${postId}` },
                  { label: 'Q&A', path: '' }
                ]
              : undefined
          }
        />
      )}
      <InputBoxWithAvatar
        resourceId={postId}
        currentUserDetails={currentUserDetails}
        createAction={createComment}
        validationMin={COMMENT.MIN_CONTENT_LENGTH}
        validationMax={COMMENT.MAX_CONTENT_LENGTH}
        placeholder="Write yor comment ..."
        errorMessage={`The comment should be ${COMMENT.MIN_CONTENT_LENGTH} - ${COMMENT.MAX_CONTENT_LENGTH} characters long`}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : comments?.length > 0 ? (
        <div className="comments_list">
          {comments?.map((comment) => {
            return (
              <CommentsCard
                key={comment.commentId}
                {...comment}
                currentUser={currentUserDetails}
                avatar={comment.avatar}
              />
            );
          })}
          <div className="footer">
            {!isScreen && comments?.length > 0 && (
              <Button
                classes="text"
                onClick={() => {
                  setEndpoint({
                    ...endpoint,
                    pageSize: `${
                      endpoint.pageSize === 'pageSize=3&' ? 'pageSize=8&' : 'pageSize=3&'
                    }`
                  });
                  scrollTo(commentsRef);
                }}
              >
                {endpoint.pageSize === 'pageSize=3&' ? (
                  <>
                    <i className="fa fa-chevron-down" /> See more comments
                  </>
                ) : (
                  <>
                    <i className="fa fa-chevron-up" /> Collapse comments
                  </>
                )}
              </Button>
            )}
            {!isScreen && (
              <Button classes="text" onClick={() => navigate(`/comments/${postId}`)}>
                See all comments
              </Button>
            )}
            {isScreen && (
              <Pagination
                updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
                pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
                totalItems={comments?.[0]?.totalDBItems}
              />
            )}
          </div>
        </div>
      ) : (
        <Message type="info">There are no comments yet</Message>
      )}
    </div>
  );
};

export default Comments;
