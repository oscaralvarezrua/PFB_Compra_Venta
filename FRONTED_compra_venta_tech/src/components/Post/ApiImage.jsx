export default function ApiImage({ name, ...rest }) {
  const { VITE_API_URL } = import.meta.env;
  //console.log("ruta imagen " + VITE_API_URL + "/" + name);

  return <img src={VITE_API_URL + "/" + name} {...rest} />;
}
