import { useCallback, useEffect, useState } from "react";
import { mensajeError } from "../services/api";
import { obtenerProductos } from "../services/productos-service";
import { Producto } from "../types";

export function useProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const cargar = useCallback(async () => {
        setCargando(true);
        setError(null);

        try {
            const datos = await obtenerProductos();
            setProductos(datos.filter((p) => p.disponible !== false));
        } catch (e) {
            setError(mensajeError(e));
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargar();
    }, [cargar]);

    return { productos, cargando, error, recargar: cargar };
}