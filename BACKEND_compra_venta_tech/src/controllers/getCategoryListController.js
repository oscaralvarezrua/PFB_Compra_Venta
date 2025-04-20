import getCategoryListModel from "../models/getCategoryListModel.js";

export default async function getCategoryListController(req, res, next) {
  try {
    const products = await getCategoryListModel();

    if (!products) {
      return res.status(404).send({
        status: "Error",
        message: "Categorias no encontradas",
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
