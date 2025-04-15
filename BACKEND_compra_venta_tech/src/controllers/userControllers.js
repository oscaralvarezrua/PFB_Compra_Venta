import { getUserListModel, getUserDetailModel, rateSellerModel } from "../models/userModels.js";

// Controlador para listar usuarios
export async function getUserListController(req, res, next) {
  try {
    const users = await getUserListModel();
    res.send({
      status: "ok",
      data: users,
    });
  } catch (e) {
    next(e);
  }
}

// Controlador para detalle de usuario
export async function getUserDetailController(req, res, next) {
  try {
    const userId = req.params.id;
    const userData = await getUserDetailModel(userId);

    res.send({
      status: "ok",
      data: userData,
    });
  } catch (e) {
    next(e);
  }
}


// Controlador para valorar al vendedor
export async function rateSellerController(req, res, next) {
  try {
    const { transactionId } = req.params;
    const { ratings, comment } = req.body;
    const userId = req.user?.id || 1; // Simulación de usuario logueado (sustituir por auth real)

    await rateSellerModel(transactionId, userId, ratings, comment);

    res.send({
      status: "ok",
      message: "Valoración registrada correctamente",
    });
  } catch (e) {
    next(e);
  }
}
