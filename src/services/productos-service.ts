import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Producto } from "../types";
import { db } from "./firebase";

export async function obtenerProductos(): Promise<Producto[]> {
  const consulta = query(collection(db, "productos"), orderBy("orden"));
  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...(documento.data() as Omit<Producto, "id">),
  }));
}