import CommentType from '../models/CommentType';

const getNestedComments = (comments: CommentType[]) => {
  const nested: {
    [key: string]: CommentType;
  } = {};

  //insert artificial root node
  nested[-1] = {
    commentId: -1,
    postId: -1,
    replyTo: null,
    content: 'Fake root',
    replies: []
  };

  //index nodes by their id
  comments.forEach((comment) => {
    if (comment.replyTo == null) {
      comment.replyTo = -1;
    }
    nested[comment.commentId] = comment;
    comment.replies = [];
  });

  //put items into parent replies
  comments.forEach((comment) => {
    if (comment.replyTo) {
      const parent = nested[comment.replyTo];
      parent?.replies?.push(comment);
    }
  });

  return nested[-1].replies;
};

export default getNestedComments;
