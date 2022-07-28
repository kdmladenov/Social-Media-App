import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import RolesType from '../models/RolesType.js';

const getAllPostImageComments = async (
  postId: number,
  imageId: number,
  search: string,
  sort: string,
  page: number,
  pageSize: number
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'desc';
  const sortColumn = ['createdAt', 'commentId', 'authorFirstName', 'authorLastName'].includes(
    sortArr[0]
  )
    ? sortArr[0]
    : 'createdAt';
  const offset = (page - 1) * pageSize;

  const sql = `
  SELECT   
    c.post_image_comment_id as postImageCommentId,
    c.post_id as postId,
    c.image_id as imageId,
    c.reply_to as replyTo,
    c.author_id as authorId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    u.avatar as authorAvatar,
    c.content as content,
    c.created_at as createdAt,
    c.updated_at as updatedAt,
    c.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM post_images_comments c
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u ON u.user_id = c.author_id
    WHERE c.is_deleted = 0 AND c.post_id = ?  AND c.image_id = ? ${
      search ? `AND CONCAT_WS(',', c.content, u.first_name, u.last_name) Like '%${search}%'` : ''
    }
    ORDER BY ${sortColumn} ${direction}
    LIMIT ? OFFSET ?
    `;
  return db.query(sql, [+postId, +imageId, +pageSize, +offset]);
};

const getPostImageCommentBy = async (column: string, value: string | number) => {
  const sql = `
    SELECT   
    c.post_image_comment_id as postImageCommentId,
    c.post_id as postId,
    c.image_id as imageId,
    c.reply_to as replyTo,
    c.author_id as authorId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    u.avatar as authorAvatar,
    c.content as content,
    c.created_at as createdAt,
    c.updated_at as updatedAt,
    c.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM post_images_comments c
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u ON u.user_id = c.author_id
  WHERE ${column} = ? AND c.is_deleted = 0
  `;
  const result = await db.query(sql, [value]);

  return result[0];
};

const createPostImageComment = async (
  content: string,
  authorId: number,
  postId: number,
  imageId: number,
  replyTo: number | null
) => {
  const sql = `
    INSERT INTO post_images_comments (
      content,
      author_id,
      post_id,
      image_id,
      reply_to
    )
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [content, +authorId, +postId, +imageId, replyTo || null]);

  return getPostImageCommentBy('post_image_comment_id', +result.insertId);
};

const updatePostImageComment = async (
  content: string,
  postImageCommentId: number,
  authorId: number,
  role: RolesType
) => {
  const sql = `
    UPDATE post_images_comments SET
      content = ?,
      updated_at = CURRENT_TIMESTAMP()
    WHERE post_image_comment_id = ? ${role === rolesEnum.basic ? 'AND author_id = ?' : ''}
  `;
  return db.query(sql, [content, postImageCommentId, authorId]);
};

const removePostImageComment = async (commentId: number, authorId: number, role: RolesType) => {
  const sql = `
    UPDATE post_images_comments
    SET is_deleted = true
    WHERE post_image_comment_id = ? ${role === rolesEnum.basic ? 'AND author_id = ?' : ''}
  `;
  return db.query(sql, [commentId, authorId]);
};

export default {
  getAllPostImageComments,
  getPostImageCommentBy,
  createPostImageComment,
  updatePostImageComment,
  removePostImageComment
};
