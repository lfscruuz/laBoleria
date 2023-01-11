import { connectionDb } from "../database/db.js";

export async function postOrder(req, res){
    const {clientId, cakeId, quantity, totalPrice} = req.body

    try {
        await connectionDb.query('insert into orders ("clientId", "cakeId", quantity, "totalPrice") values ($1, $2, $3, $4)', [clientId, cakeId, quantity, totalPrice]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

export async function getOrders(req, res){
    const {date} = req.query;
    let orders
    try {
        if (date){
            orders = await connectionDb.query(`select clients.id as "clientId", clients."name" as "clientName", clients.address, clients.phone, cakes.id as "cakeId", cakes."name" as "cakeName", cakes.price, cakes.description , cakes.image, orders.id as "orderId", orders."createdAt", orders.quantity , orders."totalPrice"  from clients join orders on clients.id = orders."clientId" join cakes on cakes.id = orders."cakeId" WHERE to_char(orders."createdAt", 'YYYY-MM-DD') LIKE '%2023-01-09%'`)
        } else{
            orders = await connectionDb.query('select clients.id as "clientId", clients."name" as "clientName", clients.address, clients.phone, cakes.id as "cakeId", cakes."name" as "cakeName", cakes.price, cakes.description , cakes.image, orders.id as "orderId", orders."createdAt", orders.quantity , orders."totalPrice"  from clients join orders on clients.id = orders."clientId" join cakes on cakes.id = orders."cakeId"')
        }

        const order = orders.rows.map((o) =>{
            return{
                client: {
                    id: o.clientId,
                    name: o.clientName,
                    address: o.address,
                    phone: o.phone
                },
                cake: {
                    id: o.cakeId,
                    name: o.cakeName,
                    price: o.price,
                    description: o.description,
                    image: o.image
                },
                orderId: o.orderId,
                createdAt: o.createdAt,
                quantity: o.quantity,
                totalPrice: o.totalPrice
            }
        })
        res.status(200).send(order);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getOrderById(req, res){
    const {id} = req.params;

    try {
        const {rows} = await connectionDb.query(`select clients.id as "clientId", clients."name" as "clientName", clients.address, clients.phone, cakes.id as "cakeId", cakes."name" as "cakeName", cakes.price, cakes.description , cakes.image, orders.id as "orderId", orders."createdAt", orders.quantity , orders."totalPrice"  from clients join orders on clients.id = orders."clientId" join cakes on cakes.id = orders."cakeId" where orders.id = $1`, [id])

        const order = rows.map((o) =>{
            return{
                client: {
                    id: o.clientId,
                    name: o.clientName,
                    address: o.address,
                    phone: o.phone
                },
                cake: {
                    id: o.cakeId,
                    name: o.cakeName,
                    price: o.price,
                    description: o.description,
                    image: o.image
                },
                orderId: o.orderId,
                createdAt: o.createdAt,
                quantity: o.quantity,
                totalPrice: o.totalPrice
            }
        })
        res.status(200).send(order[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}