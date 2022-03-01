import helpers from '../helpers';

const getById = helpers.verifyId('lodgingId');

const create = [...helpers.validateRole(['role_reception']), helpers.validataInputs];

const update = [...helpers.validateRole(['role_reception']), ...helpers.verifyId('lodgingId')];

export default { create, update, getById };
