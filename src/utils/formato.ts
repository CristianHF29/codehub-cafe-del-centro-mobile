const CATEGORIAS: Record<string, string> = {
    clasicos: "Clásicos calientes",
    frios: "Especialidades frías",
    filtrados: "Filtrados de especialidad",
};

export function formatearPrecio(valor: number) {
    return `$${valor.toFixed(2)}`;
}

export function formatearFecha(iso: string) {
    return new Date(iso).toLocaleString("es-SV", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function primerNombre(nombre?: string) {
    return nombre?.trim().split(" ")[0] ?? "";
}

export function nombreCategoria(categoria?: string) {
    if (!categoria) return "Otros";
    return CATEGORIAS[categoria] ?? categoria.charAt(0).toUpperCase() + categoria.slice(1);
}