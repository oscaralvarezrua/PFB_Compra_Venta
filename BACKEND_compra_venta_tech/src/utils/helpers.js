//Funciones reutilizables
export function generateError(msg, code) {
  let error = new Error(msg);
  error.httpCode = code;
  return error;
}