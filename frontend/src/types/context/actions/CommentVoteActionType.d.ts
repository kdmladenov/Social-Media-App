interface CommentVoteActionRequest {
  type: 'COMMENT_VOTE_REQUEST';
}

interface CommentVoteActionSuccess {
  type: 'COMMENT_VOTE_SUCCESS';
}
interface CommentVoteActionError {
  type: 'COMMENT_VOTE_FAIL';
  payload: string;
}

type CommentVoteActionType =
  | CommentVoteActionRequest
  | CommentVoteActionSuccess
  | CommentVoteActionError;

export default CommentVoteActionType;
