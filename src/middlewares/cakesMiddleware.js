import { connectionDb } from "../database/db.js";
import { cakesSchema } from "../schemas/cakesSchema.js";

export async function postCakesMiddleware(req, res, next) {
    let status;

    try {
        const { error } = cakesSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((detail) => {
                console.log(detail)
                if (detail.type === 'string.empty' || detail.type === 'string.min' || detail.type === 'number.min' || detail.type === 'any.required' || detail.type === 'string.base' || detail.type === 'number.base') {
                    status = 400
                } else if (detail.type === 'string.uri'){
                    status = 422
                }
                return detail.message
            })

            return res.status(status).send(errors)
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    const { name, price, image, description } = req.body
    const cake = {
        name,
        price,
        image,
        description
    }

    try {
        const { rows } = await connectionDb.query('select * from cakes where cakes.name = $1', [name]);
        if (rows[0] !== undefined) {
            return res.sendStatus(409);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    next();
}