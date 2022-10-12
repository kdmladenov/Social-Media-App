import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import Image from '../models/Image.js';
import RolesType from '../models/RolesType.js';

const getStoryImageBy = async (
  column: string,
  value: string | number,
  role: RolesType = 'basic'
) => {
  const sql = `
      SELECT 
        story_image_id as storyImageId,
        story_id as storyId,
        image,
        is_main as isMain,
        is_deleted as isDeleted
      FROM story_images 
      WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const addStoryImage = async (storyId: number, imageUrl: string, isMain: number = 0) => {
  const sql = `
    INSERT INTO story_images (
      story_id,
      image,
      is_main
    )
    VALUES (?, ?, ?)
  `;
  const result = await db.query(sql, [+storyId, imageUrl, +isMain]);

  return { storyId, storyImageId: result.insertId, image: imageUrl, isMain };
};

const getAllStoryImages = async (storyId: number) => {
  const sql = `
      SELECT 
        story_image_id as storyImageId,
        story_id as storyId,
        image,
        is_main as isMain,
        is_deleted as isDeleted
      FROM story_images 
      WHERE story_id = ? AND is_deleted = 0
      `;

  return db.query(sql, [+storyId]);
};

const remove = async (storyImageId: number) => {
  const sql = `
        UPDATE story_images 
        SET is_deleted = true
        WHERE story_image_id = ?
    `;

  return db.query(sql, [+storyImageId]);
};

// const update = async (updatedStoryImage: Image) => {
//   const sql = `
//         UPDATE story_images
//         SET
//           story_id = ?,
//           image = ?,
//           is_main = ?
//         WHERE story_image_id = ?
//     `;

//   const _ = await db.query(sql, [
//     +updatedStoryImage.storyId || null,
//     updatedStoryImage.image || null,
//     updatedStoryImage.isMain || 0,
//     +updatedStoryImage.storyImageId || null
//   ]);

//   return getStoryImageBy('story_image_id', +updatedStoryImage.storyImageId);
// };

export default {
  getStoryImageBy,
  addStoryImage,
  getAllStoryImages,
  remove,
  // update
};
