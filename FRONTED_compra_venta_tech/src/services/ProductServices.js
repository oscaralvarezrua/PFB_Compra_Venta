const API_URL = import.meta.env.VITE_API_URL;

// Trae productos ordenados
export async function getProducts(token, order = "recent") {
  const res = await fetch(`${API_URL}/products/search?order_by=${order}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message);
  return body.data;
}

// Trae sólo los productos pendientes de aprobación
export async function getPendingProducts(token) {
  const res = await fetch(`${API_URL}/products?is_accepted=false`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message);
  return body.data;
}

// Aprueba un producto concreto
export async function approveProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_accepted: true }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message);
  return body.data;
}

// Rechaza un producto concreto
export async function rejectProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_accepted: false }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.message);
  return body.data;
}
