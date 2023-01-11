import { connectionDb } from "../database/db.js"

export async function postClient(req, res){
    const {name, address, phone} = req.body

    try {
        await connectionDb.query("insert into clients (name, address, phone) values ($1, $2, $3)", [name, address, phone])
        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export async function getClientOrders(req, res){
    const {id} = req.params;

    try {
        const {rows} = await connectionDb.query('select orders.id as "orderId", orders.quantity, orders."createdAt", orders."totalPrice", cakes.name as cakename from orders join clients on orders."clientId" = clients.id join cakes on cakes.id = orders."cakeId" where clients.id = $1', [id])

        res.send(rows)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

}