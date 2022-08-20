// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';

// import './styles/PostImagesEdit.css';
// import {
//   deletePostImage,
//   listPostImages,
//   setImageAsMain,
//   uploadPostImage
// } from '../context/actions/postActions';



// const PostImagesEdit: React.FC = () => {
//   const dispatch = useDispatch();
//   const params = useParams<{ postId: string }>();
//   const postId = +params.postId!;

//   const [image, setImage] = useState('');

//   const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(uploadPostImage(postId, 'file_upload', e));
//   };

//   const addPostImageUrlHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
//     dispatch(uploadPostImage(postId, 'add_image_url', e, image));
//     setImage('');
//   };

//   const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     e.preventDefault();

//     if (e.key === 'Enter') {
//       dispatch(uploadPostImage(postId, 'add_image_url', e, image));
//       setImage('');
//     }
//   };

//   const deleteImageHandler = (postImageId: number) => {
//     dispatch(deletePostImage(postImageId));
//   };
//   const setImageAsMainHandler = (postImageId: number) => {
//     dispatch(setImageAsMain(postImageId));
//   };

//   const { postImages, loading, error } = useTypedSelector((state) => state.postImagesList);

//   const {
//     success: successUpload,
//     loading: loadingUpload,
//     error: errorUpload
//   } = useTypedSelector((state) => state.postImageUpload);

//   const {
//     success: successDelete,
//     loading: loadingDelete,
//     error: errorDelete
//   } = useTypedSelector((state) => state.postImageDelete);

//   const {
//     success: successSetMain,
//     loading: loadingSetMain,
//     error: errorSetMain
//   } = useTypedSelector((state) => state.postImageSetMain);

//   useEffect(() => {
//     dispatch(listPostImages(postId));
//   }, [dispatch, successUpload, successDelete, successSetMain, postId]);

//   return (
//     <div className="post_images_edit">
//       {loading || loadingUpload || loadingDelete || loadingSetMain ? (
//         <Loader />
//       ) : error || errorUpload || errorDelete || errorSetMain ? (
//         <Message type="error">{error || errorUpload || errorDelete || errorSetMain}</Message>
//       ) : (
//         <div className="post_images_edit_list_form">
//           <div className="input_group card">
//             <div className="image_url">
//               <Button onClick={addPostImageUrlHandler} disabled={!image}>
//                 Add Image URL
//               </Button>
//               <input
//                 type="text"
//                 placeholder="Enter image url"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//                 onKeyUp={(e) => keyPressHandler(e)}
//               />
//             </div>
//             or
//             <div className="file_upload">
//               <Button>
//                 <label htmlFor="upload">Choose file</label>
//                 <input id="upload" type="file" onChange={uploadImage} />
//               </Button>
//             </div>
//           </div>
//           <div className="images_list card">
//             <h2>Post Images</h2>
//             {postImages?.length > 0 && (
//               <ul>
//                 {postImages.map((image, index) => (
//                   <li key={index}>
//                     <img
//                       src={
//                         image?.image.startsWith('http')
//                           ? image?.image
//                           : `${BASE_URL}/${image?.image}`
//                       }
//                       alt=""
//                     />
//                     <Button
//                       classes="icon times"
//                       onClick={() => deleteImageHandler(image?.postImageId)}
//                     >
//                       <Tooltip direction="top" text="Delete">
//                         <i className="fa fa-times" />
//                       </Tooltip>
//                     </Button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostImagesEdit;

import React from 'react'

const PostImagesEdit = () => {
  return (
    <div>PostImagesEdit</div>
  )
}

export default PostImagesEdit