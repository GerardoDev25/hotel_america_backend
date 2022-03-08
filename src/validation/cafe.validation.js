import helpers from '../helpers';

const create = [...helpers.validateRole(['role_reception']), helpers.validataInputs];

const update = [...helpers.validateRole(['role_Cafe']), helpers.validataInputs];

export default { create, update };
