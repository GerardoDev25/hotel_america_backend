import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const dbConnectionUrl = process.env.MONGOBD;
export const PATH = {
  room: '/api/room',
  staff: '/api/staff',
  goest: '/api/goest',
  amount: '/api/amount',
  register: '/api/register',
};

export const KIND_OF_ROOM = ['simple', 'double', 'multiple', 'suite'];
export const ROLES_STAFF = ['role_admin', 'role_laundry', 'role_reception', 'role_Cafeteria'];
export const DESCRIPTION_ROLES = ['advance', 'surcharge', 'laundry', 'frigobar', 'others'];

export const MESSAGE = {
  success: 'Successful request',
  notFound: 'Resource not found',
  successCrete: 'Successful create',
  successUpdate: 'Successful update',
  successDelete: 'Successful delete',
  errorCreate: 'Error to create the resource',
  errorUpdate: 'Error to update the resource',
  errorDelete: 'Error to delete the resource',
  internalServerError: 'Error to connect database',
  undefined: 'insufficient permissions to access the resource',
  conflict: 'The request could not be completed because of a conflict',
  badRequest: 'Bad Request',
};

export const STATUS = {
  success: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  expectationFailed: 417,
  internalServerError: 500,
};
