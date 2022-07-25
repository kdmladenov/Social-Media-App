interface CommentsProps {
  match?: TODO;
  postId?: number;
  setCommentsCount?: Dispatch<SetStateAction<number>>;
  isScreen: boolean;
  commentsRef: RefObject<HTMLElement>;
}
export default CommentsProps;
