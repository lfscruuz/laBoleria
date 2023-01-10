import { connectionDb } from "../database/db.js";
import { cakesSchema } from "../schemas/cakesSchema.js";

export async function postCakesMiddleware(req, res, next){
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

    try {
        const {rows} = await connectionDb.query('select * from cakes where cakes.name = $1', [name]);
        if (rows[0] !== undefined){
            res.sendStatus(409);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    next();
}