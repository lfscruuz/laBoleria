import { Router } from "express";
import { postOrder } from "../controllers/ordersController.js";
import { postOrderMiddleware } from "../middlewares/ordersMiddleware.js";

const router = Router();

router.post("/orders", postOrderMiddleware, postOrder)

export default router;