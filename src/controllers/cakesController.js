import { connectionDb } from "../database/db.js";

export async function postCakes(req, res){
    const {name, price, image, description} = req.body

    try {
        await connectionDb.query(`insert into cakes (name, price, image, description) values ($1, $2, $3, $4)`, [name, price, image, description])
        return res.sendStatus(201)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}