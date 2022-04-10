const joi = require("joi");
const createSubject =  joi.object().keys({
    name: joi.string().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required()
}).required()

const updateSubject = joi.object().keys({
    name: joi.string(),
    startDate: joi.date(),
    endDate: joi.date()
})
module.exports = {
    createSubject,
    updateSubject
}
