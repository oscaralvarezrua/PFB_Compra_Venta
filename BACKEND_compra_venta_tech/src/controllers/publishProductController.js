import { publishProduct } from "../models/productModels.js";
import { generateError, savePhoto } from "../utils/helpers.js";
import Joi from "joi";

//Validación de la publicación del producto (schema)
const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede superar los 50 caracteres",
  }),
  description: Joi.string().allow("").max(1000).messages({
    "string.max": "La descripción no puede superar los 1000 caracteres",
  }),
  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser mayor que cero",
    "any.required": "El precio es obligatorio",
  }),

  locality: Joi.string().max(100).required().messages({
    "string.empty": "La localidad es obligatoria",
    "string.max": "La localidad no puede superar los 100 caracteres",
  }),
  category_id: Joi.number().integer().positive().required().messages({
    "number.base": "El ID de la categoría debe ser un número",
    "any.required": "El ID de la categoría es obligatorio",
  }),
});

//Creamos función controladora para la publicación de un nuevo artículo
export default async function publishProductController(req, res, next) {
  try {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: "error",
        message: errorMessage,
      });
    }

    const userid = req.user.id;
    const { name, description, price, locality, category_id } = value;

    if (!name || !price || !locality || !category_id) {
      throw generateError("Faltan campos obligatorios", 400);
    }
    //aseguramos que el archivo es una imagen
    if (!req.files || !req.files.photo) {
      return res.status(400).json({
        status: "error",
        message: "No se ha subido ninguna foto.",
      });
    }
    const photo = req.files.photo;

    const photoUrl = await savePhoto(photo);

    const productId = await publishProduct(
      name,
      description,
      price,
      photoUrl,
      locality,
      userid,
      category_id
    );

    res.status(201).json({
      status: "OK",
      message: "El producto se ha publicado correctamente",
      data: {
        id: productId,
        name,
        price,
        locality,
        category_id,
      },
    });
  } catch (e) {
    next(e);
  }
}
