const user = require('../../controllers/userController')
const joi = require('joi')
const { joiPasswordExtendCore } = require('joi-password')
// const { schema } = require('../../models/userModelSchema')
const joipassword = joi.extend(joiPasswordExtendCore)

const Schema = {
    usersignUp: joi.object({
        FullName: joi.string()
            .min(2)
            .max(30).required()
            .messages({
                'string.min': '{#label} should contain min {#limit} characters',
                'string.max': '{#label} should not contain more than {#limit} character'
            }),
        email: joi.string().email()
            .message('email is not valid').required(),
        phone: joi.number().integer().min(1000000000).max(9999999999).message('invalid mobile number'),
        address: joi.string().required()
            .messages({ 'any.required': 'You must tells us your address, {FullName}' }),
        password: joipassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(2)
            .noWhiteSpaces()
            .messages({
                'password.minOfUppercase': '{#label} should contain at least {#limit} uppercase',
                'password.minOfSpecialCharacters': '{#label} should contain atleat {#limit} special character',
                'password.minOfNumeric': '{#label} should contain atleast {#limit} numeric charcter',
                'password.noWhitespaces': '{#label} should not contain white spaces',
            }).required(),
    }).unknown(true)
}

module.exports = Schema
