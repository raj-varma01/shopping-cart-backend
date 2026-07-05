import { Request, Response } from "express";
import productService from "../services/productService";
import asyncHandler from "../utils/asyncHandler";
import CustomResponse from "../utils/customResponse";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.status(200).json(new CustomResponse("Products fetched successfully", products));
}
);

export default {
  getProducts
}