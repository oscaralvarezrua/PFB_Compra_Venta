export async function getProducts(order = "recent") {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/products/search?order_by=${order}`
  );
  const body = await res.json();
  if (!res.ok) throw new Error(body.message);
  return body.data;
}
