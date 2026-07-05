import { Schema, model, Types } from "mongoose";
import { IProduct } from "./Product";

export interface ICartItem {
  product: Types.ObjectId | IProduct;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
}

const cartSchema = new Schema<ICart>(
  {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<ICart>("Cart", cartSchema);