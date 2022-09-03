import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import PostType, { PostTypeImagesAsJson } from '../models/PostType.js';
import filterQueryHandler from '../helpers/filterQueryHandler.js';
import RolesType from '../models/RolesType.js';

const getAllMyPosts = async (
  userId: number,
  search: string,
  filter: string | string[],
  sort: string,
  pageSize: number,
  page: number
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = [
    'postId',
    'userId',
    'sharedPostId',
    'feelingType',
    'city',
    'country',
    'createdAt',
    'updatedAt'
  ].includes(sortArr[0])
    ? sortArr[0]
    : 'postId';

  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
  SELECT 
      p.post_id as postId,
      p.user_id as userId,
      u.first_name as userFirstName,
      u.last_name as userLastName,
      u.avatar as userAvatar,
      p.shared_post_id as sharedPostId,
      p.message,
      f.feeling_type_id as feelingTypeId,
      f.feeling_type as feelingType,
      l.location_id as locationId,
      l.city,
      l.country,
      i.images,
      p.created_at as createdAt,
      p.updated_at as updatedAt,
      p.is_deleted as isDeleted,
      COUNT(*) OVER () AS totalDBItems
    FROM posts p
    LEFT JOIN (SELECT 
        pi.post_id,  
        JSON_ARRAYAGG(JSON_OBJECT('image', image, 'imageId', image_id)) as images
      FROM post_images pi
        LEFT JOIN (SELECT image_id, image
                  FROM images) as img using (image_id)
                  GROUP BY post_id) as i USING (post_id)
    LEFT JOIN (SELECT location_id, city, country
        FROM locations
        GROUP BY location_id) as l USING (location_id)
    LEFT JOIN (SELECT feeling_type_id, feeling_type
        FROM feeling_types
        GROUP BY feeling_type_id) as f USING (feeling_type_id)
    LEFT JOIN (SELECT user_id, first_name, last_name, avatar
        FROM users
        GROUP BY user_id) as u USING (user_id)
    WHERE p.user_id = ? AND p.is_deleted = 0 ${filter || search ? 'AND' : ''}
        ${
          search
            ? `CONCAT_WS(',', p.post_id, p.user_id, p.message, f.feeling_type_id, f.feeling_type, l.location_id, l.city, l.country, p.created_at, p.updated_at, p.is_deleted) Like '%${search}%'`
            : ''
        } ${filter && search && ' AND '}${
    Array.isArray(filter) ? filterQueryHandler(filter) : filter
  }
        ORDER BY ${sortColumn} ${direction} 
        LIMIT ? OFFSET ?
        `;

  const posts = (await db.query(sql, [+userId, +pageSize, +offset])) as PostTypeImagesAsJson[];

  return posts.map((post) => {
    return {
      ...post,
      images: JSON.parse(post.images)
    };
  });
};

const getBy = async (column: string, value: string | number, role: RolesType = 'basic') => {
  const sql = `
    SELECT 
      p.post_id as postId,
      p.user_id as userId,
      p.shared_post_id as sharedPostId,
      p.message,
      f.feeling_type_id as feelingTypeId,
      f.feeling_type as feelingType,
      l.location_id as locationId,
      l.city,
      l.country,
      i.images,
      p.created_at as createdAt,
      p.updated_at as updatedAt,
      p.is_deleted as isDeleted
    FROM posts p
    LEFT JOIN (SELECT 
        pi.post_id,  
        JSON_ARRAYAGG(JSON_OBJECT('image', image, 'imageId', image_id)) as images
      FROM post_images pi
        LEFT JOIN (SELECT image_id, image
                  FROM images) as img using (image_id)
                  GROUP BY post_id) as i USING (post_id)
    LEFT JOIN (SELECT location_id, city, country
        FROM locations
        GROUP BY location_id) as l using (location_id)
    LEFT JOIN (SELECT feeling_type_id, feeling_type
        FROM feeling_types
        GROUP BY feeling_type_id) as f using (feeling_type_id)
    WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND p.is_deleted = 0' : ''};
  `;

  const result = (await db.query(sql, [value])) as PostTypeImagesAsJson[];

  return {
    ...result[0],
    images: JSON.parse(result[0].images)
  };
};

const create = async ( userId: number) => {
  const sql = `
    INSERT INTO posts (
      user_id
    )
    VALUES (?)
  `;
  const result = await db.query(sql, [+userId]);

  return getBy('post_id', +result.insertId);
};

const update = async (updatedPost: PostType) => {
  const sql = `
        UPDATE posts
        SET
        user_id = ?,
        shared_post_id = ?,
        message = ?,
        feeling_type_id = (SELECT feeling_type_id from feeling_types WHERE feeling_type = ?),
        location_id = (SELECT location_id from locations WHERE city = ?)
        WHERE post_id = ?
    `;

  await db.query(sql, [
    +updatedPost.userId || null,
    +updatedPost.sharedPostId || null,
    updatedPost.message || null,
    updatedPost.feelingType || null,
    updatedPost.city || null,
    +updatedPost.postId
  ]);

  return getBy('post_id', updatedPost.postId);
};

const remove = async (postToDelete: PostType) => {
  const sql = `
        UPDATE posts 
        SET is_deleted = true
        WHERE post_id = ?
    `;

  return db.query(sql, [postToDelete.postId]);
};

export default {
  getAllMyPosts,
  getBy,
  create,
  update,
  remove
};
