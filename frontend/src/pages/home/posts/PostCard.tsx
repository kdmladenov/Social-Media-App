import React, { useEffect, useState } from 'react';

import './styles/PostCard.css';

import PostCardFooter from './PostCardFooter';
import PostType from '../../../types/PostType';
import Avatar from '../../../components/Avatar';
import { POST } from '../../../data/constants';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Slider from '../../../components/Slider';
import DropDown from '../../../components/Dropdown';
import {
  createSavedPost,
  listCollections,
  listSavedPosts
} from '../../../context/actions/savedPostsActions';
import { useDispatch } from 'react-redux';
import FormComponent from '../../../components/FormComponent';
import useTypedSelector from '../../../hooks/useTypedSelector';
import createCollectionInitialInputState from '../../../data/inputs/createCollectionInitialInputState';
import changePostCollectionInitialInputState from '../../../data/inputs/changePostCollectionInitialInputState';
import getImagesClass from '../../../utils/getImagesClass';
import ShowMoreButton from '../../../components/ShowMoreButton';

const PostCard: React.FC<{ post: PostType; dropDown?: JSX.Element; screen?: string }> = ({
  post,
  dropDown,
  screen
}) => {
  const dispatch = useDispatch();

  const [selectedPostImageIndex, setSelectedPostImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const [isModalSliderFullScreen, setIsModalSliderFullScreen] = useState(false);

  const { success: savedPostCreateSuccess } = useTypedSelector((state) => state.savedPostCreate);
  const { collections } = useTypedSelector((state) => state.collectionsList);
  const { savedPosts } = useTypedSelector((state) => state.savedPostsList);

  const {
    postId,
    userFirstName,
    userLastName,
    userAvatar,
    message,
    images,
    authorFirstName,
    authorLastName,
    authorAvatar
  } = post;

  const isPostSaved = !!savedPosts?.filter((savedPost) => savedPost.postId === postId).length;

  const imageModalHandler = (imageId: number) => {
    setSelectedPostImageIndex(post?.images?.findIndex((image) => image.imageId === imageId));
    setIsModalOpen(true);
  };

  const savePostHandler = (postId: number) => {
    setIsMenuModalOpen(true);

    setModalContent(
      <div className="create_collection flex_col">
        <FormComponent
          inputData={changePostCollectionInitialInputState(
            collections?.length
              ? collections.map((collection) => collection.collection)
              : ['For later']
          )}
          resourceId={postId}
          createAction={createSavedPost}
          mode={'create'}
        />
        <span className="message">Or</span>
        <FormComponent
          inputData={createCollectionInitialInputState}
          createAction={createSavedPost}
          resourceId={postId}
          mode={'create'}
        />
      </div>
    );
  };

  const postCardDropdown = (
    <DropDown
      button={
        <Button classes="icon item_btn flex">
          <i className="fa fa-ellipsis-h"></i>
        </Button>
      }
      isPointed={false}
    >
      <ul className="menu flex_col">
        <li onClick={() => savePostHandler(postId)}>Save Post</li>
      </ul>
    </DropDown>
  );

  useEffect(() => {
    if (screen !== 'saved_posts') {
      dispatch(listCollections());
      dispatch(listSavedPosts());
    }
    savedPostCreateSuccess && setIsMenuModalOpen(false);
  }, [dispatch, savedPostCreateSuccess, screen]);

  return (
    <div className="post_card card">
      <div className="post_header flex">
        <Avatar
          imageUrl={userAvatar || authorAvatar}
          firstName={userFirstName || authorFirstName}
          lastName={userLastName || authorLastName}
        />
        {dropDown ? dropDown : !isPostSaved && postCardDropdown}
      </div>

      <ShowMoreButton text={message} breakpoint={POST.MESSAGE_CHARS_SHOWN} />

      <ul className={`images ${getImagesClass(images)}`}>
        {images?.map((image, index) => (
          <li
            className={`image${index + 1}`}
            onClick={() => imageModalHandler(image?.imageId)}
            key={image?.imageId}
          >
            <img src={image?.image} alt="post" />
            {images?.length > 4 && <span>{`+${images?.length - 4} more`}</span>}
          </li>
        ))}
      </ul>
      <PostCardFooter postId={postId} />
      {isMenuModalOpen && <Modal setIsOpenModal={setIsMenuModalOpen}>{modalContent}</Modal>}
      {isModalOpen && (
        <Modal
          classes={`post_images ${isModalSliderFullScreen ? 'full_screen' : ''}`}
          setIsOpenModal={setIsModalOpen}
        >
          <>
            <aside className="post_images_sidebar flex_col">
              <div className="sidebar_container">
                <div className="post_header flex">
                  <Avatar imageUrl={userAvatar} firstName={userFirstName} lastName={userLastName} />
                  {dropDown ? dropDown : !isPostSaved && postCardDropdown}
                </div>
                <p className="message">
                  <ShowMoreButton text={message} breakpoint={POST.MESSAGE_CHARS_SHOWN} />
                </p>
                <PostCardFooter
                  postId={postId}
                  imageId={images[selectedPostImageIndex].imageId}
                  type="image"
                />
              </div>
            </aside>
            <div className="post_images_container">
              <Slider
                dots={false}
                slideIndex={selectedPostImageIndex}
                setSlideIndex={setSelectedPostImageIndex}
              >
                {images?.map((image) => (
                  <Slider.Item
                    item={image}
                    key={image?.imageId}
                    button_controls={true}
                    isFullScreen={isModalSliderFullScreen}
                    setIsFullScreen={setIsModalSliderFullScreen}
                  />
                ))}
              </Slider>
            </div>
          </>
        </Modal>
      )}
    </div>
  );
};

export default PostCard;
