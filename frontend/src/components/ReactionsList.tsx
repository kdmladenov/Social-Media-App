import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getGroupReactions from '../helpers/getGroupReactions';
import useTypedSelector from '../hooks/useTypedSelector';
import reactionButtons from '../inputs/reactionButtons';
import ReactionButtonType from '../models/ReactionButtonType';
import { listCommentsReactions, listPostsReactions } from '../state/actions/reactionsActions';
import Button from './Button';
import './styles/ReactionsList.css';
import Tooltip from './Tooltip';

const REACTION_NAMES_COUNT_AT_HOVER = 1;

export const ReactionsList: React.FC<{ type: string; resourceId: number }> = ({
  type,
  resourceId
}) => {
  const dispatch = useDispatch();

  const { postReactions } = useTypedSelector((state) => state.postReactionsList);

  const { commentReactions } = useTypedSelector((state) => state.commentReactionsList);

  const reactions = type === 'post' ? postReactions?.[resourceId] : commentReactions?.[resourceId];

  const groupedReactions = getGroupReactions(reactions);

  const nameList = (names: string[]) => (
    <ul className="names flex_col">
      {names.slice(0, REACTION_NAMES_COUNT_AT_HOVER).map((name) => (
        <li key={name}>{name}</li>
      ))}
      {names.length > REACTION_NAMES_COUNT_AT_HOVER && (
        <li>{`and ${names.length - REACTION_NAMES_COUNT_AT_HOVER} more`}</li>
      )}
    </ul>
  );

  useEffect(() => {
    dispatch(type === 'post' ? listPostsReactions(resourceId) : listCommentsReactions(resourceId));
  }, [dispatch, type, resourceId]);

  return reactions?.length ? (
    <div className={`reactions_list flex card ${type}`}>
      {reactionButtons.map(
        ({ reactionIcon, reactionName }) =>
          groupedReactions[reactionName] && (
            <Tooltip
              direction="bottom"
              text={nameList(groupedReactions[reactionName].authorsList)}
              key={reactionName}
            >
              <i className={`${reactionIcon}`} />
            </Tooltip>
          )
      )}
      {reactions?.[0].totalDBItems}
    </div>
  ) : (
    <></>
  );
};
