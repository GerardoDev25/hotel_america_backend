import dotenv from 'dotenv';
dotenv.config();

/**
 * @module Settings
 */

/**
 * number port
 * @type {number}
 */
export const PORT = Number.parseInt(process.env.PORT) || 3000;

/**
 * url connection data base
 * @type {string}
 */
export const dbConnectionUrl = process.env.MONGOBD;

/**
 * secret key to generate jwt
 * @type {string}
 */
export const SECRET_PRIVATE_KEY = process.env.SECRETORPRIVATEKEY;

/**
 * kind of rooms
 * @type {Array<string>}
 */
export const KIND_OF_ROOM = ['simple', 'double', 'multiple', 'suite'];

/**
 * roles staff
 * @type {Array<string>}
 */
export const ROLES_STAFF = ['role_admin', 'role_laundry', 'role_reception', 'role_Cafe'];

/**
 * descriptions amounts
 * @type {Array<string>}
 */
export const DESCRIPTION_AMOUNTS = ['advance', 'surcharge', 'laundry', 'frigobar', 'others'];

/**
 * full paths
 * @type {object}
 */
export const PATH = {
  auth: '/api/auth',
  cafe: '/api/cafe',
  room: '/api/room',
  staff: '/api/staff',
  goest: '/api/goest',
  amount: '/api/amount',
  lodging: '/api/lodging',
  register: '/api/register',
};

/**
 * list of request's messages
 * @type {object}
 */
export const MESSAGE = {
  paramsError: 'parameter error necessary items do not exist',
  itemsExist: 'the items exist',
  authSuccess: 'user logged',
  authError: 'password or username incorrect',
  success: 'Successful request',
  notFound: 'Resource not found',
  successCrete: 'Successful create',
  successUpdate: 'Successful update',
  successDelete: 'Successful delete',
  errorCreate: 'Error to create the resource',
  errorUpdate: 'Error to update the resource',
  errorDelete: 'Error to delete the resource',
  internalServerError: 'Error to connect database',
  msgUndefined: 'insufficient permissions to access the resource',
  conflict: 'The request could not be completed because of a conflict',
  badRequest: 'Bad Request',
  forbidden: 'Resource Forbidden',
};

/**
 * list of status request
 * @type {object}
 */
export const STATUS = {
  success: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  expectationFailed: 417,
  internalServerError: 500,
};

/**
 * function generate current date
 * @returns {string}
 */
export const getFullDate = () => {
  //

  const date = new Date();
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * function generate a date with more days
 * @param {number} number get number of days to add
 * @returns {string} return a string with the current date plus number of days added
 */
export const getAndAddFullDate = (number) => {
  //

  const date = new Date();
  const day = date.getDate() + number < 10 ? '0' + (date.getDate() + number) : date.getDate();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
