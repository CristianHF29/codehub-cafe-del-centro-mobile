import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colores, espacio, fuentes, radio } from "../constants/theme";

type Props = {
  onPress: () => void;
  cargando?: boolean;
};

export default function BotonGoogle({ onPress, cargando = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={cargando}
      style={({ pressed }) => [styles.boton, (pressed || cargando) && styles.presionado]}
    >
      {cargando ? (
        <ActivityIndicator color={colores.cafe} />
      ) : (
        <>
          <Ionicons name="logo-google" size={18} color={colores.cafe} />
          <Text style={styles.texto}>Continuar con Google</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: espacio.sm,
    minHeight: 50,
    borderRadius: radio.lg,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.tarjeta,
  },
  presionado: {
    opacity: 0.7,
  },
  texto: {
    fontFamily: fuentes.negrita,
    fontSize: 15,
    color: colores.cafe,
  },
});