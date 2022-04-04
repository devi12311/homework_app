const joi = require("joi");

module.exports = {
    createSubject: joi.object({
        name: joi.string().required(),
        userId: joi.number().required(),
        startDate: joi.date().required(),
        endDate: joi.date().required()
    }),

    updateSubject: joi.object({
        name: joi.string(),
        userId: joi.number(),
        startDate: joi.date(),
        endDate: joi.date()
    })
}
