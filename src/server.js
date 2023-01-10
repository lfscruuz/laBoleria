import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/clientsRouter.js";
import cakesRouter from "./routes/cakesRouter.js";
import ordersRouter from "./routes/ordersRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(usersRouter);
app.use(cakesRouter);
app.use(ordersRouter);

const port = process.env.PORT;
app.listen(port, () =>console.log(`running on port ${port}`))