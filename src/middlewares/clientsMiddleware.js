import { clientsSchema } from "../schemas/clientsSchema";

export function postClientsMiddleware(req, res, next){
    const {name, address, phone} = req.body
    const client = {
        name,
        address,
        phone
    }

    try {
        const {error} = clientsSchema.validate(client, {abortEarly: false})
        if (error){
            const errors = error.details.map((details) => details.message);
            res.status(400).send(errors)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    next();
}