export const TAMANOS = ["16oz", "20oz", "24oz", "32oz"] as const;

export type Tamano = (typeof TAMANOS)[number];

export type Usuario = {
    id: number;
    nombre: string;
    email: string;
    rol: "cliente" | "admin";
    puntos: number;
};

export type Producto = {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    imagen?: string;
    disponible?: boolean;
    precios: Record<Tamano, number>;
};

export type ItemCarrito = {
    id: number;
    nombre: string;
    tamano: Tamano;
    precio: number;
    cantidad: number;
};

export type EstadoPedido = "pendiente" | "listo" | "entregado";

export type Pedido = {
    id: number;
    usuarioId: number;
    items: ItemCarrito[];
    total: number;
    estado: EstadoPedido;
    fecha: string;
};

export type RespuestaPedido = {
    pedido: Pedido;
    puntosGanados: number;
    puntosTotales: number;
};