import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Boton from "../../components/boton";
import Encabezado from "../../components/encabezado";
import Pantalla from "../../components/pantalla";
import Tarjeta from "../../components/tarjeta";
import TarjetaPedido from "../../components/tarjeta-pedido";
import { colores, espacio, fuentes, radio } from "../../constants/theme";
import { useSesion } from "../../context/sesion-context";
import { obtenerUsuario } from "../../services/auth-service";
import { obtenerPedidosDeUsuario } from "../../services/pedidos-service";
import { Pedido } from "../../types";

const INTERVALO_ACTUALIZACION = 5000;

export default function Cuenta() {
  const { usuario, cerrarSesion, actualizarPuntos } = useSesion();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const id = usuario?.id;

  const cargar = useCallback(
    async (silencioso = false) => {
      if (!id) return;
      if (!silencioso) setCargando(true);

      const [lista, datos] = await Promise.allSettled([
        obtenerPedidosDeUsuario(id),
        obtenerUsuario(id),
      ]);

      if (lista.status === "fulfilled") {
        setPedidos([...lista.value].sort((a, b) => b.fecha.localeCompare(a.fecha)));
      }
      if (datos.status === "fulfilled") {
        actualizarPuntos(datos.value.puntos);
      }

      if (!silencioso) setCargando(false);
    },
    [id, actualizarPuntos]
  );

  // Mientras la pestaña está abierta, revisa cambios hechos desde el panel web
  useFocusEffect(
    useCallback(() => {
      cargar();
      const intervalo = setInterval(() => cargar(true), INTERVALO_ACTUALIZACION);
      return () => clearInterval(intervalo);
    }, [cargar])
  );

  function preguntarSalida() {
    Alert.alert("Cerrar sesión", "¿Quieres salir de tu cuenta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: cerrarSesion },
    ]);
  }

  if (!usuario) return null;

  return (
    <Pantalla refrescando={cargando} onRefrescar={() => cargar()}>
      <Encabezado
        etiqueta="Mi cuenta"
        titulo={usuario.nombre ?? "Cliente"}
        descripcion={usuario.email}
      />

      <View style={styles.puntos}>
        <Text style={styles.puntosEtiqueta}>TUS PUNTOS</Text>
        <Text style={styles.puntosValor}>{usuario.puntos ?? 0}</Text>
        <Text style={styles.puntosTexto}>Ganas un punto por cada dólar en tus pedidos.</Text>
      </View>

      <Text style={styles.subtitulo}>Historial de pedidos</Text>

      {pedidos.length === 0 && !cargando ? (
        <Tarjeta>
          <Text style={styles.vacio}>Aún no has hecho pedidos.</Text>
        </Tarjeta>
      ) : (
        pedidos.map((pedido) => <TarjetaPedido key={pedido.id} pedido={pedido} />)
      )}

      <Boton titulo="Cerrar sesión" variante="secundario" onPress={preguntarSalida} />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  puntos: {
    backgroundColor: colores.cafe,
    borderRadius: radio.md,
    padding: espacio.lg,
    alignItems: "center",
  },
  puntosEtiqueta: {
    fontFamily: fuentes.negrita,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colores.caramelo,
  },
  puntosValor: {
    fontFamily: fuentes.titulo,
    fontSize: 48,
    color: "#FFFFFF",
  },
  puntosTexto: {
    fontFamily: fuentes.texto,
    fontSize: 13,
    color: colores.sobreOscuro,
    textAlign: "center",
  },
  subtitulo: {
    fontFamily: fuentes.titulo,
    fontSize: 22,
    color: colores.texto,
    marginTop: espacio.sm,
  },
  vacio: {
    fontFamily: fuentes.texto,
    fontSize: 14,
    color: colores.textoSuave,
    textAlign: "center",
  },
});