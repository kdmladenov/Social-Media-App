import ReactionType from '../types/ReactionType';

const getGroupReactions = (list: ReactionType[]) =>
  list?.reduce((acc, { reactionName, authorFirstName, authorLastName }) => {
    const key = reactionName;

    if (!acc[key]) acc[key] = { authorsList: [], authorsCount: 0 };

    acc[key].authorsList.push(`${authorFirstName} ${authorLastName}`);
    acc[key].authorsCount += 1;

    return acc;
  }, {} as { [key: string]: { authorsList: string[]; authorsCount: number } });

export default getGroupReactions;
