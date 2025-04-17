import { getProductById } from "../models/productModels.js";

//Funcion controladora para obtener detalles de los productos
export default async function getProductDetails(req, res, next) {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).send({
        status: "Error",
        message: "Producto no encontrado",
      });
    }
    res.send({
      status: "OK",
      data: product,
    });
  } catch (e) {
    next(e);
  }
}
