import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import UserType from '../models/UserType.js';
import RolesType from '../models/RolesType.js';
import LocationType from '../models/LocationType.js';

const getBy = async (
  column: string,
  value: string | number,
  isProfileOwner: boolean = false,
  role: RolesType = rolesEnum.basic,
  isProfileOwnerFriend: boolean = false
) => {
  const sql = `
    SELECT 
      u.user_id as userId, 
      u.first_name as firstName,
      u.last_name as lastName,
      u.avatar,
      u.about_me
      ${
        role === 'admin' || isProfileOwner || isProfileOwnerFriend // TODO or friend
          ? `,u.email,
              u.phone,
              u.date_of_birth as dateOfBirth,
              u.home_city_id as homeCityId,
              hc.city as homeCity,
              hc.country as homeCountry,
              u.current_city_id as currentCityId,
              cc.city as currentCity,
              cc.country as currentCountry,
              rel.relationship_status as relationshipStatus,
              g.gender,
              u.date_registered as dateRegistered,
              u.is_deleted as isDeleted,
              u.role
            `
          : ''
      }
    FROM users u
    LEFT JOIN (SELECT location_id, city, country
      FROM locations
      GROUP BY location_id) as hc ON u.home_city_id = hc.location_id
    LEFT JOIN (SELECT location_id, city, country
      FROM locations
      GROUP BY location_id) as cc ON u.current_city_id = cc.location_id
    LEFT JOIN (SELECT relationship_status_id, relationship_status
      FROM relationship_statuses
      GROUP BY relationship_status_id) as rel using (relationship_status_id)
    LEFT JOIN (SELECT gender_id, gender
      FROM genders
      GROUP BY gender_id) as g using (gender_id)

    WHERE ${role === 'admin' ? `` : `is_deleted = 0 AND`} ${column} = ?
      `;

  const result = await db.query(sql, value);

  return result[0];
};

const getAll = async (
  search: string,
  sort: string,
  page: number,
  pageSize: number,
  role: RolesType = rolesEnum.basic
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = ['u.user_id', 'u.first_name', 'u.last_name', 'u.email'].includes(sortArr[0])
    ? sortArr[0]
    : 'u.user_id';

  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
    SELECT 
      u.user_id as userId, 
      u.first_name as firstName,
      u.last_name as lastName,
      u.avatar,
      u.about_me
      ${
        role === rolesEnum.admin
          ? `,u.email,
              u.phone,
              u.date_of_birth as dateOfBirth,
              u.home_city_id as homeCityId,
              hc.city as homeCity,
              hc.country as homeCountry,
              u.current_city_id as currentCityId,
              cc.city as currentCity,
              cc.country as currentCountry,
              rel.relationship_status as relationshipStatus,
              g.gender,
              u.date_registered as dateRegistered,
              u.is_deleted as isDeleted,
              u.role
            `
          : ''
      }
      ,COUNT(*) OVER () AS totalDBItems
    FROM users u
    LEFT JOIN (SELECT location_id, city, country
      FROM locations
      GROUP BY location_id) as hc ON u.home_city_id = hc.location_id
    LEFT JOIN (SELECT location_id, city, country
      FROM locations
      GROUP BY location_id) as cc ON u.current_city_id = cc.location_id
    LEFT JOIN (SELECT relationship_status_id, relationship_status
      FROM relationship_statuses
      GROUP BY relationship_status_id) as rel using (relationship_status_id)
    LEFT JOIN (SELECT gender_id, gender
      FROM genders
      GROUP BY gender_id) as g using (gender_id)

    WHERE ${role === rolesEnum.basic ? ' u.is_deleted = 0 AND ' : ''} ${
    search.length > 0
      ? `CONCAT_WS(',', u.user_id, u.first_name, u.last_name ${
          role === rolesEnum.admin && `, u.email`
        }
      )`
      : ' u.first_name '
  } Like '%${search}%'
    ORDER BY ${sortColumn} ${direction} 
    LIMIT ? OFFSET ?
    `;

  return db.query(sql, [+pageSize, +offset]);
};

const create = async (user: UserType) => {
  const sql = `
    INSERT INTO users (
      first_name,
      last_name,
      password, 
      email,
      avatar,
      phone,
      role
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const result = await db.query(sql, [
    user.firstName,
    user.lastName,
    user.password,
    user.email,
    user?.avatar || null,
    user?.phone || null,
    user?.role || rolesEnum.basic
  ]);

  return getBy('user_id', result.insertId, true, 'basic');
};

const updateUser = async (user: UserType) => {
  const sql = `
    UPDATE users SET
      first_name = ?,
      last_name = ?,
      email = ?,
      avatar = ?,
      phone = ?,
      date_of_birth = ?,
      role = ?,
      home_city_id = ?,
      current_city_id = ?,
      about_me = ?,
      relationship_status_id = (SELECT relationship_status_id from relationship_statuses WHERE relationship_status = ?),
      gender_id = (SELECT gender_id from genders WHERE gender = ?)
      WHERE user_id = ?
      `;

  return db.query(sql, [
    user.firstName || null,
    user.lastName || null,
    user.email || null,
    user.avatar || null,
    user.phone || null,
    user.dateOfBirth || null,
    user.role || null,
    +user.homeCityId || null,
    +user.currentCityId || null,
    user.aboutMe || null,
    user.relationshipStatus || null,
    user.gender || null,
    +user.userId
  ]);
};

const getLocation = async (city: string) => {
  const sql = `
    SELECT 
      location_id as locationId,
      city,
      country
    FROM locations
    WHERE city = ?
  `;
  const result = await db.query(sql, [city]);
  return result[0] as LocationType;
};

const createLocation = async (city: string, country: string) => {
  const sql = `
    INSERT INTO locations (
      city,
      country
    )
    VALUES (?, ?)
  `;

  await db.query(sql, [city, country]);

  return getLocation(city);
};

const getPasswordBy = async (column: string, value: string | number) => {
  const sql = `
    SELECT password
    FROM users
    WHERE ${column} = ?
  `;
  const result = await db.query(sql, [value]);
  return result[0];
};

const updatePassword = async (userId: number, password: string) => {
  const sql = `
  UPDATE users SET  
    password = ?
  WHERE user_id = ?
  `;
  return db.query(sql, [password, userId]);
};

const remove = async (userId: number) => {
  const sql = `
    UPDATE users SET
      is_deleted = 1
    WHERE user_id = ?
  `;

  return db.query(sql, [userId]);
};

const restore = async (userId: number) => {
  const sql = `
    UPDATE users SET
      is_deleted = 0
    WHERE user_id = ?
  `;

  return db.query(sql, [userId]);
};

const loginUser = async (email: string) => {
  const sql = `
    SELECT 
      email, 
      password,
      user_id as userId,
      role
    FROM users
    WHERE is_deleted = 0 AND email = ?
  `;

  const result = await db.query(sql, [email]);
  return result[0];
};

// tokens table includes blacklisted tokens only
const logoutUser = async (token: string) => {
  const sql = `
    INSERT INTO tokens (
      token
    )
    VALUES( ? )
  `;
  return db.query(sql, [token]);
};

export default {
  getBy,
  getAll,
  create,
  updateUser,
  remove,
  restore,
  loginUser,
  logoutUser,
  getLocation,
  createLocation,
  getPasswordBy,
  updatePassword
};
