import { connectionDb } from "../database/db";

export async function postOrder(req, res){
    const {clientId, cakeId, quantity, totalPrice} = req.body

    try {
        await connectionDb.query('nsert into orders ("clientId", "cakeId", quantity, "totalPrice") values ($1, $2, $3, $4)', [clientId, cakeId, quantity, totalPrice]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}