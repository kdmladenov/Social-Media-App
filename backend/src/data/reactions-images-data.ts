import db from './pool.js';

const getAllPostImageReactions = async (postId: number, imageId: number) => {
  const sql = `
  SELECT   
    rpi.reaction_post_image_id as reactionPostImageId,
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
    rpi.reaction_post_image_id as reactionPostImageId,
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
  WHERE rpi.post_id = ? AND rpi.image_id = ? ${userId ? 'AND rpi.user_id = ?' : ''} AND rpi.is_deleted = 0
  `;
  const result = await db.query(sql, [+postId, +imageId, userId || null]);

  return result[0];
};


const getPostImageReactionBy = async (column: string, value: string | number, userId?: number) => {
  const sql = `
    SELECT   
    rpi.reaction_post_image_id as reactionPostImageId,
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

const updatePostImageReaction = async (reactionName: string, reactionPostImageId: number) => {
  const sql = `
    UPDATE reactions_post_images SET
      reaction_type_id = (SELECT reaction_type_id from reaction_types WHERE reaction_name = ?)
    WHERE reaction_post_image_id = ?
  `;
  await db.query(sql, [reactionName, +reactionPostImageId]);

  return getPostImageReactionBy('reaction_post_image_id', +reactionPostImageId);
};

const deletePostImageReaction = async (reactionPostImageId: number) => {
  const sql = `
    UPDATE reactions_post_images SET
      is_deleted = 1
    WHERE reaction_post_image_id = ?
  `;
  return await db.query(sql, [+reactionPostImageId]);
};

// const getAllCommentReactions = async (commentId: number) => {
//   const sql = `
//   SELECT   
//     rc.reaction_id as reactionId,
//     rc.comment_id as commentId,
//     rc.user_id as userId,
//     u.first_name as authorFirstName,
//     u.last_name as authorLastName,
//     rc.reaction_type_id as reactionTypeId,
//     rt.reaction_name as reactionName,
//     rt.reaction_code as reactionCode,
//     rc.is_deleted as isDeleted,
//     COUNT(*) OVER () AS totalDBItems
//     FROM reactions_comments rc
//     LEFT JOIN (SELECT *
//           FROM users
//           GROUP BY user_id) as u USING (user_id)
//     LEFT JOIN (SELECT *
//           FROM reaction_types
//           GROUP BY reaction_type_id) as rt USING (reaction_type_id)
//     WHERE rc.is_deleted = 0 AND rc.comment_id = ?  
//     `;
//   return db.query(sql, [+commentId]);
// };

// const getCommentReactionBy = async (column: string, value: string | number, userId?: number) => {
//   const sql = `
//     SELECT   
//     rc.reaction_id as reactionId,
//     rc.comment_id as commentId,
//     rc.user_id as userId,
//     u.first_name as authorFirstName,
//     u.last_name as authorLastName,
//     rc.reaction_type_id as reactionTypeId,
//     rt.reaction_name as reactionName,
//     rt.reaction_code as reactionCode,
//     rc.is_deleted as isDeleted,
//     COUNT(*) OVER () AS totalDBItems
//     FROM reactions_comments rc
//     LEFT JOIN (SELECT *
//           FROM users
//           GROUP BY user_id) as u USING (user_id)
//     LEFT JOIN (SELECT *
//           FROM reaction_types
//           GROUP BY reaction_type_id) as rt USING (reaction_type_id)
//   WHERE ${column} = ? ${userId ? 'AND rc.user_id = ?' : ''} AND rc.is_deleted = 0
//   `;
//   const result = await db.query(sql, [value, userId || null]);

//   return result[0];
// };

// const createCommentReaction = async (userId: number, commentId: number, reactionName: string) => {
//   const sql = `
//     INSERT INTO reactions_comments (
//       user_id,
//       comment_id,
//       reaction_type_id
//     )
//     VALUES (?, ?, (SELECT reaction_type_id from reaction_types WHERE reaction_name = ?))
//   `;
//   const result = await db.query(sql, [+userId, +commentId, reactionName]);

//   return getCommentReactionBy('reaction_id', +result.insertId);
// };

// const updateCommentReaction = async (reactionName: string, reactionId: number) => {
//   const sql = `
//     UPDATE reactions_comments SET
//       reaction_type_id = (SELECT reaction_type_id from reaction_types WHERE reaction_name = ?)
//     WHERE reaction_id = ?
//   `;
//   await db.query(sql, [reactionName, +reactionId]);

//   return getCommentReactionBy('reaction_id', +reactionId);
// };

// const deleteCommentReaction = async (reactionId: number) => {
//   const sql = `
//     UPDATE reactions_comments SET
//       is_deleted = 1
//     WHERE reaction_id = ?
//   `;
//   return await db.query(sql, [+reactionId]);
// };

export default {
  getAllPostImageReactions,
  getPostImageReaction,
  getPostImageReactionBy,
  createPostImageReaction,
  updatePostImageReaction,
  deletePostImageReaction
  // getAllCommentReactions,
  // getCommentReactionBy,
  // createCommentReaction,
  // updateCommentReaction,
  // deleteCommentReaction
};
