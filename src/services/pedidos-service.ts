import {
  collection,
  doc,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { ItemCarrito, MetodoPago, Pedido, RespuestaPedido } from "../types";
import { db } from "./firebase";

type NuevoPedido = {
  usuarioId: string;
  items: ItemCarrito[];
  total: number;
  metodoPago: MetodoPago;
  referenciaPago?: string;
};

export async function crearPedido(datos: NuevoPedido): Promise<RespuestaPedido> {
  const referenciaUsuario = doc(db, "usuarios", datos.usuarioId);
  const referenciaPedido = doc(collection(db, "pedidos"));
  const puntosGanados = Math.floor(datos.total);
  const fecha = new Date().toISOString();

  const pedido: Pedido = {
    id: referenciaPedido.id,
    usuarioId: datos.usuarioId,
    items: datos.items,
    total: datos.total,
    estado: "pendiente",
    fecha,
    metodoPago: datos.metodoPago,
    referenciaPago: datos.referenciaPago ?? null,
  };

  // El pedido y la suma de puntos se guardan juntos: se aplican los dos o ninguno
  const puntosTotales = await runTransaction(db, async (transaccion) => {
    const usuario = await transaccion.get(referenciaUsuario);
    const puntosActuales = usuario.data()?.puntos ?? 0;
    const nuevosPuntos = puntosActuales + puntosGanados;

    const { id, ...datosPedido } = pedido;
    transaccion.set(referenciaPedido, { ...datosPedido, creado: serverTimestamp() });
    transaccion.update(referenciaUsuario, { puntos: nuevosPuntos });

    return nuevosPuntos;
  });

  return { pedido, puntosGanados, puntosTotales };
}

export function escucharPedidosDeUsuario(
  usuarioId: string,
  alCambiar: (pedidos: Pedido[]) => void,
  alFallar?: (error: Error) => void
) {
  const consulta = query(collection(db, "pedidos"), where("usuarioId", "==", usuarioId));

  return onSnapshot(
    consulta,
    (resultado) => {
      const pedidos = resultado.docs.map((documento) => ({
        id: documento.id,
        ...(documento.data() as Omit<Pedido, "id">),
      }));

      pedidos.sort((a, b) => b.fecha.localeCompare(a.fecha));
      alCambiar(pedidos);
    },
    alFallar
  );
}