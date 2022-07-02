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
    replyToAuthorFirstName: '',
    replyToAuthorLastName: '',
    content: 'Fake root',
    replies: [],
    authorId: -1,
    authorFirstName: '',
    authorLastName: '',
    authorAvatar: '',
    createdAt: '',
    updatedAt: '',
    isDeleted: false
  };

  //index nested by their commentId
  comments.forEach((comment) => {
    if (comment.replyTo === null) {
      comment.replyTo = -1;
    }
    nested[comment.commentId] = comment;
    comment.replies = [];
  });

  //put comments into parent replies arr
  comments.forEach((comment) => {
    if (comment.replyTo) {
      const parent = nested[comment.replyTo];
      parent?.replies?.push(comment);
      comment.replyToAuthorFirstName = parent?.authorFirstName;
      comment.replyToAuthorLastName = parent?.authorLastName;
    }
  });

  return nested[-1].replies;
};

export default getNestedComments;
