import { getFilteredProducts } from "../models/getFilteredProducts.js";

//Funcion controladora para obtener detalles de los productos
export async function getFilteredProductsController(req, res, next) {
  try {
    const filters = {
      query: req.query.query,
      name: req.query.name,
      category_id: req.query.category_id,
      locality: req.query.locality,
      min_price: req.query.min_price,
      max_price: req.query.max_price,
      order_by: req.query.order_by,
      order_direction: req.query.order_direction,
    };
    let isAdmin = false;
    if (req.user?.role === "admin") {
      isAdmin = true;
    }

    const products = await getFilteredProducts(filters, isAdmin);

    res.json({ status: "success", data: products });
  } catch (err) {
    next(err);
  }
}
