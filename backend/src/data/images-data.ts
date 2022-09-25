import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import RolesType from '../models/RolesType.js';
import { PostTypeImagesAsJson } from '../models/PostType.js';

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

const getImage = async (imageId: number) => {
  const sql = `
      SELECT 
      image_id as imageId,
      image,
      created_at as createdAt
      FROM images
      WHERE image_id = ? `;

  const result = await db.query(sql, [+imageId]);
  return result[0];
};

const getImageByURL = async (image: string) => {
  const sql = `
      SELECT 
      image_id as imageId,
      image,
      created_at as createdAt
      FROM images
      WHERE image = ? `;

  const result = await db.query(sql, [image]);
  return result[0];
};

const uploadImage = async (imageUrl: string) => {
  const sql = `
    INSERT INTO images (
      image
    )
    VALUES (?)
  `;
  const result = await db.query(sql, [imageUrl]);

  return await getImage(+result.insertId);
};

const addPostImage = async (postId: number, image: string) => {
  const sqlImage = `
    SELECT image_id
    FROM images 
    WHERE image like '%${image}%'
  `;
  const images = await db.query(sqlImage);

  const sql = `
    INSERT INTO post_images (
      post_id,
      image_id
    )
    VALUES (?, ?)
  `;
  await db.query(sql, [+postId, +images?.[0]?.image_id]);

  return;
};

const getAllPostImages = async (postId: number) => {
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
      WHERE pi.post_id = ? AND pi.is_deleted = 0
      `;

  return db.query(sql, [+postId]);
};

const getAllUserImages = async (
  userId: number,
  search: string,
  sort: string,
  page: number,
  pageSize: number
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = ['image_id', 'image'].includes(sortArr[0]) ? sortArr[0] : 'image_id';

  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
      SELECT
        pi.image_id as imageId,
        i.image,
        i.created_at as createdAt,
        COUNT(*) OVER () AS totalDBItems

      FROM post_images pi
      LEFT JOIN (SELECT image_id, image, created_at
          FROM post_images
          LEFT JOIN(SELECT image_id, image, created_at
              FROM images
              GROUP BY image_id) i USING (image_id)
          GROUP BY image_id) as i using (image_id)
      LEFT JOIN (SELECT post_id, user_id
          FROM posts) as p using (post_id)
      WHERE p.user_id = ?  AND ${`CONCAT_WS(',', 'image_id', 'image')`} Like '%${search}%'
      ORDER BY ${sortColumn} ${direction} 
      LIMIT ? OFFSET ?
      `;

  return db.query(sql, [+userId, +pageSize, +offset]);
};

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
  getAllPostImages,
  getAllUserImages,
  addPostImage,
  getImage,
  getImageByURL,
  uploadImage,
  remove
};
