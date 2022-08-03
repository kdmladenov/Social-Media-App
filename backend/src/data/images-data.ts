import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import Image from '../models/Image.js';
import RolesType from '../models/RolesType.js';

const getPostImage = async (postId: number, imageId: number, role: RolesType = 'basic') => {
  const sql = `
      SELECT 
      pi.post_id as postId,
      pi.image_id as imageId,
      i.image,
      pi.is_deleted as isDeleted

      FROM post_images pi
      
      LEFT JOIN (SELECT image_id, image
          FROM post_images
          LEFT JOIN(SELECT image_id, image
              FROM images
              GROUP BY image_id) i USING (image_id)
          GROUP BY image_id) as i using (image_id)
      WHERE pi.post_id = ? AND pi.image_id = ? ${
        role === rolesEnum.basic ? ' AND is_deleted = 0' : ''
      };
  `;

  const result = await db.query(sql, [+postId, +imageId]);
  return result[0];
};

const addPostImage = async (postId: number, imageId: number) => {
  const sql = `
    INSERT INTO post_images (
      post_id,
      image_id
    )
    VALUES (?, ?)
  `;
  const result = await db.query(sql, [+postId, +imageId]);

  return { postId, imageId };
};

// const getAllPostImages = async (postId: number) => {
//   const sql = `
//       SELECT 
//         pi.post_id as postId,
//         pi.image_id as imageId,
//         i.image,
//         pi.is_delete as isDeleted
        
//       FROM post_images pi
//       LEFT JOIN (SELECT image_id, image
//           FROM post_images
//           LEFT JOIN(SELECT image_id, image
//               FROM images
//               GROUP BY image_id) i USING (image_id)
//           GROUP BY image_id) as i using (image_id)
//       WHERE pi.post_id = ? AND pi.is_deleted = 0
//       `;

//   return db.query(sql, [+postId]);
// };

const remove = async (postId: number, imageId: number) => {
  const sql = `
        UPDATE post_images 
        SET is_deleted = true
        WHERE post_id = ? AND image_id = ?
    `;

  return db.query(sql, [+postId, +imageId]);
};

// const update = async (updatedPostImage: Image) => {
//   const sql = `
//         UPDATE post_images
//         SET
//           post_id = ?,
//           image_id = ?
//         WHERE post_image_id = ?
//     `;

//   const _ = await db.query(sql, [
//     +updatedPostImage.postId || null,
//     +updatedPostImage.imageId || null,
//     updatedPostImage.image || null,
//     updatedPostImage.isMain || 0,
//     +updatedPostImage.postImageId || null
//   ]);

//   return getPostImage('post_image_id', +updatedPostImage.postImageId);
// };

export default {
  getPostImage,
  addPostImage,
  // getAllPostImages,
  remove
};
