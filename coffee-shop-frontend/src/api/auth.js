import { request, request_without_response } from "./api";

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

export async function register(name, email, password) {
    return request("/auth/register", {
        method: "POST",
        body: { name, email, password }
    });
}

export async function forgotPassword(email) {
    return request_without_response("/auth/forgot-password", {
        method: "POST",
        body: { email }
    });
}