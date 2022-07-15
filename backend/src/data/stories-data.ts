import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import filterQueryHandler from '../helpers/filterQueryHandler.js';
import RolesType from '../models/RolesType.js';
import StoryType from '../models/StoryType.js';

const getAllMyStories = async (
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
    'storyId',
    'userId',
    'feelingType',
    'city',
    'country',
    'createdAt',
    'updatedAt'
  ].includes(sortArr[0])
    ? sortArr[0]
    : 'storyId';

  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
  SELECT 
      s.story_id as storyId,
      s.user_id as userId,
      u.first_name as userFirstName,
      u.last_name as userLastName,
      u.avatar as userAvatar,
      s.message,
      s.image,
      f.feeling_type_id as feelingTypeId,
      f.feeling_type as feelingType,
      l.location_id as locationId,
      l.city,
      l.country,
      s.created_at as createdAt,
      s.updated_at as updatedAt,
      s.is_deleted as isDeleted,
      COUNT(*) OVER () AS totalDBItems
    FROM stories s
    LEFT JOIN (SELECT location_id, city, country
        FROM locations
        GROUP BY location_id) as l using (location_id)
    LEFT JOIN (SELECT feeling_type_id, feeling_type
        FROM feeling_types
        GROUP BY feeling_type_id) as f using (feeling_type_id)
    LEFT JOIN (SELECT user_id, first_name, last_name, avatar
        FROM users
        GROUP BY user_id) as u using (user_id)
    WHERE s.user_id = ? AND s.is_deleted = 0 ${filter || search ? 'AND' : ''}
        ${
          search
            ? `CONCAT_WS(',', s.story_id, s.user_id, s.message, s.image, f.feeling_type_id, f.feeling_type, l.location_id, l.city, l.country, s.created_at, s.updated_at, s.is_deleted) Like '%${search}%'`
            : ''
        } ${filter && search && ' AND '}${
    Array.isArray(filter) ? filterQueryHandler(filter) : filter
  }
        ORDER BY ${sortColumn} ${direction} 
        LIMIT ? OFFSET ?
        `;

  return db.query(sql, [+userId, + pageSize, +offset]);
};

const getBy = async (column: string, value: string | number, role: RolesType = 'basic') => {
  const sql = `
    SELECT 
      s.story_id as storyId,
      s.user_id as userId,
      u.first_name as userFirstName,
      u.last_name as userLastName,
      u.avatar as userAvatar,
      s.message,
      s.image,
      f.feeling_type_id as feelingTypeId,
      f.feeling_type as feelingType,
      l.location_id as locationId,
      l.city,
      l.country,
      s.created_at as createdAt,
      s.updated_at as updatedAt,
      s.is_deleted as isDeleted
    FROM stories s
    LEFT JOIN (SELECT location_id, city, country
        FROM locations
        GROUP BY location_id) as l using (location_id)
    LEFT JOIN (SELECT feeling_type_id, feeling_type
        FROM feeling_types
        GROUP BY feeling_type_id) as f using (feeling_type_id)
    LEFT JOIN (SELECT user_id, first_name, last_name, avatar
        FROM users
        GROUP BY user_id) as u using (user_id)
    WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND s.is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const create = async (story: StoryType) => {
  const sql = `
    INSERT INTO stories (
      user_id,
      message,
      image,
      feeling_type_id,
      location_id
    )
    VALUES (?, ?, ?, (SELECT feeling_type_id from feeling_types WHERE feeling_type = ?), (SELECT location_id from locations WHERE city = ?))
  `;
  const result = await db.query(sql, [
    +story.userId,
    story.message || null,
    story.image || 'storage/images/defaultImage.png',
    story.feelingType || null,
    story.city || null
  ]);

  return getBy('story_id', +result.insertId);
};

const update = async (updatedStory: StoryType) => {
  const sql = `
        UPDATE stories
        SET
        user_id = ?,
        message = ?,
        image = ?,
        feeling_type_id = (SELECT feeling_type_id from feeling_types WHERE feeling_type = ?),
        location_id = (SELECT location_id from locations WHERE city = ?)
        WHERE story_id = ?
    `; 

  await db.query(sql, [
    +updatedStory.userId || null,
    updatedStory.message || null,
    updatedStory.image || 'storage/images/defaultImage.png',
    updatedStory.feelingType || null,
    updatedStory.city || null,
    +updatedStory.storyId
  ]);

  return getBy('story_id', updatedStory.storyId);
};

const remove = async (storyToDelete: StoryType) => {
  const sql = `
        UPDATE stories 
        SET is_deleted = true
        WHERE story_id = ?
    `;

  return db.query(sql, [storyToDelete.storyId]);
};

export default {
  getAllMyStories,
  getBy,
  create,
  update,
  remove
};
