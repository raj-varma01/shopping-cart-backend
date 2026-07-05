import Product from "../models/Product";

const getAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

export default {
    getAllProducts
}