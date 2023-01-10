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