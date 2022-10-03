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
  const [currentReactionButton, setCurrentReactionButton] = useState<ReactionButtonType>(
    reactionButtons[0]
  );

  // Post reactions state
  const { postReactions } = useTypedSelector((state) => state.postReactionsList);
  const { postReaction: createdPostReaction, success: successPostReactionCreate } =
    useTypedSelector((state) => state.postReactionCreate);
  const { postReaction: editedPostReaction, success: successPostReactionEdit } = useTypedSelector(
    (state) => state.postReactionEdit
  );
  const { success: successPostReactionDelete } = useTypedSelector(
    (state) => state.postReactionDelete
  );

  // Post Comment reactions state
  const { commentReactions } = useTypedSelector((state) => state.commentReactionsList);
  const { commentReaction: createdCommentReaction, success: successCommentReactionCreate } =
    useTypedSelector((state) => state.commentReactionCreate);
  const { commentReaction: editedCommentReaction, success: successCommentReactionEdit } =
    useTypedSelector((state) => state.commentReactionEdit);
  const { success: successCommentReactionDelete } = useTypedSelector(
    (state) => state.commentReactionDelete
  );

  // Image reactions state
  const { postImageReactions } = useTypedSelector((state) => state.postImageReactionsList);
  const { postImageReaction: createdPostImageReaction, success: successPostImageReactionCreate } =
    useTypedSelector((state) => state.postImageReactionCreate);
  const { postImageReaction: editedPostImageReaction, success: successPostImageReactionEdit } =
    useTypedSelector((state) => state.postImageReactionEdit);
  const { success: successPostImageReactionDelete } = useTypedSelector(
    (state) => state.postImageReactionDelete
  );

  // Image Comment reactions state

  const { postImageCommentReactions } = useTypedSelector(
    (state) => state.commentPostImageReactionsList
  );
  const {
    postImageCommentReaction: createdPostImageCommentReaction,
    success: successPostImageCommentReactionCreate
  } = useTypedSelector((state) => state.commentPostImageReactionCreate);
  const {
    postImageCommentReaction: editedPostImageCommentReaction,
    success: successPostImageCommentReactionEdit
  } = useTypedSelector((state) => state.commentPostImageReactionEdit);
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

    setCurrentReactionButton(selectedReaction);
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
    setCurrentReactionButton(selectedReaction);
  };

  const unSelectHandler = () => {
    setCurrentReactionButton(reactionButtons[0]);

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
    if (type === 'post') {
      setReactionInState(
        successPostReactionCreate
          ? createdPostReaction
          : successPostReactionEdit
          ? editedPostReaction
          : null
      );
    }
    if (type === 'post_comment') {
      setReactionInState(
        successCommentReactionCreate && resourceId === createdCommentReaction?.commentId
          ? createdCommentReaction
          : successCommentReactionEdit && resourceId === editedCommentReaction?.commentId
          ? editedCommentReaction
          : null
      );
    }

    if (type === 'image') {
      setReactionInState(
        successPostImageReactionCreate &&
          resourceId === createdPostImageReaction?.postId &&
          subResourceId === createdPostImageReaction?.imageId
          ? createdPostImageReaction
          : successPostImageReactionEdit &&
            resourceId === editedPostImageReaction?.postId &&
            subResourceId === editedPostImageReaction?.imageId
          ? editedPostImageReaction
          : null
      );
    }
    if (type === 'image_comment') {
      setReactionInState(
        successPostImageCommentReactionCreate &&
          resourceId === createdPostImageCommentReaction?.commentId
          ? createdPostImageCommentReaction
          : successPostImageCommentReactionEdit &&
            resourceId === editedPostImageCommentReaction?.commentId
          ? editedPostImageCommentReaction
          : null
      );
    }
  }, [
    type,
    resourceId,
    subResourceId,
    successPostReactionCreate,
    successPostReactionEdit,
    successPostReactionDelete,
    successCommentReactionCreate,
    successCommentReactionEdit,
    successCommentReactionDelete,
    createdCommentReaction,
    createdPostReaction,
    editedCommentReaction,
    editedPostReaction,
    successPostImageReactionCreate,
    createdPostImageReaction,
    successPostImageReactionEdit,
    editedPostImageReaction,
    successPostImageCommentReactionCreate,
    createdPostImageCommentReaction,
    successPostImageCommentReactionEdit,
    editedPostImageCommentReaction,
    successPostImageReactionDelete,
    successPostImageCommentReactionDelete
  ]);

  useEffect(() => {
    if (reactionInState) {
      if (
        successPostReactionDelete ||
        successCommentReactionDelete ||
        successPostImageReactionDelete ||
        successPostImageCommentReactionDelete
      ) {
        setCurrentReactionButton(reactionButtons[0]);
      } else {
        setCurrentReactionButton({
          reactionIcon: reactionInState?.reactionCode,
          reactionName: reactionInState?.reactionName
        });
      }
    } else {
      console.log('first');
      console.log(postImageReactions, 'postImageReactions');
      setCurrentReactionButton(reactionButtons[0]);
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
    }
  }, [
    reactionInState,
    postReactions,
    commentReactions,
    userInfo,
    successPostReactionDelete,
    successCommentReactionDelete,
    postImageCommentReactions,
    postImageReactions,
    successPostImageCommentReactionDelete,
    successPostImageReactionDelete,
    resourceId,
    subResourceId,
    type
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
        classes={`${classes} ${reactionInState ? ' active' : ''} ${
          currentReactionButton?.reactionName
        }`}
        onClick={() =>
          reactionInState?.reactionId ? unSelectHandler() : selectionHandler(reactionButtons[0])
        }
      >
        {classes !== 'text' && <i className={currentReactionButton.reactionIcon}></i>}
        {classes !== 'icon' && (
          <span>{currentReactionButton.reactionName.replace(/^\w/, (c) => c.toUpperCase())}</span>
        )}
      </Button>
    </div>
  );
};

export default Reactions;
