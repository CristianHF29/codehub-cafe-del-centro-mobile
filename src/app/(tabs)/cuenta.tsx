import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import Boton from "../../components/boton";
import Encabezado from "../../components/encabezado";
import Pantalla from "../../components/pantalla";
import Tarjeta from "../../components/tarjeta";
import TarjetaPedido from "../../components/tarjeta-pedido";
import { colores, espacio, fuentes, radio } from "../../constants/theme";
import { useSesion } from "../../context/sesion-context";
import { escucharPedidosDeUsuario } from "../../services/pedidos-service";
import { Pedido } from "../../types";

export default function Cuenta() {
  const { usuario, cerrarSesion } = useSesion();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const id = usuario?.id;

  // Firestore avisa cada vez que cambia un pedido, sin volver a consultar
  useEffect(() => {
    if (!id) return;

    return escucharPedidosDeUsuario(
      id,
      (lista) => {
        setPedidos(lista);
        setCargando(false);
      },
      () => setCargando(false)
    );
  }, [id]);

  function preguntarSalida() {
    Alert.alert("Cerrar sesión", "¿Quieres salir de tu cuenta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: cerrarSesion },
    ]);
  }

  if (!usuario) return null;

  return (
    <Pantalla>
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

      {cargando ? (
        <ActivityIndicator color={colores.caramelo} style={styles.cargando} />
      ) : pedidos.length === 0 ? (
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
  cargando: {
    marginVertical: espacio.lg,
  },
  vacio: {
    fontFamily: fuentes.texto,
    fontSize: 14,
    color: colores.textoSuave,
    textAlign: "center",
  },
});