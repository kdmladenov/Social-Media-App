interface VotesProps {
  type?: string;
  showButtons: boolean;
  voteAction: TODO;
  itemId?: number;
  reactionNameUp: string;
  reactionNameDown: string;
  votesUpCount?: number;
  votesDownCount?: number;
  userVotesUpList?: string;
  userVotesDownList?: string;
  currentUserId: number;
  iconUp?: string;
  iconDown?: string;
}
export default VotesProps;
