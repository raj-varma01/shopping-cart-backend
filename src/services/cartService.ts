import Cart from "../models/Cart";
import Product from "../models/Product";
import CustomError from "../utils/customError";

const getCart = async () => {
    let cart = await Cart.findOne().populate("items.product");

    if (!cart) {
        cart = await Cart.create({ items: [] });
        cart = await cart.populate("items.product");
    }

    const totalPrice = cart.items.reduce((total: number, item: any) => {
        return total + item.product.price * item.quantity;
    }, 0);

    return {
        items: cart.items,
        totalPrice,
    };
};

const addItem = async (productId: string, quantity: number) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new CustomError(404, "Product not found");
    }

    let cart = await Cart.findOne();

    if (!cart) {
        cart = await Cart.create({ items: [] });
    }

    const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            product: product._id,
            quantity,
        });
    }

    await cart.save();

    return getCart();
};

const updateQuantity = async (
    productId: string,
    action: "increment" | "decrement"
) => {
    const cart = await Cart.findOne();

    if (!cart) {
        throw new CustomError(404, "Cart not found");
    }

    const item = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (!item) {
        throw new CustomError(404, "Item not found");
    }

    if (action === "increment") {
        item.quantity += 1;
    }

    if (action === "decrement") {
        item.quantity -= 1;

        if (item.quantity <= 0) {
            cart.items = cart.items.filter(
                (item) => item.product.toString() !== productId
            );
        }
    }

    await cart.save();

    return getCart();
};

const removeItem = async (productId: string) => {
    const cart = await Cart.findOne();

    if (!cart) {
        throw new CustomError(404, "Cart not found");
    }

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
    );

    await cart.save();

    return getCart();
};

const clearCart = async () => {
    const cart = await Cart.findOne();

    if (!cart) {
        throw new CustomError(404, "Cart not found");
    }

    cart.items = [];

    await cart.save();

    return {
        items: [],
        totalPrice: 0,
    };
};

export default {
    getCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
}