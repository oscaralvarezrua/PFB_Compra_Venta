import { getUserListModel, getUserDetailModel } from "../models/userModels.js";

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
