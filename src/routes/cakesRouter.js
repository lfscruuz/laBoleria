import { Router } from "express";
import { postCakes } from "../controllers/cakesController.js";
import { postCakesMiddleware } from "../middlewares/cakesMiddleware.js";

const router = Router();

router.post("/cakes", postCakesMiddleware, postCakes);

export default router;