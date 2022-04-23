const joi = require("joi");

const createAbsence =  joi.object().keys({
    subjectId: joi.number().required(),
    date: joi.date().required()
}).required()

module.exports = {
    createAbsence
}
