interface PostImageGalleryProps {
  selectedImage: string;
  zoomedImageRect: {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  };
  setZoomBackgroundSize: Dispatch<SetStateAction<string>>;
  setZoomBackgroundPosition: Dispatch<SetStateAction<string>>;
  setShowZoomedImage: Dispatch<SetStateAction<boolean>>;
}
export default PostImageGalleryProps;
