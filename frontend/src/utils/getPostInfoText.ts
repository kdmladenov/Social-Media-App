import NewPostType from '../types/NewPostType';
import PostType from '../types/PostType';

const getPostInfoText = (post?: PostType | NewPostType) => {
  const textArray = [];
  if (post?.city || post?.feelingType || post?.taggedFriends?.length) textArray.push(` is `);
  if (post?.feelingType) textArray.push(`feeling ${post?.feelingType}`);
  if (post?.city) textArray.push(` in ${post.city}, ${post.country}`);
  if (post?.taggedFriends?.length)
    textArray.push(
      `  with ${post?.taggedFriends?.[0].firstName} ${post?.taggedFriends?.[0].lastName} ${
        post?.taggedFriends?.length === 2
          ? `and 1 other`
          : post?.taggedFriends?.length > 2
          ? `and ${post?.taggedFriends?.length - 1} others`
          : ''
      }`
    );
  return `${textArray.join('')}`;
};

export default getPostInfoText;