import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import RolesType from '../models/RolesType.js';

const getAll = async (
  postId: number,
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
    c.comment_id as commentId,
    c.post_id as postId,
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
    FROM comments c
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u ON u.user_id = c.author_id
    WHERE c.is_deleted = 0 AND c.post_id = ?  ${
      search ? `AND CONCAT_WS(',', c.content, u.first_name, u.last_name) Like '%${search}%'` : ''
    }
    ORDER BY ${sortColumn} ${direction}
    LIMIT ? OFFSET ?
    `;
  return db.query(sql, [+postId, +pageSize, +offset]);
};

const getBy = async (column: string, value: string | number) => {
  const sql = `
    SELECT   
    c.comment_id as commentId,
    c.post_id as postId,
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
    FROM comments c
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u ON u.user_id = c.author_id
  WHERE ${column} = ? AND c.is_deleted = 0
  `;
  const result = await db.query(sql, [value]);

  return result[0];
};

const create = async (content: string, authorId: number, postId: number, replyTo: number | null) => {
  const sql = `
    INSERT INTO comments (
      content,
      author_id,
      post_id,
      reply_to
    )
    VALUES (?, ?, ?, ?)
  `;
  const result = await db.query(sql, [content, +authorId, +postId, replyTo || null]);

  return getBy('comment_id', +result.insertId);
};

const update = async (content: string, commentId: number, authorId: number, role: RolesType) => {
  const sql = `
    UPDATE comments SET
      content = ?,
      updated_at = CURRENT_TIMESTAMP()
    WHERE comment_id = ? ${role === rolesEnum.basic ? 'AND author_id = ?' : ''}
  `;
  return db.query(sql, [content, commentId, authorId]);
};

const remove = async (commentId: number, authorId: number, role: RolesType) => {
  const sql = `
    UPDATE comments
    SET is_deleted = true
    WHERE comment_id = ? ${role === rolesEnum.basic ? 'AND author_id = ?' : ''}
  `;
  return db.query(sql, [commentId, authorId]);
};

// comments Votes(Likes)

const getVoteBy = async (column: string, value: string | number, userId: number) => {
  const sql = `
  SELECT 
    ql.user_id as userId,
    u.first_name as firstName,
    u.last_name as lastName,
    q.comment_id as commentId,
    ra.reaction_id as reactionId,
    ra.reaction_name as reactionName
  FROM comments_likes ql
  LEFT JOIN users u USING(user_id)
  LEFT JOIN reactions ra USING(reaction_id)
  LEFT JOIN comments q USING(comment_id)
  WHERE ${column} = ? AND ql.is_deleted = 0 AND ql.user_id = ?
  `;

  const result = await db.query(sql, [value, userId]);

  return result[0];
};

const createVote = async (reactionName: string, commentId: number, userId: number) => {
  const sql = `
    INSERT INTO comments_likes (
      reaction_id,
      comment_id,
      user_id
    )
    VALUES ((SELECT reaction_id FROM reactions WHERE reaction_name = ?), ?, ?)
  `;

  await db.query(sql, [reactionName, commentId, userId]);

  return getVoteBy('comment_id', commentId, userId);
};

const updateVote = async (reactionName: string, commentId: number, userId: number) => {
  const sql = `
        UPDATE comments_likes 
        SET reaction_id  = (SELECT reaction_id FROM reactions WHERE reaction_name = ?)
        WHERE comment_id = ? AND user_id = ?
    `;

  await db.query(sql, [reactionName, commentId, userId]);

  return getVoteBy('comment_id', commentId, userId);
};

const removeVote = async (commentId: number, userId: number) => {
  const sql = `
        UPDATE comments_likes 
        SET is_deleted  = 1
        WHERE comment_id = ? AND user_id = ?
    `;

  db.query(sql, [+commentId, +userId]);

  return;
};

export default {
  getAll,
  getBy,
  create,
  update,
  remove,
  getVoteBy,
  createVote,
  updateVote,
  removeVote
};
