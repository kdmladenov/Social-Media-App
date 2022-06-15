import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import PostType from '../models/PostType.js';
import filterQueryHandler from '../helpers/filterQueryHandler.js';
import RolesType from '../models/RolesType.js';

const getAllPosts = async (
  search: string,
  filter: string | string[],
  sort: string,
  pageSize: number,
  page: number,
  role: RolesType
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = [
    'postId',
    'userId',
    'authorId',
    'postId',
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
      p.author_id as authorId,
      p.message,
      p.image,
      f.feeling_type_id as feelingTypeId,
      f.feeling_type as feelingType,
      l.location_id as locationId,
      l.city,
      l.country,
      p.created_at as createdAt,
      p.updated_at as updatedAt,
      p.is_deleted
    FROM posts p
    LEFT JOIN (SELECT location_id, city, country
        FROM locations
        GROUP BY location_id) as l using (location_id)
    LEFT JOIN (SELECT feeling_type_id, feeling_type
        FROM feeling_types
        GROUP BY feeling_type_id) as f using (feeling_type_id)
        ${
          role === rolesEnum.basic ? `WHERE p.is_deleted = 0 ${filter || search ? 'AND' : ''}` : ''
        } ${
    search
      ? `CONCAT_WS(',', p.post_id, p.user_id, p.author_id, p.message, p.image, f.feeling_type_id, f.feeling_type, l.location_id, l.city, l.country, p.created_at, p.updated_at, p.is_deleted) Like '%${search}%'`
      : ''
  } ${filter && search && ' AND '}${Array.isArray(filter) ? filterQueryHandler(filter) : filter}
        ORDER BY ${sortColumn} ${direction} 
        LIMIT ? OFFSET ?
        `;

  return db.query(sql, [+pageSize, +offset]);
};

const getBy = async (column: string, value: string | number, role: RolesType = 'basic') => {
  const sql = `
    SELECT 
      p.post_id as postId,
      p.user_id as userId,
      p.author_id as authorId,
      p.message,
      p.image,
      f.feeling_type_id as feelingTypeId,
      f.feeling_type as feelingType,
      l.location_id as locationId,
      l.city,
      l.country,
      p.created_at as createdAt,
      p.updated_at as updatedAt,
      p.is_deleted
    FROM posts p
    LEFT JOIN (SELECT location_id, city, country
        FROM locations
        GROUP BY location_id) as l using (location_id)
    LEFT JOIN (SELECT feeling_type_id, feeling_type
        FROM feeling_types
        GROUP BY feeling_type_id) as f using (feeling_type_id)
    WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND p.is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const create = async (post: PostType) => {
  const sql = `
    INSERT INTO posts (
      user_id,
      author_id,
      message,
      image,
      feeling_type_id,
      location_id
    )
    VALUES (?, ?, ?, ?, (SELECT feeling_type_id from feeling_types WHERE feeling_type = ?), (SELECT location_id from locations WHERE city = ?))
  `;
  const result = await db.query(sql, [
    +post.userId,
    +post.authorId,
    post.message || null,
    post.image || 'storage/images/defaultImage.png',
    post.feelingType || null,
    post.city || null
  ]);

  return getBy('post_id', +result.insertId);
};

const update = async (updatedPost: PostType) => {
  const sql = `
        UPDATE posts
        SET
        user_id = ?,
        author_id = ?,
        message = ?,
        image = ?,
        feeling_type_id = (SELECT feeling_type_id from feeling_types WHERE feeling_type = ?),
        location_id = (SELECT location_id from locations WHERE city = ?)
        WHERE post_id = ?
    `; 

  await db.query(sql, [
    +updatedPost.userId || null,
    +updatedPost.authorId || null,
    updatedPost.message || null,
    updatedPost.image || 'storage/images/defaultImage.png',
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
  getAllPosts,
  getBy,
  create,
  update,
  remove
};
