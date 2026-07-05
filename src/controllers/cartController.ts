import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import CustomResponse from "../utils/customResponse";
import cartService from "../services/cartService";

const getCart = asyncHandler(async (req: Request, res: Response) => {
    const cart = await cartService.getCart();
    res.json(new CustomResponse("Cart fetched successfully", cart));
}
);

const addItem = asyncHandler(async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;
    const cart = await cartService.addItem(productId, quantity);
    res.status(201).json(new CustomResponse("Item added successfully", cart));
}
);

const updateQuantity = asyncHandler(async (req: Request, res: Response) => {
    const cart = await cartService.updateQuantity(req.params.productId as string, req.body.action);
    res.json(new CustomResponse("Quantity updated", cart));
}
);

const removeItem = asyncHandler(async (req: Request, res: Response) => {
    const cart = await cartService.removeItem(req.params.productId as string);
    res.json(new CustomResponse("Item removed successfully", cart));
}
);

const clearCart = asyncHandler(async (req: Request, res: Response) => {
    const cart = await cartService.clearCart();
    res.json(new CustomResponse("Cart cleared successfully", cart));
}
);

export default {
    getCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
};