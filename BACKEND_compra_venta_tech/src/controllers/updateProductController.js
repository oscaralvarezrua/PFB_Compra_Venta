import { updateProductModel } from "../models/productModels.js";
import { generateError } from "../utils/helpers.js";

export async function updateProductController(req, res, next) {
  try {
    const productId = req.params.id;
    const { name, description, price, locality, category_id } = req.body;

    if (!name || !description || !price || !locality || !category_id) {
      throw generateError("Faltan campos obligatorios", 400);
    }

    const updatedProduct = await updateProductModel(
      productId,
      name,
      description,
      price,
      locality,
      category_id
    );

    res.send({
      status: "ok",
      data: updatedProduct,
    });
  } catch (err) {
    next(err);
  }
}
