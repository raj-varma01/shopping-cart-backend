import { Router } from "express";
import cartController from "../controllers/cartController";
import validate from "../middleware/validator";
import {
  addToCartSchema,
  updateCartSchema,
  removeCartItemSchema,
} from "../validators/cartValidator";

const router = Router();

router.get("/", cartController.getCart);
router.post("/", validate(addToCartSchema), cartController.addItem);
router.patch("/:productId", validate(updateCartSchema), cartController.updateQuantity);
router.delete("/:productId", validate(removeCartItemSchema), cartController.removeItem);
router.delete("/", cartController.clearCart);

export default router;