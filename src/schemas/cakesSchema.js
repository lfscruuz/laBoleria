import joi from "joi";

export const cakesSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().min(1).required(),
    description: joi.string(),
    image: joi.string().uri().required()
})