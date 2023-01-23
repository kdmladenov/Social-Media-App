import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import InputBoxWithAvatar from '../../../components/InputBoxWithAvatar';
import Modal from '../../../components/Modal';
import PhotoUploadForm from '../../../components/PhotoUploadForm';
import SearchBox from '../../../components/SearchBox';
import Tooltip from '../../../components/Tooltip';
import { listFriends } from '../../../context/actions/friendsActions';
import { listAllLocations } from '../../../context/actions/locationActions';
import { createPost, uploadPostImages } from '../../../context/actions/postActions';
import { BASE_URL, POST } from '../../../data/constants';
import defaultEndpoint from '../../../data/inputs/defaultEndpoint';
import feelingsList from '../../../data/inputs/feelingsList';
import useTypedSelector from '../../../hooks/useTypedSelector';
import NewPostType from '../../../types/NewPostType';
import UserType from '../../../types/UserType';
import getPostImagesClass from '../../../utils/getPostImagesClass';
import './styles/PostCreateCard.css';
import ResizableTextBox from '../../../components/ResizableTextBox';
import getPostInfoText from '../../../utils/getPostInfoText';

const PostCreateCard: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState<NewPostType>();
  const [section, setSection] = useState<string>('main');
  const [locationEndpoint, setLocationEndpoint] = useState(defaultEndpoint['locations']);
  const [taggedFriendsEndpoint, setTaggedFriendsEndpoint] = useState(
    defaultEndpoint['friendsList']
  );
  const [taggedFriendsList, setTaggedFriendsList] = useState<UserType[]>([]);
  const [postInfo, setPostInfo] = useState('');
  const { user } = useTypedSelector((state) => state.userDetails);
  const { success: successImagesUpload, postImages: uploadedPostImages } = useTypedSelector(
    (state) => state.postImagesUpload
  );
  const { locations } = useTypedSelector((state) => state.locationsList);
  const { friends } = useTypedSelector((state) => state.friendsList);

  const addLocationHandler = (location: { city: string; country: string }) => {
    setNewPost({ ...newPost, city: location.city, country: location.country });
    setSection('main');
  };

  const addFeelingHandler = (feeling: { icon: string; feeling: string }) => {
    setNewPost({ ...newPost, feelingType: feeling.feeling });
    setSection('main');
  };

  const tagFriendHandler = (friend: UserType) => {
    if (!taggedFriendsList?.some((taggedFriend) => taggedFriend.userId === friend.userId)) {
      setTaggedFriendsList([...taggedFriendsList, friend]);
      setNewPost({ ...newPost, taggedFriends: [...taggedFriendsList, friend] });
    }
  };
  const tagFriendRemoveHandler = (friendToRemove: UserType) => {
    setTaggedFriendsList(
      taggedFriendsList.filter((friend) => friend.userId !== friendToRemove?.userId)
    );
    setNewPost({ ...newPost, taggedFriends: taggedFriendsList });
  };

  const createPostHandler = () => {
    newPost?.images?.length && dispatch(createPost(user?.userId, newPost));
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (successImagesUpload) {
      setNewPost({ ...newPost, images: uploadedPostImages });
    }
  }, [uploadedPostImages, successImagesUpload]);

  useEffect(() => {
    if (section === 'locations') {
      const { page, pageSize, sort, search } = locationEndpoint;
      dispatch(listAllLocations(`${page}${pageSize}${sort}${search}`));
    } else if (section === 'tag_friends') {
      const { page, pageSize, sort, search } = taggedFriendsEndpoint;
      dispatch(listFriends(`${page}${pageSize}${sort}${search}`));
    }
  }, [dispatch, locationEndpoint, taggedFriendsEndpoint, section]);

  useEffect(() => {
    setPostInfo(getPostInfoText(newPost));
  }, [newPost]);

  return (
    <div className="post_create_card card">
      <InputBoxWithAvatar
        onClick={() => setIsModalOpen(true)}
        currentUserDetails={user}
        createAction={createPost}
        validationMin={POST.MIN_MESSAGE_LENGTH}
        validationMax={POST.MAX_MESSAGE_LENGTH}
        placeholder={`What's on your mind, ${user?.firstName}?`}
        errorMessage={`The comment should be ${POST.MIN_MESSAGE_LENGTH} - ${POST.MAX_MESSAGE_LENGTH} characters long`}
      />
      {isModalOpen && (
        <Modal classes="post_create flex_col" setIsOpenModal={setIsModalOpen}>
          <div className="title flex">
            {newPost?.images?.length && section === 'main' ? (
              <Button classes="blue create_post_button" onClick={createPostHandler}>
                Create Post
              </Button>
            ) : (
              <span>
                {section === 'main'
                  ? 'Create post'
                  : section === 'feelings'
                  ? 'How are you feeling?'
                  : section === 'tag_friends'
                  ? 'Tag friends'
                  : section === 'locations'
                  ? 'Search for location'
                  : ''}
              </span>
            )}
          </div>
          {section === 'main' ? (
            <>
              <div className="post_create_header flex">
                <Avatar
                  classes="big"
                  imageUrl={user?.avatar}
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                />
                <span>{postInfo}</span>
              </div>

              {newPost?.images?.length ? (
                <>
                  <ResizableTextBox
                    value={newPost?.message || ''}
                    onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
                    placeholder={`What is in your mind, ${user.firstName}`}
                  />
                  <ul className="post_create_action_list flex">
                    <span>Add to your post</span>
                    <ul className="button_group flex">
                      <Tooltip direction="top" text="Tag friends">
                        <i
                          className="fas fa-user-tag"
                          onClick={() => setSection('tag_friends')}
                        ></i>
                      </Tooltip>
                      <Tooltip direction="top" text="Add Feeling">
                        <i className="fa fa-smile" onClick={() => setSection('feelings')}></i>
                      </Tooltip>
                      <Tooltip direction="top" text="Add location">
                        <i className="fa fa-map" onClick={() => setSection('locations')}></i>
                      </Tooltip>
                    </ul>
                  </ul>
                  <div className="images_container">
                    <ul className={`images ${getPostImagesClass(newPost?.images)}`}>
                      {newPost?.images.map((image, index) => (
                        <li className={`image${index + 1}`} key={index}>
                          <img
                            src={
                              typeof image === 'string' && image?.slice(0, 4) === 'http'
                                ? image
                                : `${BASE_URL}/${image}`
                            }
                            alt="post"
                          />
                          {newPost?.images?.length! > 4 && (
                            <span>{`+${newPost?.images?.length! - 4} more`}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <PhotoUploadForm
                  resourceId={user?.userId}
                  updateAction={uploadPostImages}
                  multiple={true}
                  name="postImages"
                />
              )}
            </>
          ) : section === 'feelings' ? (
            <ul className="post_create_feelings">
              {feelingsList.map((feeling) => (
                <li
                  className="feeling flex"
                  onClick={() => addFeelingHandler(feeling)}
                  key={feeling?.icon}
                >
                  <div className="icon flex">
                    <i className={feeling.icon}></i>
                  </div>
                  <div className="feeling_type">{feeling.feeling}</div>
                </li>
              ))}
            </ul>
          ) : section === 'tag_friends' ? (
            <div className="post_create_friends_tag flex_col">
              <SearchBox
                updateQuery={(prop, value) =>
                  setTaggedFriendsEndpoint({ ...taggedFriendsEndpoint, [prop]: value })
                }
                resource="friends"
              />
              {taggedFriendsList?.length ? (
                <div className="tagged_friends_list flex_col">
                  <h4>TAGGED</h4>
                  <ul className="flex">
                    {taggedFriendsList.map((taggedFriend) => (
                      <li className="flex" key={taggedFriend?.userId}>
                        <span>{`${taggedFriend?.firstName} ${taggedFriend?.lastName}`}</span>
                        <Button classes="icon" onClick={() => tagFriendRemoveHandler(taggedFriend)}>
                          <i className="fa fa-times" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <></>
              )}
              <ul className="friends_tag flex_col">
                {friends?.length ? (
                  friends.map((friend) => (
                    <li
                      className="friend flex"
                      onClick={() => tagFriendHandler(friend)}
                      key={friend?.userId}
                    >
                      <Avatar
                        imageUrl={friend?.avatar}
                        firstName={friend?.firstName}
                        lastName={friend?.lastName}
                      />
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </div>
          ) : section === 'locations' ? (
            <div className="post_create_location flex_col">
              <SearchBox
                updateQuery={(prop, value) =>
                  setLocationEndpoint({ ...locationEndpoint, [prop]: value })
                }
                resource="locations"
              />
              <ul className="locations flex_col">
                {locations?.length ? (
                  locations?.map((location) => (
                    <li
                      className="location flex"
                      onClick={() => addLocationHandler(location)}
                      key={location?.locationId}
                    >
                      <div className="icon flex">
                        <i className="fa fa-map"></i>
                      </div>
                      <div className="details flex_col">
                        <div className="city">{location.city}</div>
                        <div className="info">{`${location.city}, ${location.country}`}</div>
                      </div>
                    </li>
                  ))
                ) : (
                  <span>No locations to show.</span>
                )}
              </ul>
            </div>
          ) : (
            <></>
          )}

          {section !== 'main' && (
            <Button classes="icon back_button" onClick={() => setSection('main')}>
              <i className="fa fa-arrow-left"></i>
            </Button>
          )}
        </Modal>
      )}
    </div>
  );
};

export default PostCreateCard;
