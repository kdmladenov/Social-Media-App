import PostImageType from '../PostImageType';

interface PostScreenImageSidebarProps {
  images: PostImageType[];
  setSelectedImage: Dispatch<SetStateAction<images>>;
}
export default PostScreenImageSidebarProps;
