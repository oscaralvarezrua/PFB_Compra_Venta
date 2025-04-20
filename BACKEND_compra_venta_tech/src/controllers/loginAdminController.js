import { getUserByEmail, trustPass } from "../models/userModels.js";
import Joi from "joi";
import jwt from "jsonwebtoken";

const { PASSWORD_ADMIN } = process.env;
import setAdminModel from "../models/adminModel.js";

//Validación del login Administrador
const loginSchemaAdmin = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email debe tener un formato válido",
    "any.required": "El campo email es obligatorio",
  }),

  password: Joi.string().required().messages({
    "any.required": "El campo contraseña es obligatorio",
  }),
  passwordAdmin: Joi.string().required().messages({
    "any.required": "El campo contraseña es obligatorio",
  }),
});

//Controlar el login del Administrador
const adminLogin = async (req, res, next) => {
  try {
    //Comprobamos los datos de entrada
    const { error, value } = loginSchemaAdmin.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    const { email, password, passwordAdmin } = value;

    //Obtener el usuario por email
    let user = await getUserByEmail(email);

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
    let validatedPassAdmin = false;

    if (passwordAdmin === PASSWORD_ADMIN) {
      validatedPassAdmin = true;
    }
    if (!validatedPass || !validatedPassAdmin) {
      return res.status(401).json({
        status: "error",
        message: "Email o contraseña incorrectos",
      });
    }

    if (validatedPassAdmin) {
      console.log(user.id);

      await setAdminModel(user.id);
      //Obtener el usuario actualizado ya como Admin
      user = await getUserByEmail(email);
    }

    //Generar Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      message: "Administrador Logueado correctamente",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          rol: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export { adminLogin };
