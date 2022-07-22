import db from './pool.js';
import { FriendTypeFriendsAsJson } from '../models/FriendsType.js';
import FriendRequestType from '../models/FriendRequestType.js';

const getFriendRequestBy = async (userId: number, friendUserId: number) => {
  const sql = `
    SELECT 
      f.source_id as sourceId, 
      f.target_id as targetId, 
      f.request_status_id as requestStatusId, 
      rs.request_status as requestStatus, 
      f.created_at as createdAt, 
      f.updated_at as updatedAt
      
    FROM friends f
    LEFT JOIN (SELECT request_status_id, request_status
      FROM request_statuses
      GROUP BY request_status_id) as rs using (request_status_id)
    WHERE (f.source_id = ? AND f.target_id = ?) OR (f.target_id = ? AND f.source_id = ?)
      `;

  const result = await db.query(sql, [+userId, +friendUserId, +userId, +friendUserId]);

  return result[0];
};

const getAllMyFriends = async (
  userId: number,
  search: string,
  sort: string,
  page: number,
  pageSize: number
) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = ['userId', 'firstName', 'lastName'].includes(sortArr[0])
    ? sortArr[0]
    : 'firstName';

  const offset = page ? (page - 1) * pageSize : 0;

  const getQuery = (friendIdType: string, userIdType: string, userId: number) => `SELECT 
      f.${friendIdType} as userId,
      u.firstName,
      u.lastName,
      u.avatar,
      u.cover,
      u.aboutMe,
      u.email,
      u.phone,
      u.dateOfBirth,
      u.homeCityId,
      u.homeCity,
      u.homeCountry,
      u.currentCityId,
      u.currentCity,
      u.currentCountry,
      u.relationshipStatus,
      u.gender,
      u.dateRegistered,
      u.isDeleted,
      u.role,
      f.request_status_id as requestStatusId, 
      rs.request_status as requestStatus, 
      f.created_at as createdAt, 
      f.updated_at as updatedAt,
      u.friends,
      t.totalDBItems
      
    FROM friends f
    LEFT JOIN (SELECT request_status_id, request_status
        FROM request_statuses
        GROUP BY request_status_id) as rs using (request_status_id)
    LEFT JOIN (SELECT  friendUserId, COUNT(*) OVER () AS totalDBItems
        FROM (SELECT  target_id as friendUserId, source_id, request_status_id
                FROM friends
              WHERE source_id = 1 and request_status_id = 1

              UNION ALL

              SELECT source_id as friendUserId, target_id, request_status_id
                FROM friends
              WHERE target_id = 1 and request_status_id = 1) r) as t ON t.friendUserId = f.${friendIdType}
    LEFT JOIN (  SELECT 
              u.user_id as userId, 
              u.first_name as firstName,
              u.last_name as lastName,
              u.avatar,
              u.cover,
              JSON_ARRAYAGG(JSON_OBJECT('friendUserId', fr.friendUserId,'firstName', fr.firstName, 'lastName', fr.lastName, 'avatar', fr.avatar)) as friends,
              u.about_me as aboutMe,
              u.email,
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
            
          ) as fr USING (user_id)
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
        WHERE is_deleted = 0
        GROUP BY userId) as u ON userId = f.${friendIdType}
    WHERE rs.request_status = 'approved' AND f.${userIdType} = ${userId} 
    AND CONCAT_WS(',', userId, firstName, lastName) Like '%${search}%'`;
  const sql = `
    ${getQuery('source_id', 'target_id', +userId)}
    union
    ${getQuery('target_id', 'source_id', +userId)}
    ORDER BY ${sortColumn} ${direction} 
    LIMIT ? OFFSET ?
    `;

  const friends = (await db.query(sql, [+pageSize, +offset])) as FriendTypeFriendsAsJson[];

  return friends.map((friend) => {
    return {
      ...friend,
      friends: JSON.parse(friend?.friends)
    };
  });
};

const getAllMySentPendingRequests = async (userId: number) => {
  const sql = `SELECT 
      f.target_id as userId, 
      u.firstName,
      u.lastName,
      u.avatar,
      u.cover,
      u.aboutMe,
      u.email,
      u.phone,
      u.dateOfBirth,
      u.homeCityId,
      u.homeCity,
      u.homeCountry,
      u.currentCityId,
      u.currentCity,
      u.currentCountry,
      u.relationshipStatus,
      u.gender,
      u.dateRegistered,
      u.isDeleted,
      u.role,
      f.request_status_id as requestStatusId, 
      rs.request_status as requestStatus, 
      f.created_at as createdAt, 
      f.updated_at as updatedAt,
      COUNT(*) OVER () AS totalDBItems
      
    FROM friends f
    LEFT JOIN (SELECT request_status_id, request_status
        FROM request_statuses
        GROUP BY request_status_id) as rs using (request_status_id)
    LEFT JOIN (  SELECT 
              u.user_id as userId, 
              u.first_name as firstName,
              u.last_name as lastName,
              u.avatar,
              u.cover,
              u.about_me as aboutMe,
              u.email,
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
        WHERE is_deleted = 0
        GROUP BY userId) as u ON userId = f.target_id
    WHERE rs.request_status = 'pending' AND f.source_id = ?
      `;

  return db.query(sql, +userId);
};

const getAllMyReceivedPendingRequests = async (userId: number) => {
  const sql = `SELECT 
      f.source_id as userId, 
      u.firstName,
      u.lastName,
      u.avatar,
      u.cover,
      u.aboutMe,
      u.email,
      u.phone,
      u.dateOfBirth,
      u.homeCityId,
      u.homeCity,
      u.homeCountry,
      u.currentCityId,
      u.currentCity,
      u.currentCountry,
      u.relationshipStatus,
      u.gender,
      u.dateRegistered,
      u.isDeleted,
      u.role,
      f.request_status_id as requestStatusId, 
      rs.request_status as requestStatus, 
      f.created_at as createdAt, 
      f.updated_at as updatedAt,
      COUNT(*) OVER () AS totalDBItems
      
    FROM friends f
    LEFT JOIN (SELECT request_status_id, request_status
        FROM request_statuses
        GROUP BY request_status_id) as rs using (request_status_id)
    LEFT JOIN (  SELECT 
              u.user_id as userId, 
              u.first_name as firstName,
              u.last_name as lastName,
              u.avatar,
              u.cover,
              u.about_me as aboutMe,
              u.email,
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
        WHERE is_deleted = 0
        GROUP BY userId) as u ON userId = f.source_id
    WHERE rs.request_status = 'pending' AND f.target_id = ?
      `;

  return db.query(sql, +userId);
};

const getAllFriendSuggestions = async (userId: number) => {
  const getQuery = (friendIdType: string, userIdType: string, userId: number) => `SELECT 
      f.${friendIdType} as userId,
      u.firstName,
      u.lastName,
      u.avatar,
      u.friends
      
    FROM friends f
    LEFT JOIN (  SELECT 
              u.user_id as userId, 
              u.first_name as firstName,
              u.last_name as lastName,
              u.avatar,
              JSON_ARRAYAGG(JSON_OBJECT('friendUserId', fr.friendUserId,'firstName', fr.firstName, 'lastName', fr.lastName, 'avatar', fr.avatar, 'homeCityId', fr.home_city_id, 'currentCityId', fr.current_city_id, 'friends' , fr.friends)) as friends

        FROM users u
        INNER JOIN (
                SELECT 
                  f.target_id as user_id,
                  f.source_id as friendUserId,
                  u.firstName,
                  u.lastName,
                  u.avatar,
                  u.home_city_id,
                  u.current_city_id,
                  u.friends
                FROM friends f
                LEFT JOIN (
                      SELECT 
                        u.user_id as userId, 
                        u.first_name as firstName,
                        u.last_name as lastName,
                        u.avatar,
                        u.home_city_id,
                        u.current_city_id,
                        f.friends
                      FROM users u
                      LEFT JOIN(
                                SELECT
                                    u.user_id,
                                    JSON_ARRAYAGG(JSON_OBJECT('friendUserId', frr.friendUserId,'firstName', frr.firstName, 'lastName', frr.lastName, 'avatar', frr.avatar)) as friends
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
                  u.home_city_id,
                  u.current_city_id,
                  u.friends
                FROM friends f
                LEFT JOIN (  
                      SELECT 
                        u.user_id as userId, 
                        u.first_name as firstName,
                        u.last_name as lastName,
                        u.avatar,
                        u.home_city_id,
                        u.current_city_id,
                        f.friends
                      FROM users u
                          
                      LEFT JOIN(
                                SELECT
                                    u.user_id,
                                    JSON_ARRAYAGG(JSON_OBJECT('friendUserId', frr.friendUserId,'firstName', frr.firstName, 'lastName', frr.lastName, 'avatar', frr.avatar)) as friends
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
        WHERE is_deleted = 0
        GROUP BY userId) as u ON userId = f.${friendIdType}
    WHERE f.request_status_id = 1 AND f.${userIdType} = ${userId}`;

  const sql = `
    ${getQuery('source_id', 'target_id', +userId)}
    union
    ${getQuery('target_id', 'source_id', +userId)}
    `;

  const friends = (await db.query(sql)) as FriendTypeFriendsAsJson[];

  return friends.map((friend) => {
    return {
      ...friend,
      friends: JSON.parse(friend?.friends)
    };
  });
};

const createRequest = async (sourceUserId: number, targetUserId: number) => {
  const sql = `
    INSERT INTO friends (
      source_id,
      target_id,
      request_status_id
    )
    VALUES (?, ?, ?)
  `;

  await db.query(sql, [+sourceUserId, +targetUserId, 2]);

  return getFriendRequestBy(+sourceUserId, +targetUserId);
};

const updateRequestStatus = async (friendRequest: FriendRequestType) => {
  const sql = `
    UPDATE friends SET
      request_status_id = (SELECT request_status_id from request_statuses WHERE request_status = ?),
      updated_at = CURRENT_TIMESTAMP()
      WHERE target_id = ? AND source_id = ?
      `;

  await db.query(sql, [
    friendRequest.requestStatus || null,
    +friendRequest.targetId || null,
    +friendRequest.sourceId || null
  ]);

  return getFriendRequestBy(+friendRequest.sourceId, +friendRequest.targetId);
};

const unfriend = async (userId: number, friendId: number) => {
  const sql = `
    UPDATE friends SET
      request_status_id  = 4
    WHERE (target_id = ? AND source_id = ?) OR (target_id = ? AND source_id = ?)
  `;

  await db.query(sql, [+userId, +friendId, +friendId, +userId]);

  return getFriendRequestBy(+userId, +friendId);
};

export default {
  getFriendRequestBy,
  getAllMyFriends,
  getAllMySentPendingRequests,
  getAllMyReceivedPendingRequests,
  getAllFriendSuggestions,
  createRequest,
  updateRequestStatus,
  unfriend
};
