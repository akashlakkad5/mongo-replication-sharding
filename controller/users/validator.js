const Joi = require('joi');

exports.userCreate = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
}).options({stripUnknown: true});

exports.userLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).options({stripUnknown: true});

