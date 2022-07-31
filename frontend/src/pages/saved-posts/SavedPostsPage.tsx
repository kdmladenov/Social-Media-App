import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import SearchBox from '../../components/SearchBox';
import useTypedSelector from '../../hooks/useTypedSelector';
import defaultEndpoint from '../../data/inputs/defaultEndpoint';
import './styles/SavedPostsPage.css';
import {
  deleteSavedPost,
  listCollections,
  listSavedPosts
} from '../../context/actions/savedPostsActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import PostCard from '../home/posts/PostCard';
import Modal from '../../components/Modal';
import DropDown from '../../components/Dropdown';

const SavedPostsPage = () => {
  const dispatch = useDispatch();
  const [section, setSection] = useState(null);
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
    setModalContent(<h1>Create Collection Form</h1>);
  };

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listSavedPosts(`${page}${pageSize}${sort}${search}`));
    dispatch(listCollections());
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
            {section && collections?.length ? (
              collections.map((collection) => (
                <>
                  <Button classes="icon flex" onClick={() => setSection(null)}>
                    <i className="fas fa-arrow-left" />
                  </Button>

                  <h5 onClick={() => setSection(null)}>{collection.collection}</h5>
                </>
              ))
            ) : (
              <h3>All Saved Posts</h3>
            )}
            {section && <span>{section}</span>}
          </div>

          <ul className="menu_content flex_col">
            {/* {section === 'allFriends' && (
              <SearchBox
                updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
                resource="friends"
              />
            )} */}
            {/* <li className="button card" key={'All Saved Posts'}>
              <i className={`fsa fa-home left`} />
              <span>{'All Saved Posts'}</span>
            </li> */}
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
              <Button onClick={addCollectionHandler}>
                <i className="fa fa-plus"></i>
                <span>Add New Collection</span>
              </Button>
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
                  <DropDown
                    button={
                      <Button classes="icon item_btn flex">
                        <i className="fa fa-ellipsis-h"></i>
                      </Button>
                    }
                  >
                    <ul className="menu flex_col">
                      <li className="flex" onClick={() => dispatch(deleteSavedPost(post?.postId))}>
                        <span>{`Remove`}</span>
                      </li>
                    </ul>
                  </DropDown>
                  <PostCard key={post.postId} post={post} />
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
