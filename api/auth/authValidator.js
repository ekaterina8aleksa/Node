const Joi = require('joi');

const RegistrationSchema = Joi.object({
    name: Joi
        .string().alphanum().min(2).max(16),

    email: Joi
        .string().email().required(),

    password: Joi
        .string().pattern(new RegExp('^[a-zA-Z0-9]{10,20}$')).required(),

    subscription: Joi.string().allow('free', 'pro', 'premium'),

    token: Joi.string(),
});

const validationMiddleware = schema => async (req, res, next) => {
        const { error } = await schema.validate(req.body);
        if (error) {
            const message = error.details.reduce((msg, nextErr) => {
                if (msg) {
                        return msg + ', ' + nextErr.message;
                        }
                        return nextErr.message;
            }, '');
            res.status(400).send(message);
            return;
        }
        next();
};

module.exports = {
    registrationAndLoginValidatorMiddleware: validationMiddleware(RegistrationSchema),
}