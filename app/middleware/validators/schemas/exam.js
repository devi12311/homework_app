const joi = require("joi");

const createExam =  joi.object().keys({
    subjectId: joi.number().required(),
    grade: joi.string().valid('A','A-','B+','B','B-','C+','C','C-','D+','D','F'),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
}).required()

const updateExam = joi.object().keys({
    subjectId: joi.number(),
    grade: joi.string().valid('A','A-','B+','B','B-','C+','C','C-','D+','D','F'),
    startDate: joi.date(),
    endDate: joi.date()
})
module.exports = {
    createExam,
    updateExam
}
