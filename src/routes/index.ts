import express from 'express';
import productRoutes from "./productRoutes";
import cartRoutes from "./cartRoutes";

const route = express()


route.use("/products", productRoutes);
route.use("/cart", cartRoutes);

export default route;