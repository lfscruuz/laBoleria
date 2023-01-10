import { Router } from "express";
import { postClient } from "../controllers/clientsController.js";
import { postClientsMiddleware } from "../middlewares/clientsMiddleware.js";

const router = Router();

router.post("/clients", postClientsMiddleware, postClient)

export default router;