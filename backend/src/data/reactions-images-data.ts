import db from './pool.js';

const getAllPostImageReactions = async (postId: number, imageId: number) => {
  const sql = `
  SELECT   
    rpi.reaction_post_image_id as reactionId,
    rpi.post_id as postId,
    rpi.image_id as imageId,
    rpi.user_id as userId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    rpi.reaction_type_id as reactionTypeId,
    rt.reaction_name as reactionName,
    rt.reaction_code as reactionCode,
    rpi.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM reactions_post_images rpi

    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u USING (user_id)
    LEFT JOIN (SELECT *
          FROM reaction_types
          GROUP BY reaction_type_id) as rt USING (reaction_type_id)
    WHERE rpi.is_deleted = 0 AND rpi.post_id = ?  AND rpi.image_id = ?  
    `;
  return db.query(sql, [+postId, +imageId]);
};

const getPostImageReaction = async (postId: number, imageId: number, userId?: number) => {
  const sql = `
    SELECT   
    rpi.reaction_post_image_id as reactionId,
    rpi.post_id as postId,
    rpi.image_id as imageId,
    rpi.user_id as userId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    rpi.reaction_type_id as reactionTypeId,
    rt.reaction_name as reactionName,
    rt.reaction_code as reactionCode,
    rpi.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM reactions_post_images rpi
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u USING (user_id)
    LEFT JOIN (SELECT *
          FROM reaction_types
          GROUP BY reaction_type_id) as rt USING (reaction_type_id)
  WHERE rpi.post_id = ? AND rpi.image_id = ? ${
    userId ? 'AND rpi.user_id = ?' : ''
  } AND rpi.is_deleted = 0
  `;
  const result = await db.query(sql, [+postId, +imageId, userId || null]);

  return result[0];
};

const getPostImageReactionBy = async (column: string, value: string | number, userId?: number) => {
  const sql = `
    SELECT   
    rpi.reaction_post_image_id as reactionId,
    rpi.post_id as postId,
    rpi.image_id as imageId,
    rpi.user_id as userId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    rpi.reaction_type_id as reactionTypeId,
    rt.reaction_name as reactionName,
    rt.reaction_code as reactionCode,
    rpi.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM reactions_post_images rpi
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u USING (user_id)
    LEFT JOIN (SELECT *
          FROM reaction_types
          GROUP BY reaction_type_id) as rt USING (reaction_type_id)
  WHERE ${column} = ? ${userId ? 'AND rpi.user_id = ?' : ''} AND rpi.is_deleted = 0
  `;
  const result = await db.query(sql, [value, userId || null]);

  return result[0];
};

const createPostImageReaction = async (
  userId: number,
  postId: number,
  imageId: number,
  reactionName: string
) => {
  const sql = `
    INSERT INTO reactions_post_images (
      user_id,
      post_id,
      image_id,
      reaction_type_id
    )
    VALUES (?, ?, ?, (SELECT reaction_type_id from reaction_types WHERE reaction_name = ?))
  `;
  const result = await db.query(sql, [+userId, +postId, +imageId, reactionName]);

  return getPostImageReactionBy('reaction_post_image_id', +result.insertId);
};

const updatePostImageReaction = async (reactionName: string, reactionId: number) => {
  const sql = `
    UPDATE reactions_post_images SET
      reaction_type_id = (SELECT reaction_type_id from reaction_types WHERE reaction_name = ?)
    WHERE reaction_post_image_id = ?
  `;
  await db.query(sql, [reactionName, +reactionId]);

  return getPostImageReactionBy('reaction_post_image_id', +reactionId);
};

const deletePostImageReaction = async (reactionId: number) => {
  const sql = `
    UPDATE reactions_post_images SET
      is_deleted = 1
    WHERE reaction_post_image_id = ?
  `;
  return await db.query(sql, [+reactionId]);
};

const getAllPostImageCommentReactions = async (commentId: number) => {
  const sql = `
  SELECT   
    rpic.reaction_post_image_comment_id as reactionId,
    rpic.post_image_comment_id as commentId,
    rpic.user_id as userId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    rpic.reaction_type_id as reactionTypeId,
    rt.reaction_name as reactionName,
    rt.reaction_code as reactionCode,
    rpic.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM reactions_post_images_comments rpic

    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u USING (user_id)
    LEFT JOIN (SELECT *
          FROM reaction_types
          GROUP BY reaction_type_id) as rt USING (reaction_type_id)
    WHERE rpic.is_deleted = 0 AND rpic.post_image_comment_id = ?
    `;
  return db.query(sql, [+commentId]);
};

const getPostImageCommentReaction = async (commentId: number, userId?: number) => {
  const sql = `
    SELECT   
    rpic.reaction_post_image_comment_id as reactionId,
    rpic.post_image_comment_id as commentId,
    rpic.user_id as userId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    rpic.reaction_type_id as reactionTypeId,
    rt.reaction_name as reactionName,
    rt.reaction_code as reactionCode,
    rpic.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM reactions_post_images_comments rpic
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u USING (user_id)
    LEFT JOIN (SELECT *
          FROM reaction_types
          GROUP BY reaction_type_id) as rt USING (reaction_type_id)
  WHERE rpic.post_image_comment_id = ? ${
    userId ? 'AND rpic.user_id = ?' : ''
  } AND rpic.is_deleted = 0
  `;
  const result = await db.query(sql, [+commentId, userId || null]);

  return result[0];
};

const getPostImageCommentReactionBy = async (
  column: string,
  value: string | number,
  userId?: number
) => {
  const sql = `
    SELECT   
    rpic.reaction_post_image_comment_id as reactionId,
    rpic.post_image_comment_id as commentId,
    rpic.user_id as userId,
    u.first_name as authorFirstName,
    u.last_name as authorLastName,
    rpic.reaction_type_id as reactionTypeId,
    rt.reaction_name as reactionName,
    rt.reaction_code as reactionCode,
    rpic.is_deleted as isDeleted,
    COUNT(*) OVER () AS totalDBItems
    FROM reactions_post_images_comments rpic
    LEFT JOIN (SELECT *
          FROM users
          GROUP BY user_id) as u USING (user_id)
    LEFT JOIN (SELECT *
          FROM reaction_types
          GROUP BY reaction_type_id) as rt USING (reaction_type_id)
  WHERE ${column} = ? ${userId ? 'AND rpic.user_id = ?' : ''} AND rpic.is_deleted = 0
  `;
  const result = await db.query(sql, [value, userId || null]);

  return result[0];
};

const createPostImageCommentReaction = async (
  userId: number,
  commentId: number,
  reactionName: string
) => {
  const sql = `
    INSERT INTO reactions_post_images_comments (
      user_id,
      post_image_comment_id,
      reaction_type_id
    )
    VALUES (?, ?, (SELECT reaction_type_id from reaction_types WHERE reaction_name = ?))
  `;
  const result = await db.query(sql, [+userId, +commentId, reactionName]);

  return getPostImageCommentReactionBy('reaction_post_image_comment_id', +result.insertId);
};

const updatePostImageCommentReaction = async (reactionName: string, commentId: number) => {
  const sql = `
    UPDATE reactions_post_images_comments SET
      reaction_type_id = (SELECT reaction_type_id from reaction_types WHERE reaction_name = ?)
    WHERE post_image_comment_id = ?
  `;
  await db.query(sql, [reactionName, +commentId]);

  return getPostImageCommentReactionBy('post_image_comment_id', +commentId);
};

const deletePostImageCommentReaction = async (reactionId: number) => {
  const sql = `
    UPDATE reactions_post_images_comments SET
      is_deleted = 1
    WHERE reaction_post_image_comment_id = ?
  `;
  return await db.query(sql, [+reactionId]);
};

export default {
  getAllPostImageReactions,
  getPostImageReaction,
  getPostImageReactionBy,
  createPostImageReaction,
  updatePostImageReaction,
  deletePostImageReaction,
  getAllPostImageCommentReactions,
  getPostImageCommentReaction,
  getPostImageCommentReactionBy,
  createPostImageCommentReaction,
  updatePostImageCommentReaction,
  deletePostImageCommentReaction
};
