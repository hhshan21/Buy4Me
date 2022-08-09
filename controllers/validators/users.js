const Joi = require("joi");

const validators = {
    signUpValidator: Joi.object({
        username: Joi.string().min(3).max(13).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
        confirm_password: Joi.string().required().valid(Joi.ref("password")),
    }),
};

module.exports = validators;
