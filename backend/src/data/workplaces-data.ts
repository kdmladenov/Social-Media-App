import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import WorkplaceType from '../models/WorkplaceType.js';
import filterQueryHandler from '../helpers/filterQueryHandler.js';
import RolesType from '../models/RolesType.js';

const getAllMyWorkplaces = async (userId: number) => {
  const sql = `
  SELECT 
    w.workplace_id as workplaceId,
    w.user_id as userId,
    w.company_name as companyName,
    w.position,
    w.city_id as cityId,
    l.city,
    l.country,
    w.start_date as startDate,
    w.end_date as endDate,
    w.is_deleted as isDeleted
  FROM workplaces w
  LEFT JOIN (SELECT location_id, city, country
      FROM locations
      GROUP BY location_id) as l ON w.city_id = l.location_id
  WHERE w.user_id = ? AND w.is_deleted = 0 
        `;
  return db.query(sql, [+userId]);
};

const getBy = async (column: string, value: string | number, role: RolesType = 'basic') => {
  const sql = `
   SELECT 
      w.workplace_id as workplaceId,
      w.user_id as userId,
      w.company_name as companyName,
      w.position,
      w.city_id as cityId,
      l.city,
      l.country,
      w.start_date as startDate,
      w.end_date as endDate,
      w.is_deleted as isDeleted
    FROM workplaces w
    LEFT JOIN (SELECT location_id, city, country
        FROM locations
        GROUP BY location_id) as l ON w.city_id = l.location_id
    WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND w.is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const create = async (workplace: WorkplaceType) => {
  const sql = `
    INSERT INTO workplaces (
      user_id,
      company_name,
      position,
      city_id,
      start_date,
      end_date
    )
    VALUES (?, ?, ?, (SELECT location_id from locations WHERE city = ?), ?, ?)
  `;
  const result = await db.query(sql, [
    +workplace.userId,
    workplace.companyName,
    workplace.position || null,
    workplace.city || null,
    new Date(workplace.startDate) || null,
    new Date(workplace.endDate) || null
  ]);

  return getBy('workplace_id', +result.insertId);
};

const update = async (updatedWorkplace: WorkplaceType) => {
  const sql = `
        UPDATE workplaces
        SET
        user_id = ?,
        company_name = ?,
        position = ?,
        city_id = (SELECT location_id from locations WHERE city = ?),
        start_date = ?,
        end_date = ?
        WHERE workplace_id = ?
    `;

  await db.query(sql, [
    +updatedWorkplace.userId || null,
    updatedWorkplace.companyName || null,
    updatedWorkplace.position || null,
    updatedWorkplace.city || null,
    new Date(updatedWorkplace.startDate) || null,
    new Date(updatedWorkplace.endDate) || null,
    +updatedWorkplace.workplaceId
  ]);

  return getBy('workplace_id', updatedWorkplace.workplaceId);
};

const remove = async (workplaceToDelete: WorkplaceType) => {
  const sql = `
        UPDATE workplaces 
        SET is_deleted = true
        WHERE workplace_id = ?
    `;

  return db.query(sql, [workplaceToDelete.workplaceId]);
};

export default {
  getAllMyWorkplaces,
  getBy,
  create,
  update,
  remove
};
