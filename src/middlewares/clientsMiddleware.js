import { connectionDb } from "../database/db.js";
import { clientsSchema } from "../schemas/clientsSchema.js";

export function postClientsMiddleware(req, res, next){
    const {name, address, phone} = req.body
    const client = {
        name,
        address,
        phone
    }
    let status;

    try {
        const {error} = clientsSchema.validate(client, {abortEarly: false})
        if (error){
            const errors = error.details.map((detail) => {
                console.log(detail)
                if (detail.type === 'string.empty' || detail.type === 'string.min' || detail.type === 'string.max'){
                    status = 400
                }
                return detail.message
            });
            return res.status(status).send(errors)
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    next();
}

export async function getClientIdMiddleware(req, res, next){
    const {id} = req.params;

    try {
        const {rows} = await connectionDb.query("select * from clients where clients.id = $1", [id]);

        if (rows[0] === undefined){
            return res.sendStatus(404)
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    next()
}