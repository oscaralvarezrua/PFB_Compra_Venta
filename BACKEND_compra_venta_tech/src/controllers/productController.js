import {
  getAcceptProductListModel,
  getProductById,
  deleteProductModel,
  setProductAsSoldModel,
  getPendingProductListModel,
} from "../models/productModels.js";
import { deletePhoto } from "../utils/helpers.js";

export async function getAcceptProductListController(req, res, next) {
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

//productos pendientes de Aceptar por el Administrador
export async function getPendingProductListController(req, res, next) {
  try {
    const products = await getPendingProductListModel();

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

    //borramos la foto de Public
    const actualProduct = await getProductById(productId);

    if (actualProduct.photo) {
      await deletePhoto(actualProduct.photo);
    }

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
