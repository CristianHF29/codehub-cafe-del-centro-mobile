import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ItemCarrito, Producto, Tamano } from "../types";
import { useSesion } from "./sesion-context";

type CarritoValor = {
    items: ItemCarrito[];
    total: number;
    cantidadTotal: number;
    agregar: (producto: Producto, tamano: Tamano, cantidad?: number) => void;
    cambiarCantidad: (id: number, tamano: Tamano, cambio: number) => void;
    vaciar: () => void;
};

const CarritoContext = createContext<CarritoValor | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
    const { usuario } = useSesion();
    const [items, setItems] = useState<ItemCarrito[]>([]);

    // Al cerrar sesión el carrito no pasa al siguiente usuario
    useEffect(() => {
        if (!usuario) setItems([]);
    }, [usuario]);

    function agregar(producto: Producto, tamano: Tamano, cantidad = 1) {
        setItems((actuales) => {
            const existe = actuales.some((i) => i.id === producto.id && i.tamano === tamano);

            if (existe) {
                return actuales.map((i) =>
                    i.id === producto.id && i.tamano === tamano
                        ? { ...i, cantidad: i.cantidad + cantidad }
                        : i
                );
            }

            return [
                ...actuales,
                {
                    id: producto.id,
                    nombre: producto.nombre,
                    tamano,
                    precio: producto.precios[tamano],
                    cantidad,
                },
            ];
        });
    }

    function cambiarCantidad(id: number, tamano: Tamano, cambio: number) {
        setItems((actuales) =>
            actuales
                .map((i) => (i.id === id && i.tamano === tamano ? { ...i, cantidad: i.cantidad + cambio } : i))
                .filter((i) => i.cantidad > 0)
        );
    }

    function vaciar() {
        setItems([]);
    }

    const total = items.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
    const cantidadTotal = items.reduce((suma, i) => suma + i.cantidad, 0);

    return (
        <CarritoContext.Provider
            value={{ items, total, cantidadTotal, agregar, cambiarCantidad, vaciar }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    const contexto = useContext(CarritoContext);
    if (!contexto) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
    return contexto;
}