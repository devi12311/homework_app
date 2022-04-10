const joi = require("joi");

const createHomework =  joi.object().keys({
    title: joi.string().required(),
    subjectId: joi.number().required(),
    description: joi.string().required(),
    document: joi.string(),
    status: joi.boolean().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required()
}).required()

const updateHomework = joi.object().keys({
    title: joi.string(),
    subjectId: joi.number(),
    description: joi.string(),
    document: joi.string(),
    status: joi.boolean(),
    startDate: joi.date(),
    endDate: joi.date()
})
module.exports = {
    createHomework,
    updateHomework
}
