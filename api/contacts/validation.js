const Joi = require('joi');

const schemaCreate = Joi.object({
    name:  Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.number().integer().min(10).max(12).required(),//38 011 222 33 44 || 011 222 33 44
});

const validationCreating = (req, res, next) => {
    const result = schemaCreate.validate(req.body);
    if (result.error) {
        return res.status(400).json({ message: 'Missing required name field' });
    }
    next();
};

const schemaUpdate = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.number().integer().min(10).max(12),
});

const validationUpdating = (req, res, next) => {
    const bodyLength = Object.keys(req.body).length;
    if (bodyLength === 0) {
        return res.status(400).send({ message: 'missing fields' });
        }
    const result = schemaUpdate.validate(req.body);
    if (result.error) {
        return res.status(400).send({ message: 'invalid format of data' });
        }
    next();
};

module.exports.validateCreateContact = (req, res, next) => {
        return validationCreating (req, res, next)
    } 

module.exports.validateUpdateContact = (req, res, next) => {
        return validationUpdating(req, res, next)
    }

