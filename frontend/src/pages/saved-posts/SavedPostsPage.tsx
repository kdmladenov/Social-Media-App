import React, {  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import useTypedSelector from '../../hooks/useTypedSelector';
import defaultEndpoint from '../../data/inputs/defaultEndpoint';
import './styles/SavedPostsPage.css';
import {
  createCollection,
  deleteCollection,
  deleteSavedPost,
  listCollections,
  listSavedPosts,
  updateCollection,
  updateSavedPost
} from '../../context/actions/savedPostsActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import PostCard from '../home/posts/PostCard';
import Modal from '../../components/Modal';
import DropDown from '../../components/Dropdown';
import FormComponent from '../../components/FormComponent';
import updateCollectionInitialInputState from '../../data/inputs/createCollectionInitialInputState';
import ConfirmMessage from '../../components/ConfirmMessage';
import changePostCollectionInitialInputState from '../../data/inputs/changePostCollectionInitialInputState';

const SavedPostsPage = () => {
  const dispatch = useDispatch();
  const [section, setSection] = useState('');
  const [endpoint, setEndpoint] = useState(defaultEndpoint['savedPosts']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const { loading, error, savedPosts } = useTypedSelector((state) => state.savedPostsList);
  const {
    loading: loadingCollection,
    error: errorCollection,
    collections
  } = useTypedSelector((state) => state.collectionsList);

  const { success: savedPostDeleteSuccess } = useTypedSelector((state) => state.savedPostDelete);
  const { success: savedPostUpdateSuccess } = useTypedSelector((state) => state.savedPostUpdate);
  const { success: savedPostCreateSuccess } = useTypedSelector((state) => state.savedPostCreate);

  const { success: collectionDeleteSuccess } = useTypedSelector((state) => state.collectionDelete);
  const { success: collectionUpdateSuccess } = useTypedSelector((state) => state.collectionUpdate);
  const { success: collectionCreateSuccess } = useTypedSelector((state) => state.collectionCreate);

  const addCollectionHandler = () => {
    setIsModalOpen(true);
    setModalContent(
      <div className="create_collection flex_col">
        <span className="message">Create New Collection</span>
        <FormComponent
          inputData={updateCollectionInitialInputState}
          createAction={createCollection}
          mode={'create'}
        />
      </div>
    );
    collectionCreateSuccess && setIsModalOpen(false);
  };

  const updateCollectionHandler = () => {
    setIsModalOpen(true);
    setModalContent(
      <div className="update_collection flex_col">
        <span className="message">Update Collection Name</span>
        <FormComponent
          inputData={updateCollectionInitialInputState}
          resourceId={
            collections?.find((collection) => collection.collection === section)?.collectionId
          }
          updateAction={updateCollection}
          mode={'update'}
        />
      </div>
    );
  };

  const deleteCollectionHandler = () => {
    setIsModalOpen(true);
    setModalContent(
      <ConfirmMessage
        setIsModalOpen={setIsModalOpen}
        message={`Are your sure you want to delete this collection and all saved posts in it?`}
        resourceId={
          collections?.find((collection) => collection.collection === section)?.collectionId!
        }
        action={deleteCollection}
      />
    );
    setSection('');
  };

  const changePostCollectionHandler = (postId: number) => {
    setIsModalOpen(true);
    setModalContent(
      <div className="update_collection flex_col">
        <span className="message">Move the Post to a different collection</span>
        <FormComponent
          inputData={changePostCollectionInitialInputState(
            collections.map((collection) => collection.collection)
          )}
          resourceId={postId}
          updateAction={updateSavedPost}
          mode={'update'}
        />
      </div>
    );
  };

  const postCardDropdown = (postId: number) => (
    <DropDown
      button={
        <Button classes="icon item_btn flex">
          <i className="fa fa-ellipsis-h"></i>
        </Button>
      }
    >
      <ul className="menu flex_col">
        <li onClick={() => dispatch(deleteSavedPost(postId))}>Remove</li>
        <li onClick={() => changePostCollectionHandler(postId)}>Change Collection</li>
      </ul>
    </DropDown>
  );

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listSavedPosts(`${page}${pageSize}${sort}${search}`));
    dispatch(listCollections());

    if (collectionCreateSuccess || collectionUpdateSuccess || savedPostUpdateSuccess) {
      setIsModalOpen(false);
    }
  }, [
    dispatch,
    endpoint,
    section,
    savedPostDeleteSuccess,
    savedPostUpdateSuccess,
    savedPostCreateSuccess,
    collectionDeleteSuccess,
    collectionUpdateSuccess,
    collectionCreateSuccess
  ]);

  return (
    <main className="saved_post_page">
      <aside className="sidebar">
        <div className="menu">
          <div className="menu_header">
            {section &&
              collections?.length &&
              collections.map((_) => (
                <>
                  <Button classes="icon flex" onClick={() => setSection('')}>
                    <i className="fas fa-arrow-left" />
                  </Button>

                  <h5 onClick={() => setSection('')}>All</h5>
                </>
              ))}
            <span>{section ? section : 'All Saved Posts'}</span>
            {section && (
              <DropDown
                button={
                  <Button classes="icon item_btn flex">
                    <i className="fa fa-ellipsis-h"></i>
                  </Button>
                }
              >
                <ul className="menu flex_col">
                  <li className="flex" onClick={() => updateCollectionHandler()}>
                    Rename
                  </li>
                  <li className="flex" onClick={() => deleteCollectionHandler()}>
                    Remove
                  </li>
                </ul>
              </DropDown>
            )}
          </div>

          <ul className="menu_content flex_col">
            {!section && collections?.length && <h3>Collections</h3>}
            {!section &&
              collections?.length &&
              collections?.map((collection) => (
                <li
                  className="button card"
                  key={collection?.collection}
                  onClick={() => setSection(collection?.collection)}
                >
                  <i className={`fa fa-times left`} />
                  <span>{`${collection?.collection}`}</span>
                  {!section && <i className="fas fa-angle-right chevron" />}
                </li>
              ))}
            <li>
              {!section && (
                <Button classes="blue_light" onClick={addCollectionHandler}>
                  <i className="fa fa-plus"></i>
                  <span>Create New Collection</span>
                </Button>
              )}
            </li>
          </ul>
        </div>
      </aside>
      <section className="saved_posts_container flex_col">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : savedPosts?.length > 0 ? (
          <ul className="flex_col">
            {savedPosts
              .filter((post) => (section ? post.collection === section : true))
              .map((post) => (
                <li className="saved_post_card">
                  <PostCard
                    key={post.postId}
                    post={post}
                    dropDown={postCardDropdown(post?.postId)}
                  />
                </li>
              ))}
          </ul>
        ) : (
          <h2>You have no saved posts</h2>
        )}
      </section>
      {isModalOpen && <Modal setIsOpenModal={setIsModalOpen}>{modalContent}</Modal>}
    </main>
  );
};

export default SavedPostsPage;
