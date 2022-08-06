import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
// import SavedPostType from '../models/SavedPostType.js';
import filterQueryHandler from '../helpers/filterQueryHandler.js';
import RolesType from '../models/RolesType.js';
import { PostTypeImagesAsJson } from '../models/PostType.js';

const getAllMySavedPosts = async (
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
      sp.post_id as postId,
      sp.user_id as userId,
      sp.date_created as dateCreated,
      sp.collection_id as collectionId,
      col.collection,
      sp.is_deleted as isDeleted,
      p.user_id as authorId,
      u.first_name as authorFirstName,
      u.last_name as authorLastName,
      u.avatar as authorAvatar,
      p.shared_post_id as sharedPostId,
      p.message,
      p.feeling_type_id as feelingTypeId,
      f.feeling_type as feelingType,
      p.location_id as locationId,
      l.city,
      l.country,
      i.images,
      p.created_at as createdAt,
      p.updated_at as updatedAt,
      COUNT(*) OVER () AS totalDBItems
    FROM saved_posts sp
    LEFT JOIN (SELECT post_id, user_id, shared_post_id, message, created_at, updated_at, location_id, feeling_type_id
        FROM posts
        GROUP BY post_id) as p USING (post_id)
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
    LEFT JOIN (SELECT collection_id, collection
        FROM saved_posts_collections
        GROUP BY collection_id) as col USING (collection_id)
    LEFT JOIN (SELECT feeling_type_id, feeling_type
        FROM feeling_types
        GROUP BY feeling_type_id) as f USING (feeling_type_id)
    LEFT JOIN (SELECT user_id, first_name, last_name, avatar
        FROM users
        GROUP BY user_id) as u ON p.user_id = u.user_id
    WHERE sp.user_id = ? AND sp.is_deleted = 0 ${filter || search ? 'AND' : ''}
        ${
          search
            ? `CONCAT_WS(',', sp.post_id, sp.user_id, p.message, f.feeling_type_id, f.feeling_type, l.location_id, l.city, l.country, p.created_at, p.updated_at, sp.is_deleted) Like '%${search}%'`
            : ''
        } ${filter && search && ' AND '}${
    Array.isArray(filter) ? filterQueryHandler(filter) : filter
  }
        ORDER BY ${sortColumn} ${direction} 
        LIMIT ? OFFSET ?
        `;

  const savedPosts = (await db.query(sql, [+userId, +pageSize, +offset])) as PostTypeImagesAsJson[];

  return savedPosts.map((post) => {
    return {
      ...post,
      images: JSON.parse(post.images)
    };
  });
};

const getSavedPost = async (userId: number, postId: number) => {
  const sql = `
    SELECT 
      sp.post_id as postId,
      sp.user_id as userId,
      sp.date_created as dateCreated,
      sp.is_deleted as isDeleted,
      sp.collection_id as collectionId,
      col.collection,
      p.user_id as authorId,
      u.first_name as userFirstName,
      u.last_name as userLastName,
      u.avatar as userAvatar,
      p.shared_post_id as sharedPostId,
      p.message,
      p.feeling_type_id as feelingTypeId,
      f.feeling_type as feelingType,
      p.location_id as locationId,
      l.city,
      l.country,
      i.images,
      p.created_at as createdAt,
      p.updated_at as updatedAt,
      COUNT(*) OVER () AS totalDBItems
    FROM saved_posts sp
    LEFT JOIN (SELECT post_id, user_id, shared_post_id, message, created_at, updated_at, location_id, feeling_type_id
        FROM posts
        GROUP BY post_id) as p USING (post_id)
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
    LEFT JOIN (SELECT collection_id, collection
        FROM saved_posts_collections
        GROUP BY collection_id) as col USING (collection_id)
    LEFT JOIN (SELECT feeling_type_id, feeling_type
        FROM feeling_types
        GROUP BY feeling_type_id) as f USING (feeling_type_id)
    LEFT JOIN (SELECT user_id, first_name, last_name, avatar
        FROM users
        GROUP BY user_id) as u ON p.user_id = u.user_id
    WHERE sp.post_id = ? AND sp.user_id = ?
  `;

  const result = await db.query(sql, [+postId, +userId]);
  return result[0];
};

const getAllSavedPostsByCollectionId = async (userId: number, collectionId: number) => {
  const sql = `
  SELECT 
      post_id as postId,
      user_id as userId,
      date_created as dateCreated,
      collection_id as collectionId,
      is_deleted as isDeleted

    FROM saved_posts
    WHERE user_id = ? AND collection_id = ? AND is_deleted = 0 
        `;

  return await db.query(sql, [+userId, +collectionId]);
};

const addSavedPost = async (postId: number, userId: number, collectionId: number) => {
  const sql = `
    INSERT INTO saved_posts (
      post_id,
      user_id,
      collection_id
    )
    VALUES (?, ?, ?)
  `;
  await db.query(sql, [+postId, +userId, +collectionId || null]);

  return getSavedPost(+userId, +postId);
};
const updateSavedPost = async (postId: number, userId: number, collectionId: number) => {
  const sql = `
        UPDATE saved_posts 
        SET collection_id = ?
        WHERE post_id = ? AND user_id = ?
    `;

  await db.query(sql, [+collectionId, +postId, +userId]);

  return getSavedPost(+userId, +postId);
};

const removeSavedPost = async (postId: number, userId: number) => {
  const sql = `
        UPDATE saved_posts 
        SET is_deleted = true
        WHERE post_id = ? AND user_id = ?
    `;

  return db.query(sql, [+postId, +userId]);
};

const restoreSavedPost = async (postId: number, userId: number) => {
  const sql = `
        UPDATE saved_posts 
        SET is_deleted = false
        WHERE post_id = ? AND user_id = ?
    `;

  return db.query(sql, [+postId, +userId]);
};

const getAllUserCollections = async (
  userId: number,
  search: string,
  filter: string | string[],
  sort: string,
  pageSize: number,
  page: number
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = ['collection', 'userId', 'collectionId'].includes(sortArr[0])
    ? sortArr[0]
    : 'collection';

  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
    SELECT 
      collection_id as collectionId,
      user_id as userId,
      collection,
      is_deleted as isDeleted
    FROM saved_posts_collections 
    WHERE user_id = ? AND is_deleted = 0 ${filter || search ? 'AND' : ''}
        ${search ? `CONCAT_WS(',',  user_id, collection) Like '%${search}%'` : ''} ${
    filter && search && ' AND '
  }${Array.isArray(filter) ? filterQueryHandler(filter) : filter}
        ORDER BY ${sortColumn} ${direction} 
        LIMIT ? OFFSET ?
        `;

  return await db.query(sql, [+userId, +pageSize, +offset]);
};

const getCollection = async (collection: string, userId: number) => {
  const sql = `
    SELECT 
      collection_id as collectionId,
      user_id as userId,
      collection,
      is_deleted as isDeleted

    FROM saved_posts_collections 
    WHERE user_id = ? AND collection = ? 
  `;

  const result = await db.query(sql, [+userId, collection]);
  return result[0];
};

const getCollectionById = async (collectionId: number) => {
  const sql = `
    SELECT 
      collection_id as collectionId,
      user_id as userId,
      collection,
      is_deleted as isDeleted

    FROM saved_posts_collections 
    WHERE collection_id = ? 
  `;

  const result = await db.query(sql, [+collectionId]);
  return result[0];
};

const addCollection = async (collection: string, userId: number) => {
  const sql = `
    INSERT INTO saved_posts_collections  (
      user_id,
      collection
    )
    VALUES (?, ?)
  `;
  await db.query(sql, [+userId, collection]);

  return getCollection(collection, +userId);
};

const updateCollection = async (collectionId: number, collection: string) => {

  const sql = `
        UPDATE saved_posts_collections 
        SET collection = ?
        WHERE collection_id = ? 
    `;

  await db.query(sql, [collection, +collectionId]);

  return getCollectionById(+collectionId);
};

const removeCollection = async (collectionId: number) => {
  const sql = `
        UPDATE saved_posts_collections 
        SET is_deleted = true
        WHERE collection_id = ? 
    `;

  await db.query(sql, [+collectionId]);

  return getCollectionById(+collectionId);
};

export default {
  getAllMySavedPosts,
  getSavedPost,
  getAllSavedPostsByCollectionId,
  addSavedPost,
  updateSavedPost,
  removeSavedPost,
  restoreSavedPost,
  getAllUserCollections,
  getCollection,
  getCollectionById,
  addCollection,
  updateCollection,
  removeCollection
};
