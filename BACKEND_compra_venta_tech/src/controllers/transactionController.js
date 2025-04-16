import { sendTransactionRequest } from "../utils/helpers.js";
import {
  getTransaction,
  createTransaction,
  getSellerEmail,
} from "../models/transactionModels.js";

export async function initTransactionController(req, res, next) {
  try {
    const { comment, buyerId, productId, productName } = req.body;

    //verificamos si ya existe una transacción abierta
    const verifyTransaction = await getTransaction(buyerId, productId);

    if (verifyTransaction) {
      return res.status(409).json({
        status: "error",
        message:
          "Ya existe una transacción abierta con tu usuario y el producto seleccionado",
      });
    }

    //Iniciamos proceso de compra
    const transID = await createTransaction(comment, buyerId, productId);

    //enviamos petición por email
    const sellerEmail = await getSellerEmail(productId);

    sendTransactionRequest(
      sellerEmail,
      req.user.username,
      productName,
      transID
    );

    res.status(201).json({
      status: "success",
      message: "Transacción iniciada y email enviado al vendedor",
      data: {
        user: buyerId,
        product: productId,
        sellerEmail: sellerEmail,
      },
    });
  } catch (e) {
    next(e);
  }
}
