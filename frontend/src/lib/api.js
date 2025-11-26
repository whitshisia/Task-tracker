// src/lib/api.js
const API_BASE = process.env.REACT_APP_API || "http://127.0.0.1:8000";

export async function api(path, method = "GET", body = null) {
  const token = localStorage.getItem("stt_token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (res.status === 401) {
    // optional: redirect to login
    throw new Error("unauthorized");
  }

  if (res.status >= 400) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}
