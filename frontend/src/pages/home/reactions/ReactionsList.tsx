import React from 'react';
import Tooltip from '../../../components/Tooltip';
import { REACTION_NAMES_COUNT_AT_HOVER } from '../../../data/constants';
import reactionButtons from '../../../data/inputs/reactionButtons';
import useTypedSelector from '../../../hooks/useTypedSelector';
import getGroupReactions from '../../../utils/getGroupReactions';

import './styles/ReactionsList.css';

export const ReactionsList: React.FC<{
  type: 'post' | 'image' | 'post_comment' | 'image_comment';
  resourceId: number;
  subResourceId?: number;
}> = ({ type, resourceId, subResourceId }) => {
  const { postReactions } = useTypedSelector((state) => state.postReactionsList);
  const { commentReactions } = useTypedSelector((state) => state.commentReactionsList);
  const { postImageReactions } = useTypedSelector((state) => state.postImageReactionsList);
  const { postImageCommentReactions } = useTypedSelector(
    (state) => state.commentPostImageReactionsList
  );

  const reactions =
    type === 'post'
      ? postReactions?.[resourceId]
      : type === 'post_comment'
      ? commentReactions?.[resourceId]
      : type === 'image'
      ? postImageReactions?.[`${resourceId}/${subResourceId}`]
      : postImageCommentReactions?.[resourceId];

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

  return reactions?.length ? (
    <div className={`reactions_list flex card ${type}`}>
      {reactionButtons.map(
        ({ reactionIcon, reactionName }) =>
          groupedReactions[reactionName] && (
            <Tooltip
              classes={reactionName}
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
