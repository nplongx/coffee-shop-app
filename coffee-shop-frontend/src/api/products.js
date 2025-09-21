import { request } from "./api";

// src/api/api.js
const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts(token) {
  return request("/products", { token });
}

export async function getProductById(id, token) {
  return request(`/products/${id}`, { token });
}