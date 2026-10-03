import { ItemCarrito, MetodoPago, Pedido, RespuestaPedido } from "../types";
import { peticion } from "./api";

type NuevoPedido = {
    usuarioId: number;
    items: ItemCarrito[];
    total: number;
    metodoPago: MetodoPago;
    referenciaPago?: string;
};

export function crearPedido(datos: NuevoPedido) {
    return peticion<RespuestaPedido>("/pedidos", {
        method: "POST",
        body: JSON.stringify(datos),
    });
}

export function obtenerPedidosDeUsuario(usuarioId: number) {
    return peticion<Pedido[]>(`/pedidos?usuarioId=${usuarioId}`);
}