import db from './pool.js';
import LocationType from '../models/LocationType.js';

const getAllLocations = async (search: string, sort: string, page: number, pageSize: number) => {
  const sortArr = sort.split(' ');
  const direction = ['ASC', 'asc', 'DESC', 'desc'].includes(sortArr[1]) ? sortArr[1] : 'asc';
  const sortColumn = ['location_id, city', 'country'].includes(sortArr[0])
    ? sortArr[0]
    : 'location_id';

  const offset = page ? (page - 1) * pageSize : 0;

  const sql = `
    SELECT 
      location_id as locationId,
      city,
      country
    FROM locations

    WHERE ${search.length > 0 ? `CONCAT_WS(',', city, country)` : ' city '} Like '%${search}%'
    ORDER BY ${sortColumn} ${direction} 
    LIMIT ? OFFSET ?
    `;

  return await db.query(sql, [+pageSize, +offset]);
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

export default {
  getAllLocations,
  getLocation,
  createLocation
};
