import { connectionDb } from "../database/db";
import { ordersSchema } from "../schemas/ordersSchema";

export async function postOrderMiddleware(req, res, next){
    const {clientId, cakeId, quantity, totalPrice} = req.body
    const order = {
        clientId,
        cakeId,
        quantity,
        totalPrice
    }

    try {
        const {error} = ordersSchema.validate(order, {abortEarly: false})
        if (error){
            const errors = error.details.map((detail) => detail.message);
            res.status(400).send(errors)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

    try {
        const { rows } = await connectionDb.query("select * from clients where clients.id = $1", [clientId]);
        if (rows[0] === undefined){
            res.sendStatus(404)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

    try {
        const {rows} = await connectionDb.query("select * from cakes qhere cakes.id = $1", [cakeId]);
        if (rows[0] === undefined){
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
    next()
}