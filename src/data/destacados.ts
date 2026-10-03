export type Destacado = {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
};

// Datos fijos para el inicio, luego vienen de la API
export const destacados: Destacado[] = [
    {
        id: 1,
        nombre: "Espresso Tradicional",
        descripcion: "Extracción intensa con notas de chocolate amargo y frutos rojos.",
        precio: 2.5,
    },
    {
        id: 2,
        nombre: "Latte de la Casa",
        descripcion: "Espresso balanceado con leche cremada al punto.",
        precio: 3.75,
    },
    {
        id: 3,
        nombre: "Cappuccino del Centro",
        descripcion: "Espuma densa y un toque de cacao sobre café de altura.",
        precio: 3.5,
    },
];