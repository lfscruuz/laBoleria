import { connectionDb } from "../database/db.js";

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

export async function getOrderById(req, res){
    const {id} = req.params;

    try {
        const {rows} = await connectionDb.query(`select (select json_build_array('id', clients.id, 'name', clients.name, 'address', clients.address, 'phone', clients.phone) from clients join orders on clients.id = orders."clientId" where orders.id = $1) as client, (select json_build_array('id', cakes.id, 'name', cakes."name", 'price', cakes.price, 'description', cakes.description, 'image', cakes.image) from cakes join orders on cakes.id = orders."cakeId"  where orders.id = $1) as cake, orders.id as "orderId", orders."createdAt", orders.quantity, orders."totalPrice" from orders where orders.id = $1`, [id])
        res.send(rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export async function getOrders(req, res){


    try {
        const {rows} = await connectionDb.query('select clients.id as "clientId", clients."name" as "clientName", clients.address, clients.phone, cakes.id as "cakeId", cakes."name" as "cakeName", cakes.price, cakes.description , cakes.image, orders.id as "orderId", orders."createdAt", orders.quantity , orders."totalPrice"  from clients join orders on clients.id = orders."clientId" join cakes on cakes.id = orders."cakeId"')

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
        res.send(order)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}