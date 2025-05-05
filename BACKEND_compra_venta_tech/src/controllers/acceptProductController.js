import { acceptProduct, noAcceptProduct } from "../models/productModels.js";

//Función Controladora para q los Admin puedan aceptar un producto
export async function acceptProductController(req, res, next) {
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

//función para volver a revisión cuando modificamos un producto
export async function noAcceptProductController(req, res, next) {
  try {
    const productId = req.params.id;

    await noAcceptProduct(productId);

    res.send({
      status: "OK",
      message: "Producto En revisión",
    });
  } catch (e) {
    next(e);
  }
}
