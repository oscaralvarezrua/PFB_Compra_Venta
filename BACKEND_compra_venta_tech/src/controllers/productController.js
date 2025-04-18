import {
  getAcceptProductListModel,
  getProductById,
  deleteProductModel,
  setProductAsSoldModel,
} from "../models/productModels.js";

export async function getAcceptProductListController(req, res, next) {
  /*async (req, res) => {
  try {
    res.json(articulos);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Error al buscar los articulos" });
  }
} */

  try {
    const products = await getAcceptProductListModel();

    if (!products) {
      return res.status(404).send({
        status: "Error",
        message: "Productos no encontrados",
      });
    }
    res.send({
      status: "OK",
      data: products,
    });
  } catch (e) {
    next(e);
  }
}

//Funcion controladora para obtener detalles de los productos
export async function getProductDetails(req, res, next) {
  try {
    const productId = parseInt(req.params.id);
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

export async function deleteProductController(req, res, next) {
  try {
    const productId = parseInt(req.params.id);
    const product = await deleteProductModel(productId);

    if (!product) {
      return res.status(404).send({
        status: "Error",
        message: "Producto no encontrado",
      });
    }
    res.send({
      status: "Producto Eliminado",
      data: product,
    });
  } catch (e) {
    next(e);
  }
}

export async function setProtucdAsSoldController(req, res, next) {
  try {
    const productId = Number(req.params.id);

    await setProductAsSoldModel(productId);

    res.status(200).json({
      status: "success",
      message: `Producto ${productId} marcado como vendido.`,
    });
  } catch (err) {
    next(err);
  }
}
