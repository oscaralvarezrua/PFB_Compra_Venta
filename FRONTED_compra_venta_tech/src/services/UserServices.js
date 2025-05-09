const { VITE_API_URL } = import.meta.env;

//Llamadas al backend
export async function loginService(userData) {

  let res = await fetch(VITE_API_URL + "/users/login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}
