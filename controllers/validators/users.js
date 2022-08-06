const Joi = require("joi");

const validators = {
    signUpValidator: Joi.object({
        username: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        confirm_password: Joi.string().required().valid(Joi.ref("password")),
    }),
};

module.exports = validators;
