import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles/PostCard.css';

import PostCardFooter from './PostCardFooter';
import PostType from '../../../types/PostType';
import Avatar from '../../../components/Avatar';
import { BASE_URL } from '../../../data/constants';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Slider from '../../../components/Slider';

const PostCard: React.FC<{ post: PostType }> = ({
  post
  // reactions,
  // comments
}) => {
  // const dispatch = useDispatch();

  // const portalRefs = useTypedSelector((state) => state.portalRefs);
  // const {
  //   portalRefsMap: { toast_cart: toastCartRef }
  // } = portalRefs;

  const [selectedPostImageIndex, setSelectedPostImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    postId,
    userId,
    userFirstName,
    userLastName,
    userAvatar,
    authorId,
    authorFirstName,
    authorLastName,
    authorAvatar,
    message,
    images,
    feelingTypeId,
    feelingType,
    locationId,
    city,
    country,
    createdAt,
    updatedAt,
    isDeleted,
    totalDBItems
  } = post;

  const postModalHandler = (imageId: number) => {
    setSelectedPostImageIndex(post?.images.findIndex((image) => image.imageId === imageId));
    setIsModalOpen(true);
  };

  return (
    <div className="post_card card">
      <div className="post_header">
        <Avatar imageUrl={userAvatar} firstName={userFirstName} lastName={userLastName} />
        {postId}
      </div>
      <div className="message">
        <Link to={`/posts/${postId}`}>{message}</Link>
      </div>
      <ul
        className={`images ${
          images.length === 1
            ? ''
            : images.length === 2
            ? 'two'
            : images.length === 2
            ? 'two'
            : images.length === 3
            ? 'three'
            : images.length === 4
            ? 'four'
            : 'more'
        }`}
      >
        {images.map((image, index) => (
          <li className={`image${index + 1}`} onClick={() => postModalHandler(image?.imageId)}>
            <img
              crossOrigin="anonymous"
              src={image?.image?.startsWith('http') ? image?.image : `${BASE_URL}/${image?.image}`}
              alt="post"
            />
            {images?.length > 4 && <span>{`+${images.length - 4} more`}</span>}
          </li>
        ))}
      </ul>
      <PostCardFooter postId={postId} />
      {isModalOpen && (
        <Modal classes="post_images" setIsOpenModal={setIsModalOpen}>
          <>
            <aside className="post_images_sidebar flex_col">
              <div className="post_images_header">
                <Avatar
                  imageUrl={userAvatar}
                  firstName={userFirstName}
                  lastName={userLastName}
                  classes="big"
                />
              </div>
              <PostCardFooter
                postId={postId}
                imageId={images[selectedPostImageIndex].imageId}
                type="image"
              />
            </aside>
            <div className="post_images_container">
              <Slider
                dots={false}
                slideIndex={selectedPostImageIndex}
                setSlideIndex={setSelectedPostImageIndex}
              >
                {images?.map((image) => (
                  <Slider.Item item={image} button_controls={true} />
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
