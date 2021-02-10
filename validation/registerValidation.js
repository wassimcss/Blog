const Joi=require("@hapi/joi")

//Register validation for user
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required()

    })
    return schema.validate(data)
}

//Login Validation
const loginValidation = (data) => {
    const schema =Joi.object({
        email :Joi.string().email().required(),
        password :Joi.string().min(6).required()
    })
    return schema.validate(data)

}
module.exports= {registerValidation,loginValidation}