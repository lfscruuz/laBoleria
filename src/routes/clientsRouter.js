import { Router } from "express";
import { getClientOrders, postClient } from "../controllers/clientsController.js";
import { getClientOrdersMiddleware, postClientsMiddleware } from "../middlewares/clientsMiddleware.js";

const router = Router();

router.post("/clients", postClientsMiddleware, postClient)
router.get("/clients/:id/orders", getClientOrdersMiddleware, getClientOrders);
export default router;