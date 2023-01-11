import { Router } from "express";
import { getOrderById, getOrders, postOrder } from "../controllers/ordersController.js";
import { getOrderByIdMiddleware, postOrderMiddleware } from "../middlewares/ordersMiddleware.js";

const router = Router();

router.post("/orders", postOrderMiddleware, postOrder);
router.get("/orders/", getOrders);
router.get("/orders/:id", getOrderByIdMiddleware, getOrderById);
export default router;