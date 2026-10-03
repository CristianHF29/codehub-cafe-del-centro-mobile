import { ActivityIndicator, Pressable, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Pantalla from "../../components/pantalla";
import Encabezado from "../../components/encabezado";
import Tarjeta from "../../components/tarjeta";
import TarjetaProducto from "../../components/tarjeta-producto";
import Boton from "../../components/boton";
import { useSesion } from "../../context/sesion-context";
import { useProductos } from "../../hooks/use-productos";
import { primerNombre } from "../../utils/formato";
import { colores, espacio, fuentes, radio } from "../../constants/theme";

export default function Inicio() {
  const { usuario } = useSesion();
  const { productos, cargando } = useProductos();
  const destacados = productos.slice(0, 3);

  return (
    <Pantalla>
      <View style={styles.cabecera}>
        <View>
          <Text style={styles.marca}>Café del Centro</Text>
          <Text style={styles.submarca}>CAFÉ DE ESPECIALIDAD</Text>
        </View>
        <Pressable style={styles.puntos} onPress={() => router.push("/cuenta")}>
          <Ionicons name="star" size={14} color={colores.caramelo} />
          <Text style={styles.puntosTexto}>{usuario?.puntos ?? 0} pts</Text>
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroEtiqueta}>
          HOLA, {primerNombre(usuario?.nombre).toUpperCase()}
        </Text>
        <Text style={styles.heroTitulo}>El Centro es aquí</Text>
        <Text style={styles.heroTexto}>
          Café de especialidad salvadoreño, preparado a unos pasos de la Plaza Barrios.
        </Text>
        <Boton titulo="Pedir ahora" onPress={() => router.push("/menu")} />
      </View>

      <Tarjeta style={styles.reconocimiento}>
        <Text style={styles.numero}>No. 59</Text>
        <Text style={styles.premio}>BEST CAFÉ</Text>
        <Text style={styles.region}>North, Central America & the Caribbean</Text>
      </Tarjeta>

      <Encabezado etiqueta="Favoritos de la casa" titulo="Nuestras bebidas insignia" />

      {cargando ? (
        <ActivityIndicator color={colores.caramelo} style={styles.cargando} />
      ) : (
        destacados.map((producto) => (
          <TarjetaProducto
            key={producto.id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precios["16oz"]}
          />
        ))
      )}

      <Boton
        titulo="Ver menú completo"
        variante="secundario"
        onPress={() => router.push("/menu")}
      />

      <Tarjeta>
        <Text style={styles.horarioTitulo}>Horario</Text>
        <View style={styles.horarioFila}>
          <Text style={styles.dia}>Lunes a viernes</Text>
          <Text style={styles.hora}>7:00 a. m. – 7:00 p. m.</Text>
        </View>
        <View style={styles.horarioFila}>
          <Text style={styles.dia}>Sábado y domingo</Text>
          <Text style={styles.hora}>8:00 a. m. – 8:00 p. m.</Text>
        </View>
        <Text style={styles.direccion}>Centro Histórico, San Salvador</Text>
      </Tarjeta>
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  cabecera: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marca: {
    fontFamily: fuentes.titulo,
    fontSize: 30,
    color: colores.texto,
  },
  submarca: {
    fontFamily: fuentes.negrita,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colores.caramelo,
  },
  puntos: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacio.xs,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radio.lg,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  puntosTexto: {
    fontFamily: fuentes.negrita,
    fontSize: 13,
    color: colores.texto,
  },
  hero: {
    backgroundColor: colores.cafe,
    borderRadius: radio.md,
    padding: espacio.lg,
    gap: espacio.sm,
  },
  heroEtiqueta: {
    fontFamily: fuentes.negrita,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colores.caramelo,
  },
  heroTitulo: {
    fontFamily: fuentes.titulo,
    fontSize: 34,
    color: "#FFFFFF",
  },
  heroTexto: {
    fontFamily: fuentes.texto,
    fontSize: 15,
    lineHeight: 22,
    color: colores.sobreOscuro,
    marginBottom: espacio.sm,
  },
  reconocimiento: {
    alignItems: "center",
    borderColor: colores.caramelo,
  },
  numero: {
    fontFamily: fuentes.titulo,
    fontSize: 34,
    color: colores.texto,
  },
  premio: {
    fontFamily: fuentes.negrita,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colores.caramelo,
    marginVertical: espacio.xs,
  },
  region: {
    fontFamily: fuentes.texto,
    fontSize: 13,
    color: colores.textoSuave,
  },
  cargando: {
    marginVertical: espacio.lg,
  },
  horarioTitulo: {
    fontFamily: fuentes.titulo,
    fontSize: 20,
    color: colores.texto,
    marginBottom: espacio.sm,
  },
  horarioFila: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: espacio.xs,
  },
  dia: {
    fontFamily: fuentes.medio,
    fontSize: 14,
    color: colores.texto,
  },
  hora: {
    fontFamily: fuentes.texto,
    fontSize: 14,
    color: colores.textoSuave,
  },
  direccion: {
    fontFamily: fuentes.texto,
    fontSize: 13,
    color: colores.caramelo,
    marginTop: espacio.sm,
  },
});