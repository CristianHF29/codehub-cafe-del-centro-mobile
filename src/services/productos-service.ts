import { Producto } from "../types";
import { peticion } from "./api";

export function obtenerProductos() {
    return peticion<Producto[]>("/productos");
}