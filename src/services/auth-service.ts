import { Usuario } from "../types";
import { peticion } from "./api";

type DatosRegistro = {
    nombre: string;
    email: string;
    password: string;
};

export function login(email: string, password: string) {
    return peticion<Usuario>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export function registrar(datos: DatosRegistro) {
    return peticion<unknown>("/auth/registro", {
        method: "POST",
        body: JSON.stringify(datos),
    });
}

export function obtenerUsuario(id: number) {
    return peticion<Usuario>(`/usuarios/${id}`);
}