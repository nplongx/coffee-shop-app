import { request } from "./api";

export async function login(email, password) {
    return request("/auth/login", {
        method: "POST",
        body: { email, password }
    });
}

export async function logout(token) {
    return request("/auth/logout", {
        method: "POST",
        token
    });
}

export async function register(email, password) {
    return request("/auth/register", {
        method: "POST",
        body: { email, password }
    });
}