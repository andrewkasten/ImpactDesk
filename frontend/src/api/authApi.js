import { API_BASE } from "./config";

const NETWORK_ERROR = "Can't reach the server. Check your connection.";

async function postJson(url, body) {
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { networkError: true };
  }
  let parsed = null;
  try {
    parsed = await res.json();
  } catch {
    // body wasn't JSON (e.g. an HTML 500 page) — leave parsed null
  }
  return { res, parsed };
}

export async function login(context) {
  const result = await postJson(`${API_BASE}/auth/get-token`, context);
  if (result.networkError) {
    return { ok: false, error: NETWORK_ERROR };
  }
  const { res, parsed } = result;
  if (res.ok && parsed?.token) {
    return { ok: true, token: parsed.token };
  }
  if (res.status === 400 || res.status === 401) {
    return { ok: false, error: "Invalid username or password." };
  }
  return { ok: false, error: `Server error (${res.status}). Please try again.` };
}

export async function signup(context) {
  const result = await postJson(`${API_BASE}/auth/signup`, context);
  if (result.networkError) {
    return { ok: false, error: NETWORK_ERROR };
  }
  const { res, parsed } = result;
  if (res.ok) {
    return { ok: true, data: parsed };
  }
  if (res.status === 400 && parsed && typeof parsed === "object") {
    const firstField = Object.keys(parsed)[0];
    const firstMsg = Array.isArray(parsed[firstField])
      ? parsed[firstField][0]
      : String(parsed[firstField]);
    return { ok: false, error: firstMsg, fieldErrors: parsed };
  }
  return { ok: false, error: `Server error (${res.status}). Please try again.` };
}
