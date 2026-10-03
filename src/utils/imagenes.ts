import { Producto } from "../types";

const BASE = "https://images.unsplash.com/";
const PARAMETROS = "?auto=format&fit=crop&w=500&q=80";

// Fotos de referencia mientras el catálogo no tenga imágenes propias
const FOTOS = [
    { claves: ["espresso", "ristretto"], id: "photo-1510591509098-f4fdc6d0ff04" },
    { claves: ["cappuccino", "capuchino"], id: "photo-1572442388796-11668a67e53d" },
    { claves: ["latte", "flat white", "cortado", "mocha"], id: "photo-1541167760496-1628856ab772" },
    { claves: ["frí", "fria", "frio", "iced", "cold", "frapp", "helad"], id: "photo-1461023058943-07fcbe16d735" },
    { claves: ["americano", "filtrado", "v60", "chemex"], id: "photo-1495474472287-4d71bcdd2085" },
];

const GENERICA = "photo-1509042239860-f550ce710b93";

export function imagenDeProducto(producto: Producto) {
    if (producto.imagen) return producto.imagen;

    const texto = `${producto.nombre} ${producto.categoria ?? ""}`.toLowerCase();
    const foto = FOTOS.find((f) => f.claves.some((clave) => texto.includes(clave)));

    return `${BASE}${foto?.id ?? GENERICA}${PARAMETROS}`;
}