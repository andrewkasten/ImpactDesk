import { API_BASE } from "./config";

async function basicFetch(url, payload) {
  const res = await fetch(url, payload);
  const body = await res.json();
  return body
}
export async function signup(context) {
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(context),
  };
  try {
    const body = await basicFetch(`${API_BASE}/auth/signup`, payload);
    return body;
  } catch (error) {
    console.log(error)
  }
}

export async function login(context) {
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(context),
  };
  const body = await basicFetch(
    `${API_BASE}/auth/get-token`,
    payload,
  );

  return body.token;
}
