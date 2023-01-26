import React, { useEffect, useState } from 'react';

import './styles/Reactions.css';

import { useDispatch } from 'react-redux';
import {
  createCommentReaction,
  createPostImageCommentReaction,
  createPostImageReaction,
  createPostReaction,
  deleteCommentReaction,
  deletePostImageCommentReaction,
  deletePostImageReaction,
  deletePostReaction,
  editCommentReaction,
  editPostImageCommentReaction,
  editPostImageReaction,
  editPostReaction,
  listCommentsReactions,
  listPostImageCommentReactions,
  listPostImageReactions,
  listPostsReactions
} from '../../../context/actions/reactionsActions';
import useTypedSelector from '../../../hooks/useTypedSelector';
import ReactionType from '../../../types/ReactionType';
import reactionButtons from '../../../data/inputs/reactionButtons';
import ReactionButtonType from '../../../types/ReactionButtonType';
import Tooltip from '../../../components/Tooltip';
import Button from '../../../components/Button';

const Reactions: React.FC<{
  type: 'post' | 'image' | 'post_comment' | 'image_comment';
  resourceId: number;
  subResourceId?: number;
  classes?: string;
}> = ({ type, resourceId, subResourceId, classes }) => {
  const dispatch = useDispatch();

  const { userInfo } = useTypedSelector((state) => state.userLogin);
  const [reactionInState, setReactionInState] = useState<ReactionType | null>(null);

  // Post reactions state
  const { postReactions } = useTypedSelector((state) => state.postReactionsList);
  const { success: successPostReactionCreate } = useTypedSelector(
    (state) => state.postReactionCreate
  );
  const { success: successPostReactionEdit } = useTypedSelector((state) => state.postReactionEdit);
  const { success: successPostReactionDelete } = useTypedSelector(
    (state) => state.postReactionDelete
  );

  // Post Comment reactions state
  const { commentReactions } = useTypedSelector((state) => state.commentReactionsList);
  const { success: successCommentReactionCreate } = useTypedSelector(
    (state) => state.commentReactionCreate
  );
  const { success: successCommentReactionEdit } = useTypedSelector(
    (state) => state.commentReactionEdit
  );
  const { success: successCommentReactionDelete } = useTypedSelector(
    (state) => state.commentReactionDelete
  );

  // Image reactions state
  const { postImageReactions } = useTypedSelector((state) => state.postImageReactionsList);
  const { success: successPostImageReactionCreate } = useTypedSelector(
    (state) => state.postImageReactionCreate
  );
  const { success: successPostImageReactionEdit } = useTypedSelector(
    (state) => state.postImageReactionEdit
  );
  const { success: successPostImageReactionDelete } = useTypedSelector(
    (state) => state.postImageReactionDelete
  );

  // Image Comment reactions state

  const { postImageCommentReactions } = useTypedSelector(
    (state) => state.commentPostImageReactionsList
  );
  const { success: successPostImageCommentReactionCreate } = useTypedSelector(
    (state) => state.commentPostImageReactionCreate
  );
  const { success: successPostImageCommentReactionEdit } = useTypedSelector(
    (state) => state.commentPostImageReactionEdit
  );
  const { success: successPostImageCommentReactionDelete } = useTypedSelector(
    (state) => state.commentPostImageReactionDelete
  );

  const selectionHandler = (selectedReaction: ReactionButtonType) => {
    type === 'post'
      ? dispatch(createPostReaction(resourceId, selectedReaction.reactionName))
      : type === 'post_comment'
      ? dispatch(createCommentReaction(resourceId, selectedReaction.reactionName))
      : type === 'image' && subResourceId
      ? dispatch(createPostImageReaction(resourceId, subResourceId, selectedReaction.reactionName))
      : type === 'image_comment' &&
        dispatch(createPostImageCommentReaction(resourceId, selectedReaction.reactionName));
  };

  const updateSelectionHandler = (selectedReaction: ReactionButtonType) => {
    if (reactionInState?.reactionId) {
      type === 'post'
        ? dispatch(editPostReaction(reactionInState.reactionId, selectedReaction.reactionName))
        : type === 'post_comment'
        ? dispatch(editCommentReaction(reactionInState.reactionId, selectedReaction.reactionName))
        : type === 'image'
        ? dispatch(editPostImageReaction(resourceId, selectedReaction.reactionName))
        : type === 'image_comment' &&
          dispatch(editPostImageCommentReaction(resourceId, selectedReaction.reactionName));
    }
  };

  const unSelectHandler = () => {
    if (reactionInState?.reactionId) {
      type === 'post'
        ? dispatch(deletePostReaction(reactionInState.reactionId))
        : type === 'post_comment'
        ? dispatch(deleteCommentReaction(reactionInState.reactionId))
        : type === 'image'
        ? dispatch(deletePostImageReaction(reactionInState.reactionId))
        : type === 'image_comment' &&
          dispatch(deletePostImageCommentReaction(reactionInState.reactionId));
    }
    setReactionInState(null);
  };

  useEffect(() => {
    if (type === 'post') dispatch(listPostsReactions(resourceId));
    if (type === 'post_comment') dispatch(listCommentsReactions(resourceId));
    if (type === 'image' && subResourceId)
      dispatch(listPostImageReactions(resourceId, subResourceId));
    if (type === 'image_comment') dispatch(listPostImageCommentReactions(resourceId));
  }, [
    dispatch,
    type,
    resourceId,
    subResourceId,
    successCommentReactionCreate,
    successCommentReactionDelete,
    successCommentReactionEdit,
    successPostImageReactionCreate,
    successPostImageReactionDelete,
    successPostImageReactionEdit,
    successPostReactionCreate,
    successPostReactionDelete,
    successPostReactionEdit,
    successPostImageCommentReactionCreate,
    successPostImageCommentReactionEdit,
    successPostImageCommentReactionDelete
  ]);

  useEffect(() => {
    setReactionInState(
      (type === 'post'
        ? postReactions?.[resourceId]
        : type === 'post_comment'
        ? commentReactions?.[resourceId]
        : type === 'image'
        ? postImageReactions?.[`${resourceId}/${subResourceId}`]
        : type === 'image_comment'
        ? postImageCommentReactions?.[resourceId]
        : []
      )?.filter((reaction) => reaction?.userId === userInfo?.userId)[0]
    );
  }, [
    type,
    resourceId,
    subResourceId,
    reactionInState,
    postReactions,
    commentReactions,
    userInfo,
    postImageCommentReactions,
    postImageReactions
  ]);

  return (
    <div className="reactions">
      <div className="reactions_button_group flex card">
        {reactionButtons.map(({ reactionName, reactionIcon }) => (
          <Tooltip direction="top" text={reactionName} key={reactionName}>
            <Button
              classes={`icon ${reactionName}`}
              onClick={() =>
                reactionInState?.[type === 'post' ? 'postId' : 'commentId'] === resourceId &&
                reactionInState?.reactionName === reactionName
                  ? unSelectHandler()
                  : reactionInState?.[type === 'post' ? 'postId' : 'commentId'] === resourceId &&
                    reactionInState?.reactionName !== reactionName
                  ? updateSelectionHandler({ reactionName, reactionIcon })
                  : selectionHandler({
                      reactionName,
                      reactionIcon
                    })
              }
            >
              <i className={reactionIcon}></i>
            </Button>
          </Tooltip>
        ))}
      </div>
      <Button
        classes={`${classes} ${reactionInState ? ' active' : ''} ${reactionInState?.reactionName}`}
        onClick={() =>
          reactionInState?.reactionId ? unSelectHandler() : selectionHandler(reactionButtons[0])
        }
      >
        {classes !== 'text' && (
          <i className={reactionInState?.reactionCode || reactionButtons[0].reactionIcon}></i>
        )}
        {classes !== 'icon' && (
          <span>
            {(reactionInState?.reactionName || reactionButtons[0].reactionName).replace(
              /^\w/,
              (c) => c.toUpperCase()
            )}
          </span>
        )}
      </Button>
    </div>
  );
};

export default Reactions;
