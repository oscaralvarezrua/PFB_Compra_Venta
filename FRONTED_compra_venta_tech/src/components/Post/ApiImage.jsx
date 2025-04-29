export default function ApiImage({ name, ...rest }) {
  const { VITE_API_URL } = import.meta.env;
  return <img src={VITE_API_URL + "/" + name} {...rest} />;
}
