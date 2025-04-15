import { publishProduct } from "../models/productModels.js";
import { generateError } from "../utils/helpers.js";

//Creamos función controladora para la publicación de un nuevo artículo
export default async function publishProductController(req, res, next) {
  try {
    const userid = req.user.id;
    const { name, description, price, photo, locality, category_id } = req.body;

    if (!name || !price || !locality || !category_id) {
      throw generateError("Faltan campos obligatorios", 400);
    }
    const productId = await publishProduct(
      name,
      description,
      price,
      photo,
      locality,
      category_id,
      userid
    );

    res.status(201).json({
      status: "OK",
      message: "El producto se ha publicado correctamente",
      data: {
        id: productId,
        name,
        price,
        locality,
        category_id,
      },
    });
  } catch (e) {
    next(e);
  }
}
