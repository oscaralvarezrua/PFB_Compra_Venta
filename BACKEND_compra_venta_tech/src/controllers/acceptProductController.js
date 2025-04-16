import { acceptProduct } from "../models/productModels.js";

//Función Controladora para q los Admin puedan aceptar un producto
export default async function acceptProductController(req, res, next) {
  try {
    const productId = req.params.id;

    await acceptProduct(productId);

    res.send({
      status: "OK",
      message: "Producto Aceptado!",
    });
  } catch (e) {
    next(e);
  }
}
