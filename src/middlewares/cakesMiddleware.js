import { cakesSchema } from "../schemas/cakesSchema.js";

export function postCakesMiddleware(req, res, next){
    const {name, price, image, description} = req.body
    const cake = {
        name,
        price,
        image,
        description
    }

    try {
        const {error} = cakesSchema.validate(cake, {abortEarly: false})
        if (error){
            const errors = error.details.map((detail) => detail.message)
            res.status(400).send(errors)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    next();
}