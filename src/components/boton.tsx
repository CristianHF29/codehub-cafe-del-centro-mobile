import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colores, espacio, fuentes, radio } from "../constants/theme";

type Props = {
    titulo: string;
    onPress: () => void;
    variante?: "primario" | "secundario";
    cargando?: boolean;
    deshabilitado?: boolean;
    compacto?: boolean;
};

export default function Boton({
    titulo,
    onPress,
    variante = "primario",
    cargando = false,
    deshabilitado = false,
    compacto = false,
}: Props) {
    const esPrimario = variante === "primario";
    const inactivo = cargando || deshabilitado;

    return (
        <Pressable
            onPress={onPress}
            disabled={inactivo}
            style={({ pressed }) => [
                styles.base,
                compacto && styles.compacto,
                esPrimario ? styles.primario : styles.secundario,
                inactivo && styles.inactivo,
                pressed && styles.presionado,
            ]}
        >
            {cargando ? (
                <ActivityIndicator color={esPrimario ? "#FFFFFF" : colores.cafe} />
            ) : (
                <Text
                    style={[
                        styles.texto,
                        compacto && styles.textoCompacto,
                        !esPrimario && styles.textoSecundario,
                    ]}
                >
                    {titulo}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: radio.lg,
        paddingVertical: 14,
        paddingHorizontal: espacio.lg,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50,
    },
    compacto: {
        paddingVertical: 8,
        paddingHorizontal: espacio.md,
        minHeight: 38,
    },
    primario: {
        backgroundColor: colores.caramelo,
    },
    secundario: {
        borderWidth: 1,
        borderColor: colores.cafe,
    },
    inactivo: {
        opacity: 0.6,
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
    textoCompacto: {
        fontSize: 14,
    },
    textoSecundario: {
        color: colores.cafe,
    },
});