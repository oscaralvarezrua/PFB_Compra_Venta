import { sendTransactionRequest } from "../utils/emailConfig.js";
import {
  getTransaction,
  createTransaction,
  getSellerEmail,
  getTransactionListModel,
  getSellerID,
  setTransactionStateModel,
  isAvailable,
} from "../models/transactionModels.js";

export async function initTransactionController(req, res, next) {
  try {
    const { productId, productName } = req.body;
    const buyerId = req.user.id;

    //verificamos si ya existe una transacción abierta
    const verifyTransaction = await getTransaction(buyerId, productId);
    const sellerID = await getSellerID(productId);
    const { is_available } = await isAvailable(productId);

    if (verifyTransaction) {
      return res.status(409).json({
        status: "error",
        message:
          "Ya existe una transacción abierta con tu usuario y el producto seleccionado",
      });
    }

    if (sellerID === req.user.id) {
      return res.status(409).json({
        status: "error",
        message: "No puedes comprar tu propio producto",
      });
    }
    console.log(is_available);

    if (!is_available) {
      return res.status(409).json({
        status: "error",
        message: "El producto no esta disponible",
      });
    }

    //Iniciamos proceso de compra
    const transID = await createTransaction(buyerId, productId);

    //enviamos petición por email
    const sellerEmail = await getSellerEmail(productId);

    sendTransactionRequest(
      sellerEmail,
      req.user.username,
      productName,
      transID.insertId
    );

    res.status(201).json({
      status: "success",
      message: "Transacción iniciada y email enviado al vendedor",
      data: {
        user: buyerId,
        product: productId,
        sellerEmail: sellerEmail,
        transID: transID.insertId,
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function getTransactionList(req, res, next) {
  try {
    const transactions = await getTransactionListModel(req.user.id);

    if (transactions.affectedRows === 0) {
      return res.status(404).send({
        status: "Error",
        message: "Transacciones no encontradas",
      });
    }
    res.send({
      status: "succes",
      data: transactions,
    });
  } catch (e) {
    next(e);
  }
}

export async function setTransactionState(req, res, next) {
  try {
    const transID = Number(req.params.id);
    const status = req.body.status;
    const transaction = await setTransactionStateModel(transID, status);
    console.log(transaction);

    if (transaction.affectedRows === 0) {
      return res.status(404).send({
        status: "Error",
        message: "Transacciones no encontradas",
      });
    }
    res.send({
      status: "succes",
      data: `Transacción ${status === "accepted" ? "aceptada" : "rechazada"}.`,
    });
  } catch (e) {
    next(e);
  }
}
