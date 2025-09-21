// src/api/api.js
const API_URL = import.meta.env.VITE_API_URL;

export async function request(endpoint, { token, method = "GET", body } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error(`Request failed: ${res.status} ${errMsg}`);
  }

  return res.json();
}