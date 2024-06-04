const joi = require("joi");

module.exports.userSchema=joi.object({
        firstname:joi.string().required(),
        lastname:joi.string().required(),
        password:joi.string().required(),
        contactNo:joi.number().required().min(10),
        otp:joi.number().required(),
        accountType:joi.string(),
        email:joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});