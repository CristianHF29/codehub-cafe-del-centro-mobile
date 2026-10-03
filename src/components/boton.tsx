import { Pressable, StyleSheet, Text } from "react-native";
import { colores, espacio, fuentes, radio } from "../constants/theme";

type Props = {
    titulo: string;
    onPress: () => void;
    variante?: "primario" | "secundario";
};

export default function Boton({ titulo, onPress, variante = "primario" }: Props) {
    const esPrimario = variante === "primario";

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.base,
                esPrimario ? styles.primario : styles.secundario,
                pressed && styles.presionado,
            ]}
        >
            <Text style={[styles.texto, !esPrimario && styles.textoSecundario]}>
                {titulo}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: radio.lg,
        paddingVertical: 14,
        paddingHorizontal: espacio.lg,
        alignItems: "center",
    },
    primario: {
        backgroundColor: colores.caramelo,
    },
    secundario: {
        borderWidth: 1,
        borderColor: colores.cafe,
    },
    presionado: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
    },
    texto: {
        fontFamily: fuentes.negrita,
        fontSize: 15,
        color: "#FFFFFF",
    },
    textoSecundario: {
        color: colores.cafe,
    },
});