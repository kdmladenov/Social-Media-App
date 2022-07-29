import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Tooltip from '../../../components/Tooltip';
import { listCommentsReactions, listPostImageCommentReactions, listPostImageReactions, listPostsReactions } from '../../../context/actions/reactionsActions';
import reactionButtons from '../../../data/inputs/reactionButtons';
import useTypedSelector from '../../../hooks/useTypedSelector';
import getGroupReactions from '../../../utils/getGroupReactions';

import './styles/ReactionsList.css';


const REACTION_NAMES_COUNT_AT_HOVER = 1;

export const ReactionsList: React.FC<{
  type: 'post' | 'image' | 'post_comment' | 'image_comment';
  resourceId: number;
  subResourceId?: number;
}> = ({ type, resourceId, subResourceId }) => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    type === 'post'
      ? dispatch(listPostsReactions(resourceId))
      : type === 'post_comment'
      ? dispatch(listCommentsReactions(resourceId))
      : type === 'image' && subResourceId
      ? dispatch(listPostImageReactions(resourceId, subResourceId))
      : dispatch(listPostImageCommentReactions(resourceId));
  }, [dispatch, type, resourceId, subResourceId]);

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
