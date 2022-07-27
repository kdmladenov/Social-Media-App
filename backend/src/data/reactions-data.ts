import db from './pool.js';

const getAllPostReactions = async (postId: number) => {
  const sql = `
  SELECT   
    rp.reaction_id as reactionId,
    rp.post_id as postId,
    rp.user_id as userId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    rp.reaction_type_id as reactionTypeId,
    rt.reaction_name as reactionName,
    rt.reaction_code as reactionCode,
    rp.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM reactions_posts rp
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u USING (user_id)
    LEFT JOIN (SELECT *
          FROM reaction_types
          GROUP BY reaction_type_id) as rt USING (reaction_type_id)
    WHERE rp.is_deleted = 0 AND rp.post_id = ?  
    `;
  return db.query(sql, [+postId]);
};

const getPostReactionBy = async (column: string, value: string | number, userId?: number) => {
  const sql = `
    SELECT   
    rp.reaction_id as reactionId,
    rp.post_id as postId,
    rp.user_id as userId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    rp.reaction_type_id as reactionTypeId,
    rt.reaction_name as reactionName,
    rt.reaction_code as reactionCode,
    rp.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM reactions_posts rp
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u USING (user_id)
    LEFT JOIN (SELECT *
          FROM reaction_types
          GROUP BY reaction_type_id) as rt USING (reaction_type_id)
  WHERE ${column} = ? ${userId ? 'AND rp.user_id = ?' : ''} AND rp.is_deleted = 0
  `;
  const result = await db.query(sql, [value, userId || null]);

  return result[0];
};

const createPostReaction = async (userId: number, postId: number, reactionName: string) => {
  const sql = `
    INSERT INTO reactions_posts (
      user_id,
      post_id,
      reaction_type_id
    )
    VALUES (?, ?, (SELECT reaction_type_id from reaction_types WHERE reaction_name = ?))
  `;
  const result = await db.query(sql, [+userId, +postId, reactionName]);

  return getPostReactionBy('reaction_id', +result.insertId);
};

const updatePostReaction = async (reactionName: string, reactionId: number) => {
  const sql = `
    UPDATE reactions_posts SET
      reaction_type_id = (SELECT reaction_type_id from reaction_types WHERE reaction_name = ?)
    WHERE reaction_id = ?
  `;
  await db.query(sql, [reactionName, +reactionId]);

  return getPostReactionBy('reaction_id', +reactionId);
};

const deletePostReaction = async (reactionId: number) => {
  const sql = `
    UPDATE reactions_posts SET
      is_deleted = 1
    WHERE reaction_id = ?
  `;
  return await db.query(sql, [+reactionId]);
};

const getAllCommentReactions = async (commentId: number) => {
  const sql = `
  SELECT   
    rc.reaction_id as reactionId,
    rc.comment_id as commentId,
    rc.user_id as userId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    rc.reaction_type_id as reactionTypeId,
    rt.reaction_name as reactionName,
    rt.reaction_code as reactionCode,
    rc.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM reactions_comments rc
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u USING (user_id)
    LEFT JOIN (SELECT *
          FROM reaction_types
          GROUP BY reaction_type_id) as rt USING (reaction_type_id)
    WHERE rc.is_deleted = 0 AND rc.comment_id = ?  
    `;
  return db.query(sql, [+commentId]);
};

const getCommentReactionBy = async (column: string, value: string | number, userId?: number) => {
  const sql = `
    SELECT   
    rc.reaction_id as reactionId,
    rc.comment_id as commentId,
    rc.user_id as userId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    rc.reaction_type_id as reactionTypeId,
    rt.reaction_name as reactionName,
    rt.reaction_code as reactionCode,
    rc.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM reactions_comments rc
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u USING (user_id)
    LEFT JOIN (SELECT *
          FROM reaction_types
          GROUP BY reaction_type_id) as rt USING (reaction_type_id)
  WHERE ${column} = ? ${userId ? 'AND rc.user_id = ?' : ''} AND rc.is_deleted = 0
  `;
  const result = await db.query(sql, [value, userId || null]);

  return result[0];
};

const createCommentReaction = async (userId: number, commentId: number, reactionName: string) => {
  const sql = `
    INSERT INTO reactions_comments (
      user_id,
      comment_id,
      reaction_type_id
    )
    VALUES (?, ?, (SELECT reaction_type_id from reaction_types WHERE reaction_name = ?))
  `;
  const result = await db.query(sql, [+userId, +commentId, reactionName]);

  return getCommentReactionBy('reaction_id', +result.insertId);
};

const updateCommentReaction = async (reactionName: string, reactionId: number) => {
  const sql = `
    UPDATE reactions_comments SET
      reaction_type_id = (SELECT reaction_type_id from reaction_types WHERE reaction_name = ?)
    WHERE reaction_id = ?
  `;
  await db.query(sql, [reactionName, +reactionId]);

  return getCommentReactionBy('reaction_id', +reactionId);
};

const deleteCommentReaction = async (reactionId: number) => {
  const sql = `
    UPDATE reactions_comments SET
      is_deleted = 1
    WHERE reaction_id = ?
  `;
  return await db.query(sql, [+reactionId]);
};

export default {
  getAllPostReactions,
  getPostReactionBy,
  createPostReaction,
  updatePostReaction,
  deletePostReaction,
  getAllCommentReactions,
  getCommentReactionBy,
  createCommentReaction,
  updateCommentReaction,
  deleteCommentReaction
};
