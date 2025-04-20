import { getFilteredProducts } from "../models/getFilteredProducts.js";

//Funcion controladora para obtener detalles de los productos
export async function getFilteredProductsController(req, res, next) {
  try {
    console.log("Entramos aqui");

    const filters = {
      name: req.query.name,
      category_id: req.query.category_id,
      locality: req.query.locality,
      is_available: req.query.is_available,
      order_by: req.query.order_by,
      order_direction: req.query.order_direction,
    };

    const products = await getFilteredProducts(filters);

    res.json({ status: "success", data: products });
  } catch (err) {
    next(err);
  }
}
