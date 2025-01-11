
const validator = require('./validator');
const handler = require('./handler');

exports.userCreate = {
    payload: validator.userCreate,
    handler: handler.createUser,
}

exports.userLogin = {
    payload: validator.userLogin,
    handler: handler.userLogin,
}