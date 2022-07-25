import { RefObject } from 'react';
import PostType from '../PostType';

interface PostDetailsInfoProps {
  postListAdmin: boolean;
  showZoomedImage: boolean;
  post: PostType;
  commentsCount?: number;
  commentsRef: RefObject<HTMLElement>;
}
export default PostDetailsInfoProps;
