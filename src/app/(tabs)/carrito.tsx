import PantallaPendiente from "../../components/pantalla-pendiente";

export default function Carrito() {
  return (
    <PantallaPendiente
      etiqueta="Tu pedido"
      titulo="Carrito"
      descripcion="Revisá tus bebidas antes de confirmar el pedido."
      icono="cart-outline"
    />
  );
}