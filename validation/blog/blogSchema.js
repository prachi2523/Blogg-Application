const joi = require('joi')

const schema = {
    addBlog: joi.object({
        title: joi.string()
            .min(10)
            .max(20)
            .message({
                'string.min': '{#label} should contain atleast {#limit} characters',
                'string.max': '{#label} should not contain more than {#limit} charaters '
            }),
        description: joi.string()
            .max(100)

    }).unknown(true),

    searchBlog: joi.object({
        title: joi.string()
            .min(3)
            .message({ 'string.min': '{#label} should contain atleast {#limit} characters' })
            .required()
    }).unknown(true)
}

module.exports = schema
