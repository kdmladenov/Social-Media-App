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

const Reactions: React.FC<{ type: string; resourceId: number; classes?: string }> = ({
  type,
  resourceId,
  classes
}) => {
  const dispatch = useDispatch();
  const { postReactions } = useTypedSelector((state) => state.postReactionsList);
  const { commentReactions } = useTypedSelector((state) => state.commentReactionsList);

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const reactionInState = (
    type === 'post' ? postReactions?.[resourceId] : commentReactions?.[resourceId]
  )?.filter((reaction) => reaction?.userId === userInfo?.userId)[0];

  console.log(reactionInState, 'reactionInState');

  const [currentReactionButton, setCurrentReactionButton] = useState<{
    icon: string;
    name: string;
  }>(reactionButtons[0]);

  // const [isReactionActive, setIsReactionActive] = useState<boolean>(false);

  const [reactionId, setReactionId] = useState<number | null>(null);

  const { postReaction: createdPostReaction, success: successPostReactionCreate } =
    useTypedSelector((state) => state.postReactionCreate);

  const { postReaction: editedPostReaction, success: successPostReactionEdit } = useTypedSelector(
    (state) => state.postReactionEdit
  );

  const { success: successPostReactionDelete } = useTypedSelector(
    (state) => state.postReactionDelete
  );

  const { commentReaction: createdCommentReaction, success: successCommentReactionCreate } =
    useTypedSelector((state) => state.commentReactionCreate);

  const { commentReaction: editedCommentReaction, success: successCommentReactionEdit } =
    useTypedSelector((state) => state.commentReactionEdit);

  const { success: successCommentReactionDelete } = useTypedSelector(
    (state) => state.commentReactionDelete
  );

  const selectionHandler = (selectedReaction: { icon: string; name: string }) => {
    console.log('create');
    const reactionCreateAction = type === 'post' ? createPostReaction : createCommentReaction;
    dispatch(reactionCreateAction(resourceId, selectedReaction.name));
    setCurrentReactionButton(selectedReaction);
    // setIsReactionActive(true);
  };

  const updateSelectionHandler = (selectedReaction: { icon: string; name: string }) => {
    console.log('update');
    setCurrentReactionButton(reactionButtons[0]);
    // setIsReactionActive(true);
    if (reactionId) {
      const reactionUpdateAction = type === 'post' ? editPostReaction : editCommentReaction;
      dispatch(reactionUpdateAction(reactionId, selectedReaction.name));
    }
  };

  const unSelectHandler = () => {
    console.log('delete');
    setCurrentReactionButton(reactionButtons[0]);
    // setIsReactionActive(false);
    if (reactionId) {
      const reactionDeleteAction = type === 'post' ? deletePostReaction : deleteCommentReaction;
      dispatch(reactionDeleteAction(reactionId));
    }
  };

  useEffect(() => {
    console.log('list');
    dispatch(type === 'post' ? listPostsReactions(resourceId) : listCommentsReactions(resourceId));
  }, [dispatch, type, resourceId]);

  useEffect(() => {
    if (reactionInState) {
      console.log('reactionInState');
      // setIsReactionActive(true);
      setCurrentReactionButton({
        icon: reactionInState?.reactionCode,
        name: reactionInState?.reactionName
      });
      setReactionId(reactionInState?.reactionId);
    }
  }, [reactionInState]);

  useEffect(() => {
    console.log('setReactionId');
    setReactionId(
      successPostReactionCreate
        ? createdPostReaction?.reactionId
        : successPostReactionEdit
        ? editedPostReaction?.reactionId
        : successCommentReactionCreate
        ? createdCommentReaction?.reactionId
        : successCommentReactionEdit
        ? editedCommentReaction?.reactionId
        : null
    );
    if (reactionInState) {
      console.log('reactionInState');
      // setIsReactionActive(true);
      setCurrentReactionButton({
        icon: reactionInState?.reactionCode,
        name: reactionInState?.reactionName
      });
      setReactionId(reactionInState?.reactionId);
    }
  }, [
    successPostReactionCreate,
    successPostReactionEdit,
    successPostReactionDelete,
    successCommentReactionCreate,
    successCommentReactionEdit,
    successCommentReactionDelete,
    createdCommentReaction?.reactionId,
    createdPostReaction?.reactionId,
    editedCommentReaction?.reactionId,
    editedPostReaction?.reactionId,
    reactionInState
  ]);

  return (
    <div className="reactions">
      <div className="reactions_button_group flex card">
        {reactionButtons.map((button) => (
          <Tooltip direction="top" text={button.name} key={button.name}>
            <Button
              classes={`icon ${button.name}`}
              onClick={() =>
                reactionInState?.reactionName === button.name
                  ? unSelectHandler
                  : reactionInState?.reactionName !== button.name
                  ? updateSelectionHandler({ name: button.name, icon: button.icon })
                  : selectionHandler({
                      icon: reactionInState?.reactionCode,
                      name: reactionInState?.reactionName
                    })
              }
            >
              <i className={button.icon}></i>
            </Button>
          </Tooltip>
        ))}
      </div>
      <Button
        classes={`${classes}${reactionInState ? ' active' : ''}`}
        onClick={() =>
          reactionInState?.reactionName === 'like'
            ? unSelectHandler
            : selectionHandler(reactionButtons[0])
        }
      >
        {classes !== 'text' && <i className={currentReactionButton.icon}></i>}
        {classes !== 'icon' && <span>{currentReactionButton.name}</span>}
      </Button>
    </div>
  );
};

export default Reactions;
