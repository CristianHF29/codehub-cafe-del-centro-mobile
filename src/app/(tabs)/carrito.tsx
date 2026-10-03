import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Boton from "../../components/boton";
import Encabezado from "../../components/encabezado";
import EstadoVacio from "../../components/estado-vacio";
import FilaCarrito from "../../components/fila-carrito";
import Pantalla from "../../components/pantalla";
import Tarjeta from "../../components/tarjeta";
import { colores, espacio, fuentes } from "../../constants/theme";
import { useCarrito } from "../../context/carrito-context";
import { useSesion } from "../../context/sesion-context";
import { mensajeError } from "../../services/api";
import { crearPedido } from "../../services/pedidos-service";
import { formatearPrecio } from "../../utils/formato";

export default function Carrito() {
  const { usuario, actualizarPuntos } = useSesion();
  const { items, total, cambiarCantidad, vaciar } = useCarrito();
  const [enviando, setEnviando] = useState(false);

  if (items.length === 0) {
    return (
      <EstadoVacio
        icono="cart-outline"
        titulo="Tu carrito está vacío"
        texto="Agrega una bebida desde el menú para armar tu pedido."
        accion={{ titulo: "Ir al menú", onPress: () => router.push("/menu") }}
      />
    );
  }

  async function confirmar() {
    if (!usuario) return;

    setEnviando(true);
    try {
      const respuesta = await crearPedido({
        usuarioId: usuario.id,
        items,
        total: Number(total.toFixed(2)),
      });

      actualizarPuntos(respuesta.puntosTotales);
      vaciar();
      Alert.alert(
        "¡Pedido confirmado!",
        `Ganaste ${respuesta.puntosGanados} puntos. Puedes seguir el estado en tu cuenta.`
      );
    } catch (e) {
      Alert.alert("No se pudo enviar el pedido", mensajeError(e));
    } finally {
      setEnviando(false);
    }
  }

  function preguntarVaciar() {
    Alert.alert("Vaciar carrito", "¿Quieres quitar todas las bebidas?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Vaciar", style: "destructive", onPress: vaciar },
    ]);
  }

  return (
    <Pantalla>
      <Encabezado etiqueta="Tu pedido" titulo="Carrito" />

      {items.map((item) => (
        <FilaCarrito
          key={`${item.id}-${item.tamano}`}
          item={item}
          onCambiar={(cambio) => cambiarCantidad(item.id, item.tamano, cambio)}
        />
      ))}

      <Tarjeta style={styles.resumen}>
        <View style={styles.fila}>
          <Text style={styles.etiqueta}>Total</Text>
          <Text style={styles.total}>{formatearPrecio(total)}</Text>
        </View>
        <Text style={styles.puntos}>Con este pedido ganas {Math.floor(total)} puntos</Text>
      </Tarjeta>

      <Boton titulo="Confirmar pedido" onPress={confirmar} cargando={enviando} />
      <Boton titulo="Vaciar carrito" variante="secundario" onPress={preguntarVaciar} />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  resumen: {
    gap: espacio.xs,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  etiqueta: {
    fontFamily: fuentes.medio,
    fontSize: 16,
    color: colores.texto,
  },
  total: {
    fontFamily: fuentes.titulo,
    fontSize: 30,
    color: colores.texto,
  },
  puntos: {
    fontFamily: fuentes.texto,
    fontSize: 13,
    color: colores.caramelo,
  },
});