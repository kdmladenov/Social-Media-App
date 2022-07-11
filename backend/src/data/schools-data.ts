import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import SchoolType from '../models/SchoolType.js';
import filterQueryHandler from '../helpers/filterQueryHandler.js';
import RolesType from '../models/RolesType.js';

const getAllMySchools = async (userId: number) => {
  const sql = `
  SELECT 
    s.school_id as schoolId,
    s.user_id as userId,
    s.school_name as schoolName,
    s.school_type_id as schoolTypeId,
    st.school_type as schoolType,
    s.degree,
    s.city_id as cityId,
    l.city,
    l.country,
    s.start_year as startYear,
    s.end_year as endYear,
    s.is_deleted as isDeleted
  FROM schools s
  LEFT JOIN (SELECT school_type_id, school_type
      FROM school_types
      GROUP BY school_type_id) as st using (school_type_id)
  LEFT JOIN (SELECT location_id, city, country
      FROM locations
      GROUP BY location_id) as l ON s.city_id = l.location_id
  WHERE s.user_id = ? AND s.is_deleted = 0 
        `;
  return db.query(sql, [+userId]);
};

const getBy = async (column: string, value: string | number, role: RolesType = 'basic') => {
  const sql = `
    SELECT 
      s.school_id as schoolId,
      s.user_id as userId,
      s.school_name as schoolName,
      s.school_type_id as schoolTypeId,
      st.school_type as schoolType,
      s.degree,
      s.city_id as cityId,
      l.city,
      l.country,
      s.start_year as startYear,
      s.end_year as endYear,
      s.is_deleted as isDeleted
    FROM schools s
    LEFT JOIN (SELECT school_type_id, school_type
        FROM school_types
        GROUP BY school_type_id) as st using (school_type_id)
    LEFT JOIN (SELECT location_id, city, country
        FROM locations
        GROUP BY location_id) as l ON s.city_id = l.location_id
    WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND s.is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const create = async (school: SchoolType) => {
  const sql = `
    INSERT INTO schools (
      user_id,
      school_name,
      school_type_id,
      degree,
      city_id,
      start_year,
      end_year
    )
    VALUES (?, ?, (SELECT school_type_id from school_types WHERE school_type = ?), ?, (SELECT location_id from locations WHERE city = ?), ?, ?)
  `;
  const result = await db.query(sql, [
    +school.userId,
    school.schoolName,
    school.schoolType,
    school.degree || null,
    school.city || null,
    +school.startYear || null,
    +school.endYear || null
  ]);

  return getBy('school_id', +result.insertId);
};

const update = async (updatedSchool: SchoolType) => {
  const sql = `
        UPDATE schools
        SET
        user_id = ?,
        school_name = ?,
        school_type_id = (SELECT school_type_id from school_types WHERE school_type = ?),
        degree = ?,
        city_id = (SELECT location_id from locations WHERE city = ?),
        start_year = ?,
        end_year = ?
        WHERE school_id = ?
    `;

  await db.query(sql, [
    +updatedSchool.userId || null,
    updatedSchool.schoolName || null,
    updatedSchool.schoolType || null,
    updatedSchool.degree || null,
    updatedSchool.city || null,
    +updatedSchool.startYear || null,
    +updatedSchool.endYear || null,
    +updatedSchool.schoolId
  ]);

  return getBy('school_id', updatedSchool.schoolId);
};

const remove = async (schoolToDelete: SchoolType) => {
  const sql = `
        UPDATE schools 
        SET is_deleted = true
        WHERE school_id = ?
    `;

  return db.query(sql, [schoolToDelete.schoolId]);
};

export default {
  getAllMySchools,
  getBy,
  create,
  update,
  remove
};
