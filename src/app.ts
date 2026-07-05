import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./middleware/errorMiddleware";
import routes from "./routes";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api", routes);
// app.use("/api/cart", cartRoutes);

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Api is running"
    });
});

app.use(errorHandler);

export default app;