import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./middleware/errorMiddleware";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Shopping Cart API Running"
    });
});

app.use(errorHandler);

export default app;