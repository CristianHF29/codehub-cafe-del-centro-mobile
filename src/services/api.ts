import { API_URL } from "../constants/config";

export async function peticion<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
    let respuesta: Response;

    try {
        respuesta = await fetch(`${API_URL}${ruta}`, {
            ...opciones,
            headers: { "Content-Type": "application/json" },
        });
    } catch {
        throw new Error("No se pudo conectar con el servidor. Revisa tu conexión.");
    }

    const datos = await respuesta.json().catch(() => null);

    if (!respuesta.ok) {
        throw new Error(datos?.mensaje ?? "Ocurrió un error inesperado");
    }

    return datos as T;
}

export function mensajeError(error: unknown) {
    return error instanceof Error ? error.message : "Ocurrió un error inesperado";
}