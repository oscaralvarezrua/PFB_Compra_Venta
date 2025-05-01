import { createUser, getUserByEmail, getUserByUsername, getUserByPhone, getUserByValidationCode, trustPass, getUserListModel, getUserDetailModel, rateSellerModel, updatePass, getUserInf, userValidation, generateRecoverCode, verifyRecoverCode, updatePassWithRecovery, getUserById, updateUserModel } from "../models/userModels.js";
import Joi from "joi";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendValidationEmail, sendRecoveryEmail } from "../utils/emailConfig.js";
import { savePhoto, deletePhoto } from "../utils/helpers.js";

//Validación del usuario registrado (schema)
const userSchema = Joi.object({
  username: Joi.string()
    .min(5)
    .max(25)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
      "string.pattern.base": "El username solo puede contener letras, números y barra baja.",
      "string.min": "Nombre de usuario demasiado corto, debe tener al menos 5 caracteres.",
      "string.max": "Nombre de usuario demasiado largo, debe tener como maximo 25 caracteres.",
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
      "string.pattern.base": "La contraseña debe contener una minuscula, una mayuscula, un número y un caracter especial.",
      "string.min": "La contraseña es demasiado corta, debe tener al menos 10 caracteres.",
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
});

//Validación de datos que se pueden actualizar del Usuario
const UpdateUserSchema = Joi.object({
  username: Joi.string()
    .min(5)
    .max(25)
    .required()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .messages({
      "string.pattern.base": "El username solo puede contener letras, números y barra baja.",
      "string.min": "Nombre de usuario demasiado corto, debe tener al menos 5 caracteres.",
      "string.max": "Nombre de usuario demasiado largo, debe tener como maximo 25 caracteres.",
      "any.required": "El campo nombre es obligatorio.",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{9,15}$/) //? ^(?=.*[^\w\d\s][0-9\+\-\(\)\])  se puede cambiar por este para permitir simbolos y dar más juego para poner +34 por ejemplo
    .required()
    .messages({
      "string.pattern.base": "El teléfono debe contener solo números",
      "any.required": "El campo telefono es obligatorio.",
    }),

  biography: Joi.string().allow("").max(500).optional(),
});

//Control el registro de usuario

const userContoler = async (req, res, next) => {
  try {
    //Validamos los datos introducidos por el usuario
    const { error, value } = userSchema.validate(req.body, {
      allowUnknown: true,
    });

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: "error",
        message: errorMessage,
      });
    }

    const { username, email, password, phone, biography } = value;

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

    //Verificar si ya hay una cuenta con ese teléfono
    const verifyPhone = await getUserByPhone(phone);

    if (verifyPhone) {
      return res.status(409).json({
        status: "error",
        message: "El telefono no está disponible", //! Da información de que ese correo tiene una cuenta
      });
    }
    let avatarUrl = null;

    if (req.files && req.files.avatar) {
      try {
        avatarUrl = await savePhoto(req.files.avatar);
      } catch (error) {
        return res.status(400).json({
          status: "error",
          message: error.message,
        });
      }
    }

    // Generar código de validación
    const validationCode = crypto.randomBytes(40).toString("hex");

    //Guardar usuario en la bbdd
    const userBbdd = await createUser(username, email, password, phone, biography, avatarUrl, validationCode);

    // Enviar correo de validación
    try {
      await sendValidationEmail(email, username, validationCode);
    } catch (emailError) {
      console.error("Error al enviar el correo de validación:", emailError);
      //! No devolvemos el error al usuario para no exponer problemas del servidor
    }

    res.status(201).json({
      status: "success",
      message: "Cuenta creada creada! Por favor revisa el correo para validarla :)",
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

//Actualizar usuario
const updateUserContoler = async (req, res, next) => {
  try {
    //Validamos los datos introducidos por el usuario
    const { error, value } = UpdateUserSchema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: "error",
        message: errorMessage,
      });
    }

    const oldDataUser = await getUserById(req.user.id);

    const { username, phone, biography } = value;

    if (username === oldDataUser.username && phone === oldDataUser.phone && biography === oldDataUser.biography && !req.files?.avatar) {
      return res.status(200).json({
        status: "nothing_changed",
        message: "No se han detectado cambios en los datos",
      });
    }

    if (username !== oldDataUser.username) {
      //Verificar si ya hay una cuenta con ese usuario
      const verifyUsername = await getUserByUsername(username);
      if (verifyUsername) {
        return res.status(409).json({
          status: "error",
          message: "El username no está disponible",
        });
      }
    }

    if (phone != oldDataUser.phone) {
      //Verificar si ya hay una cuenta con ese teléfono
      const verifyPhone = await getUserByPhone(phone);
      if (verifyPhone) {
        return res.status(409).json({
          status: "error",
          message: "El telefono no está disponible", //! Da información de que ese correo tiene una cuenta
        });
      }
    }

    //modificamos imagen del avatar
    let newAvatarUrl = oldDataUser.avatar;

    if (req.files && req.files.avatar) {
      try {
        // Si hay un avatar existente, lo borramos
        if (oldDataUser.avatar) {
          await deletePhoto(oldDataUser.avatar);
        }
        newAvatarUrl = await savePhoto(req.files.avatar);
      } catch (error) {
        return res.status(400).json({
          status: "error",
          message: error.message,
        });
      }
    }

    //Guardar usuario en la bbdd
    await updateUserModel(username, phone, biography, newAvatarUrl, req.user.id);

    res.status(200).json({
      status: "success",
      message: "Datos del usuario actualizados correctamente",
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
      "string.pattern.base": "La contraseña debe contener una minuscula, una mayuscula y un número.",
      "string.min": "La contraseña es demasiado corta, debe tener al menos 10 caracteres.",
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

//Solicitud de recuperación de contraseña (schema)
const recoveryRequestSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email debe tener un formato válido",
    "any.required": "El campo email es obligatorio",
  }),
});

//Cambio de contraseña (schema)
const recoveryPassSchema = Joi.object({
  password: Joi.string()
    .min(10)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{10,}$/)
    .messages({
      "string.pattern.base": "La contraseña debe contener una minuscula, una mayuscula, un número y un caracter especial.",
      "string.min": "La contraseña es demasiado corta, debe tener al menos 10 caracteres.",
      "any.required": "El campo contraseña es obligatorio.",
    }),
  repeatPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Las contraseñas no coinciden :(",
    "any.required": "El campo repetir contraseña es obligatorio",
  }),
});

// Controlador para solicitar recuperación de contraseña
const requestPassRecovery = async (req, res, next) => {
  try {
    const { error, value } = recoveryRequestSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    const { email } = value;

    // Verificar si el email existe
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "No existe una cuenta con ese email",
      });
    }

    // Generar código de recuperación
    const recoveryCode = await generateRecoverCode(email);

    // Enviar email con el código
    await sendRecoveryEmail(email, recoveryCode);

    res.status(200).json({
      status: "success",
      message: "Se ha enviado un correo con las instrucciones para recuperar tu contraseña",
    });
  } catch (error) {
    next(error);
  }
};

// Controlador para cambiar la contraseña con el código de recuperación
const changePassWithRecovery = async (req, res, next) => {
  try {
    const { recoveryCode } = req.params;
    const { error, value } = recoveryPassSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    // Verificar el código de recuperación
    const user = await verifyRecoverCode(recoveryCode);
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Código de recuperación inválido o expirado",
      });
    }

    // Actualizar la contraseña
    await updatePassWithRecovery(recoveryCode, value.password);

    res.status(200).json({
      status: "success",
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export { userContoler, validateUserController, userLogin, changePass, getUserInfo, requestPassRecovery, changePassWithRecovery, updateUserContoler };

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
