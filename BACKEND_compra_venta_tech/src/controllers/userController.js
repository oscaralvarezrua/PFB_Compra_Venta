import {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserByPhone,
  getUserByValidationCode,
  trustPass,
  getUserListModel,
  getUserDetailModel,
  rateSellerModel,
  updatePass,
  getUserInf,
  userValidation,
} from "../models/userModels.js";
import Joi from "joi";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendValidationEmail } from "../utils/emailConfig.js";

//import { generateError } from "../utils/helpers.js";

//Validación del usuario registrado (schema)
const userSchema = Joi.object({
  username: Joi.string()
    .min(5)
    .max(25)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
      "string.pattern.base":
        "El username solo puede contener letras, números y barra baja.",
      "string.min":
        "Nombre de usuario demasiado corto, debe tener al menos 5 caracteres.",
      "string.max":
        "Nombre de usuario demasiado largo, debe tener como maximo 25 caracteres.",
      "any.required": "El campo nombre es obligatorio.",
    }),

  email: Joi.string().email().required().messages({
    "string.email": "Debes escribir un email valido.",
    "any.required": "El campo correo es obligatorio",
  }),

  password: Joi.string()
    .min(10)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{10,}$/)
    .messages({
      "string.pattern.base":
        "La contraseña debe contener una minuscula, una mayuscula, un número y un caracter especial.",
      "string.min":
        "La contraseña es demasiado corta, debe tener al menos 10 caracteres.",
      "any.required": "El campo contraseña es obligatorio.",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{9,15}$/) //? ^(?=.*[^\w\d\s][0-9\+\-\(\)\])  se puede cambiar por este para permitir simbolos y dar más juego para poner +34 por ejemplo
    .required()
    .messages({
      "string.pattern.base": "El teléfono debe contener solo números",
      "any.required": "El campo telefono es obligatorio.",
    }),

  biography: Joi.string().allow("").max(500).optional(),

  avatar: Joi.string().allow("").optional(""),
});

//Control el registro de usuario

const userContoler = async (req, res, next) => {
  try {
    //Validamos los datos introducidos por el usuario
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: "error",
        message: errorMessage,
      });
    }

    const { username, email, password, phone, biography, avatar } = value;

    //Verificar si ya hay una cuenta con ese email
    const verifyEmail = await getUserByEmail(email);

    if (verifyEmail) {
      return res.status(409).json({
        status: "error",
        message: "Ya existe una cuenta con ese email", //! Da información de que ese correo tiene una cuenta
      });
    }

    //Verificar si ya hay una cuenta con ese usuario
    const verifyUsername = await getUserByUsername(username);

    if (verifyUsername) {
      return res.status(409).json({
        status: "error",
        message: "El username no está disponible", //! Da información de que ese correo tiene una cuenta
      });
    }

    //Verificar si ya hay una cuenta con ese usuario
    const verifyPhone = await getUserByPhone(phone);

    if (verifyPhone) {
      return res.status(409).json({
        status: "error",
        message: "El telefono no está disponible", //! Da información de que ese correo tiene una cuenta
      });
    }

    // Generar código de validación
    const validationCode = crypto.randomBytes(40).toString("hex");

    //Guardar usuario en la bbdd
    const userBbdd = await createUser(
      username,
      email,
      password,
      phone,
      biography,
      avatar,
      validationCode
    );

    // Enviar correo de validación
    try {
      await sendValidationEmail(email, username, validationCode);
    } catch (emailError) {
      console.error("Error al enviar el correo de validación:", emailError);
      //! No devolvemos el error al usuario para no exponer problemas del servidor
    }

    res.status(201).json({
      status: "success",
      message:
        "Cuenta creada creada! Por favor revisa el correo para validarla :)",
      data: {
        id: userBbdd,
        username,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Controlar la validacion del usuario
const validateUserController = async (req, res) => {
  // Quitamos next si no lo vamos a usar
  try {
    const { validationCode } = req.params;

    // Comprueba que hay ese código de validación
    const user = await getUserByValidationCode(validationCode);

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Código ya usado o incorrecto",
      });
    }

    // Validar el usuario usando la función del modelo
    const isValid = await userValidation(user.email, validationCode);

    if (!isValid) {
      return res.status(400).json({
        status: "error",
        message: "No se ha validado al usuario",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Se ha validado el usuario",
    });
  } catch (error) {
    console.error("Error en la validación:", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  }
};

//VAlidacion del login (schema)
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email debe tener un formato válido",
    "any.required": "El campo email es obligatorio",
  }),

  password: Joi.string().required().messages({
    "any.required": "El campo contraseña es obligatorio",
  }),
});

//Controlar el login
const userLogin = async (req, res, next) => {
  try {
    //Comprobamos los datos de entrada
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    const { email, password } = value;

    //Obtener el usuario por email
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Email o contraseña incorrectos",
      });
    }

    //Comprobar usuario valido
    if (user.validation_code) {
      return res.status(401).json({
        status: "error",
        message: "No se ha validado esta cuenta",
      });
    }

    //Comprobar la pass
    const validatedPass = await trustPass(password, user.password);

    if (!validatedPass) {
      return res.status(401).json({
        status: "error",
        message: "Email o contraseña incorrectos",
      });
    }

    //Generar Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      message: "Logueado correctamente",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const changePassSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "any.required": "Por favor indique la contraseña actual.",
  }),

  newPassword: Joi.string()
    .min(10)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{10,}$/)
    .messages({
      "string.pattern.base":
        "La contraseña debe contener una minuscula, una mayuscula y un número.",
      "string.min":
        "La contraseña es demasiado corta, debe tener al menos 10 caracteres.",
      "any.required": "El campo contraseña es obligatorio.",
    }),
});

const changePass = async (req, res, next) => {
  try {
    const { error, value } = changePassSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    const { currentPassword, newPassword } = value;
    const userId = req.user.id;
    const isValid = await trustPass(currentPassword, req.user.password);

    if (!isValid) {
      return res.status(401).json({
        status: "error",
        message: "La contraseña actual no es correcta",
      });
    }

    await updatePass(userId, newPassword);
    res.status(200).json({
      status: "success",
      message: "La contraseña se actualizó correctamente",
    });
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userInfo = await getUserInf(userId);

    res.status(200).json({
      status: "success",
      data: userInfo,
    });
  } catch (error) {
    next(error);
  }
};

export {
  userContoler,
  validateUserController,
  userLogin,
  changePass,
  getUserInfo,
};

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
