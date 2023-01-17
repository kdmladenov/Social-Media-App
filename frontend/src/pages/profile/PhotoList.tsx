import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HeaderControls from '../../components/HeaderControls';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import Slider from '../../components/Slider';
import { listUserImages } from '../../context/actions/userActions';
import { BASE_URL } from '../../data/constants';
import defaultEndpoint from '../../data/inputs/defaultEndpoint';
import { imagesListPageSizeOptionsMap } from '../../data/inputs/pageSizeOptionsMap';
import { imagesListSortOptionsMap } from '../../data/inputs/sortDropdownOptionsMaps';
import useTypedSelector from '../../hooks/useTypedSelector';
import UserType from '../../types/UserType';

import './styles/PhotoList.css';

const PhotoList: React.FC<{ screen: string, user: UserType }> = ({ screen = '', user }) => {
  const dispatch = useDispatch();
  const [endpoint, setEndpoint] = useState({
    ...defaultEndpoint['photoList'],
    pageSize: screen === 'profile_posts_screen' ? 'pageSize=9&' : 'pageSize=12&'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostImageIndex, setSelectedPostImageIndex] = useState(0);

  const { userImages } = useTypedSelector((state) => state.userImagesList);

  const imageModalHandler = (imageId: number) => {
    setSelectedPostImageIndex(userImages?.findIndex((image) => image.imageId === imageId));
    setIsModalOpen(true);
  };

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listUserImages(`${page}${pageSize}${sort}${search}`, user?.userId));
  }, [dispatch, endpoint, user?.userId]);

  return (
    <div className={`photo_list_container card flex_col ${screen}`}>
      <div className="header flex">
        <h1>Photos</h1>
        {screen === 'profile_photos_screen' && (
          <HeaderControls
            updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
            query={endpoint}
            pageSizeOptionsMap={imagesListPageSizeOptionsMap}
            sortOptionsMap={imagesListSortOptionsMap}
          />
        )}
      </div>
      <div className="photo_list flex">
        {userImages?.map((photo) => (
          <img
            src={photo.image}
            alt={photo.image || 'image'}
            onClick={() => imageModalHandler(photo?.imageId)}
            key={photo?.imageId}
          />
        ))}
      </div>
      <Pagination
        updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
        currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
        pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
        totalItems={userImages?.[0]?.totalDBItems}
      />
      {isModalOpen && (
        <Modal classes="images_list" setIsOpenModal={setIsModalOpen}>
          <div className="images_container">
            <Slider
              dots={false}
              slideIndex={selectedPostImageIndex}
              setSlideIndex={setSelectedPostImageIndex}
            >
              {userImages?.map((image) => (
                <Slider.Item item={image} button_controls={true} key={image?.imageId}/>
              ))}
            </Slider>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PhotoList;
