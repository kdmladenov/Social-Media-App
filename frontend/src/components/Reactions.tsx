import React, { useEffect, useState } from 'react';
import Button from './Button';
import Tooltip from './Tooltip';
import './styles/Reactions.css';
import reactionButtons from '../inputs/reactionButtons';
import { useDispatch } from 'react-redux';
import {
  createCommentReaction,
  createPostReaction,
  deleteCommentReaction,
  deletePostReaction,
  editCommentReaction,
  editPostReaction,
  listCommentsReactions,
  listPostsReactions
} from '../state/actions/reactionsActions';
import useTypedSelector from '../hooks/useTypedSelector';
import ReactionButtonType from '../models/ReactionButtonType';
import ReactionType from '../models/ReactionType';

const Reactions: React.FC<{ type: string; resourceId: number; classes?: string }> = ({
  type,
  resourceId,
  classes
}) => {
  const dispatch = useDispatch();

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const { postReactions } = useTypedSelector((state) => state.postReactionsList);

  const { commentReactions } = useTypedSelector((state) => state.commentReactionsList);

  const [reactionInState, setReactionInState] = useState<ReactionType | null>(null);

  const [currentReactionButton, setCurrentReactionButton] = useState<ReactionButtonType>(
    reactionButtons[0]
  );

  // console.log(type, resourceId, reactionInState, 'type, resourceId , reactionInState');

  // Post reactions state
  const { postReaction: createdPostReaction, success: successPostReactionCreate } =
    useTypedSelector((state) => state.postReactionCreate);

  const { postReaction: editedPostReaction, success: successPostReactionEdit } = useTypedSelector(
    (state) => state.postReactionEdit
  );

  const { success: successPostReactionDelete } = useTypedSelector(
    (state) => state.postReactionDelete
  );

  // Comment reactions state
  const { commentReaction: createdCommentReaction, success: successCommentReactionCreate } =
    useTypedSelector((state) => state.commentReactionCreate);

  const { commentReaction: editedCommentReaction, success: successCommentReactionEdit } =
    useTypedSelector((state) => state.commentReactionEdit);

  const { success: successCommentReactionDelete } = useTypedSelector(
    (state) => state.commentReactionDelete
  );

  // Handlers
  const selectionHandler = (selectedReaction: ReactionButtonType) => {
    const reactionCreateAction = type === 'post' ? createPostReaction : createCommentReaction;
    dispatch(reactionCreateAction(resourceId, selectedReaction.reactionName));
    setCurrentReactionButton(selectedReaction);
  };

  const updateSelectionHandler = (selectedReaction: ReactionButtonType) => {
    setCurrentReactionButton(selectedReaction);

    if (reactionInState?.reactionId) {
      const reactionUpdateAction = type === 'post' ? editPostReaction : editCommentReaction;
      dispatch(reactionUpdateAction(reactionInState.reactionId, selectedReaction.reactionName));
    }
  };

  const unSelectHandler = () => {
    setCurrentReactionButton(reactionButtons[0]);

    if (reactionInState?.reactionId) {
      const reactionDeleteAction = type === 'post' ? deletePostReaction : deleteCommentReaction;
      dispatch(reactionDeleteAction(reactionInState.reactionId));
      setReactionInState(null);
    }
  };

  useEffect(() => {
    setReactionInState(
      successPostReactionCreate
        ? createdPostReaction
        : successPostReactionEdit
        ? editedPostReaction
        : successCommentReactionCreate
        ? createdCommentReaction
        : successCommentReactionEdit
        ? editedCommentReaction
        : null
    );
  }, [
    successPostReactionCreate,
    successPostReactionEdit,
    successPostReactionDelete,
    successCommentReactionCreate,
    successCommentReactionEdit,
    successCommentReactionDelete,
    createdCommentReaction,
    createdPostReaction,
    editedCommentReaction,
    editedPostReaction
  ]);

  useEffect(() => {
    if (reactionInState) {
      if (successPostReactionDelete && successCommentReactionDelete) {
        setCurrentReactionButton(reactionButtons[0]);
      } else {
        setCurrentReactionButton({
          reactionIcon: reactionInState?.reactionCode,
          reactionName: reactionInState?.reactionName
        });
      }
    } else {
      setReactionInState(
        (type === 'post' ? postReactions?.[resourceId] : commentReactions?.[resourceId])?.filter(
          (reaction) => reaction?.userId === userInfo?.userId
        )[0]
      );
    }
  }, [
    reactionInState,
    postReactions,
    commentReactions,
    userInfo,
    successPostReactionDelete,
    successCommentReactionDelete,
    resourceId,
    type
  ]);

  // useEffect(() => {
  //   dispatch(type === 'post' ? listPostsReactions(resourceId) : listCommentsReactions(resourceId));
  // }, [dispatch, type, resourceId]);

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
        classes={`${classes}${reactionInState ? ' active' : ''}`}
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
