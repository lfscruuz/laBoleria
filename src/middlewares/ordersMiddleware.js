import { connectionDb } from "../database/db.js";
import { ordersSchema } from "../schemas/ordersSchema.js";

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
            return res.status(400).send(errors)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

    try {
        const { rows } = await connectionDb.query("select * from clients where clients.id = $1", [clientId]);
        console.log(rows[0])
        if (rows[0] === undefined){
            return res.sendStatus(404)
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }

    try {
        const {rows} = await connectionDb.query("select * from cakes where cakes.id = $1", [cakeId]);
        console.log(rows[0]);
        if (rows[0] === undefined){
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    next()
}

export async function getOrderByIdMiddleware(req, res, next){
    const {id} = req.params;

    try {
        const {rows} = await connectionDb.query('select * from orders where orders.id = $1',[id]);
        if (rows[0] === undefined){
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    next();
}