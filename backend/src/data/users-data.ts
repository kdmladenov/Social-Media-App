import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import UserType, {
  UserTypeFriendsAsJson
} from '../models/UserType.js';
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
      u.cover,
      f.friends,
      u.about_me as aboutMe
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
    LEFT JOIN(
          SELECT 
              u.user_id,
              JSON_ARRAYAGG(JSON_OBJECT('userId', fr.friendUserId,'firstName', fr.firstName, 'lastName', fr.lastName, 'avatar', fr.avatar, 'friends' , fr.friends)) as friends

          FROM users u

          INNER JOIN (
                SELECT 
                  f.target_id as user_id,
                  f.source_id as friendUserId,
                  u.firstName,
                  u.lastName,
                  u.avatar,
                  u.friends
                  
                  
                FROM friends f
                
                
                LEFT JOIN (
                      SELECT 
                        u.user_id as userId, 
                        u.first_name as firstName,
                        u.last_name as lastName,
                        u.avatar,
                        f.friends
                      FROM users u
                      
                      LEFT JOIN(
                                SELECT 
                                    u.user_id,
                                    JSON_ARRAYAGG(JSON_OBJECT('userId', frr.friendUserId,'firstName', frr.firstName, 'lastName', frr.lastName, 'avatar', frr.avatar)) as friends

                                FROM users u
                                INNER JOIN (
                                      SELECT 
                                        f.target_id as user_id,
                                        f.source_id as friendUserId,
                                        u.firstName,
                                        u.lastName,
                                        u.avatar
                                      FROM friends f
                                      LEFT JOIN (
                                            SELECT 
                                              u.user_id as userId, 
                                              u.first_name as firstName,
                                              u.last_name as lastName,
                                              u.avatar
                                            FROM users u
                                            WHERE is_deleted = 0
                                            GROUP BY userId) as u ON userId = f.source_id
                                      WHERE f.request_status_id = 1

                                      UNION

                                      SELECT 
                                        f.source_id as user_id,
                                        f.target_id as friendUserId,
                                        u.firstName,
                                        u.lastName,
                                        u.avatar
                                      FROM friends f
                                      LEFT JOIN (  
                                            SELECT 
                                              u.user_id as userId, 
                                              u.first_name as firstName,
                                              u.last_name as lastName,
                                              u.avatar
                                            FROM users u
                                            WHERE is_deleted = 0
                                            GROUP BY userId) as u ON userId = f.target_id
                                      WHERE f.request_status_id = 1
            
                                ) as frr USING (user_id)
                                GROUP BY user_id) as f USING (user_id)
                                
                                
                                
                      WHERE is_deleted = 0
                      GROUP BY userId) as u ON userId = f.source_id
                      
                      
                WHERE f.request_status_id = 1

        UNION
        
        SELECT 
                  f.source_id as user_id,
                  f.target_id as friendUserId,
                  u.firstName,
                  u.lastName,
                  u.avatar,
                  u.friends
                  
                  
                FROM friends f
                
                
                LEFT JOIN (
                      SELECT 
                        u.user_id as userId, 
                        u.first_name as firstName,
                        u.last_name as lastName,
                        u.avatar,
                        f.friends
                      FROM users u
                      
                      LEFT JOIN(
                                SELECT 
                                    u.user_id,
                                    JSON_ARRAYAGG(JSON_OBJECT('userId', frr.friendUserId,'firstName', frr.firstName, 'lastName', frr.lastName, 'avatar', frr.avatar)) as friends

                                FROM users u
                                INNER JOIN (
                                      SELECT 
                                        f.source_id as user_id,
                                        f.target_id as friendUserId,
                                        u.firstName,
                                        u.lastName,
                                        u.avatar
                                      FROM friends f
                                      LEFT JOIN (
                                            SELECT 
                                              u.user_id as userId, 
                                              u.first_name as firstName,
                                              u.last_name as lastName,
                                              u.avatar
                                            FROM users u
                                            WHERE is_deleted = 0
                                            GROUP BY userId) as u ON userId = f.target_id
                                      WHERE f.request_status_id = 1

                                      UNION

                                      SELECT 
                                        f.target_id as user_id,
                                        f.source_id as friendUserId,
                                        u.firstName,
                                        u.lastName,
                                        u.avatar
                                      FROM friends f
                                      LEFT JOIN (  
                                            SELECT 
                                              u.user_id as userId, 
                                              u.first_name as firstName,
                                              u.last_name as lastName,
                                              u.avatar
                                            FROM users u
                                            WHERE is_deleted = 0
                                            GROUP BY userId) as u ON userId = f.source_id
                                      WHERE f.request_status_id = 1
            
                                ) as frr USING (user_id)
                                GROUP BY user_id) as f USING (user_id)
                                
                                
                                
                      WHERE is_deleted = 0
                      GROUP BY userId) as u ON userId = f.target_id
                      
                      
                WHERE f.request_status_id = 1
            
          ) as fr USING (user_id)
          GROUP BY user_id) as f USING (user_id)

    WHERE ${role === 'admin' ? `` : `is_deleted = 0 AND`} ${column} = ?
      `;

  const users = (await db.query(sql, value)) as UserTypeFriendsAsJson[];

  return {
    ...users[0],
    friends: JSON.parse(users[0]?.friends)?.map((friendsOfFriend: UserTypeFriendsAsJson) => {
      return { ...friendsOfFriend, friends: JSON.parse(friendsOfFriend.friends) };
    })
  };
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
      u.cover,
      f.friends,
      u.about_me as aboutMe
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
    
    LEFT JOIN(
          SELECT 
              u.user_id,
              JSON_ARRAYAGG(JSON_OBJECT('userId', fr.friendUserId,'firstName', fr.firstName, 'lastName', fr.lastName, 'avatar', fr.avatar, 'friends' , fr.friends)) as friends

          FROM users u

          INNER JOIN (
                SELECT 
                  f.target_id as user_id,
                  f.source_id as friendUserId,
                  u.firstName,
                  u.lastName,
                  u.avatar,
                  u.friends
                  
                  
                FROM friends f
                
                
                LEFT JOIN (
                      SELECT 
                        u.user_id as userId, 
                        u.first_name as firstName,
                        u.last_name as lastName,
                        u.avatar,
                        f.friends
                      FROM users u
                      
                      LEFT JOIN(
                                SELECT 
                                    u.user_id,
                                    JSON_ARRAYAGG(JSON_OBJECT('userId', frr.friendUserId,'firstName', frr.firstName, 'lastName', frr.lastName, 'avatar', frr.avatar)) as friends

                                FROM users u
                                INNER JOIN (
                                      SELECT 
                                        f.target_id as user_id,
                                        f.source_id as friendUserId,
                                        u.firstName,
                                        u.lastName,
                                        u.avatar
                                      FROM friends f
                                      LEFT JOIN (
                                            SELECT 
                                              u.user_id as userId, 
                                              u.first_name as firstName,
                                              u.last_name as lastName,
                                              u.avatar
                                            FROM users u
                                            WHERE is_deleted = 0
                                            GROUP BY userId) as u ON userId = f.source_id
                                      WHERE f.request_status_id = 1

                                      UNION

                                      SELECT 
                                        f.source_id as user_id,
                                        f.target_id as friendUserId,
                                        u.firstName,
                                        u.lastName,
                                        u.avatar
                                      FROM friends f
                                      LEFT JOIN (  
                                            SELECT 
                                              u.user_id as userId, 
                                              u.first_name as firstName,
                                              u.last_name as lastName,
                                              u.avatar
                                            FROM users u
                                            WHERE is_deleted = 0
                                            GROUP BY userId) as u ON userId = f.target_id
                                      WHERE f.request_status_id = 1
            
                                ) as frr USING (user_id)
                                GROUP BY user_id) as f USING (user_id)
                                
                                
                                
                      WHERE is_deleted = 0
                      GROUP BY userId) as u ON userId = f.source_id
                      
                      
                WHERE f.request_status_id = 1

        UNION
        
        SELECT 
                  f.source_id as user_id,
                  f.target_id as friendUserId,
                  u.firstName,
                  u.lastName,
                  u.avatar,
                  u.friends
                  
                  
                FROM friends f
                
                
                LEFT JOIN (
                      SELECT 
                        u.user_id as userId, 
                        u.first_name as firstName,
                        u.last_name as lastName,
                        u.avatar,
                        f.friends
                      FROM users u
                      
                      LEFT JOIN(
                                SELECT 
                                    u.user_id,
                                    JSON_ARRAYAGG(JSON_OBJECT('userId', frr.friendUserId,'firstName', frr.firstName, 'lastName', frr.lastName, 'avatar', frr.avatar)) as friends

                                FROM users u
                                INNER JOIN (
                                      SELECT 
                                        f.source_id as user_id,
                                        f.target_id as friendUserId,
                                        u.firstName,
                                        u.lastName,
                                        u.avatar
                                      FROM friends f
                                      LEFT JOIN (
                                            SELECT 
                                              u.user_id as userId, 
                                              u.first_name as firstName,
                                              u.last_name as lastName,
                                              u.avatar
                                            FROM users u
                                            WHERE is_deleted = 0
                                            GROUP BY userId) as u ON userId = f.target_id
                                      WHERE f.request_status_id = 1

                                      UNION

                                      SELECT 
                                        f.target_id as user_id,
                                        f.source_id as friendUserId,
                                        u.firstName,
                                        u.lastName,
                                        u.avatar
                                      FROM friends f
                                      LEFT JOIN (  
                                            SELECT 
                                              u.user_id as userId, 
                                              u.first_name as firstName,
                                              u.last_name as lastName,
                                              u.avatar
                                            FROM users u
                                            WHERE is_deleted = 0
                                            GROUP BY userId) as u ON userId = f.source_id
                                      WHERE f.request_status_id = 1
            
                                ) as frr USING (user_id)
                                GROUP BY user_id) as f USING (user_id)
                                
                                
                                
                      WHERE is_deleted = 0
                      GROUP BY userId) as u ON userId = f.target_id
                      
                      
                WHERE f.request_status_id = 1
            
          ) as fr USING (user_id)
          GROUP BY user_id) as f USING (user_id)

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

  const users = (await db.query(sql, [+pageSize, +offset])) as UserTypeFriendsAsJson[];

  return users.map((user) => {
    return {
      ...user,
      friends: JSON.parse(user.friends)
    };
  });
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
      cover = ?,
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
    user.cover || null,
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
  getPasswordBy,
  updatePassword
};
