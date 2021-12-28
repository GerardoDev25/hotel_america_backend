import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const dbConnectionUrl = process.env.MONGOBD;

export const PATH = {
  user: '/api/user',
};

export const ROLES = {
  admin: 'role_admin',
  laundry: 'role_laundry',
  reception: 'role_reception',
  cafeteria: 'role_Cafeteria',
};

export const DESCRIPTION_ROLES = {
  advance: 'advance',
  surcharge: 'surcharge',
  laundry: 'laundry',
  frigobar: 'frigobar',
  others: 'others',
};

export const MESSAGE = {
  success: 'Successful request',
  notFound: 'Resource not found',
  successCrete: 'Successful create',
  errorCreate: 'Error to create the resource',
  internalServerError: 'Error to connect database',
  undefined: 'insufficient permissions to access the resource',
  conflict: 'The request could not be completed because of a conflict',
  badRequest: 'Bad Request',
};

export const STATUS = {
  success: 200,
  created: 201,
  notFound: 404,
  badRequest: 400,
  conflict: 409,
  unauthorized: 401,
  internalServerError: 500,
};
