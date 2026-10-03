import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colores, espacio, fuentes, radio } from "../constants/theme";

type Props = {
    icono: ComponentProps<typeof Ionicons>["name"];
    titulo: string;
    descripcion: string;
    activa: boolean;
    onPress: () => void;
};

export default function OpcionPago({ icono, titulo, descripcion, activa, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.opcion, activa && styles.activa, pressed && styles.presionada]}
        >
            <View style={[styles.icono, activa && styles.iconoActivo]}>
                <Ionicons name={icono} size={22} color={activa ? "#FFFFFF" : colores.cafe} />
            </View>

            <View style={styles.textos}>
                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.descripcion}>{descripcion}</Text>
            </View>

            <View style={[styles.radio, activa && styles.radioActivo]}>
                {activa ? <View style={styles.punto} /> : null}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    opcion: {
        flexDirection: "row",
        alignItems: "center",
        gap: espacio.md,
        backgroundColor: colores.tarjeta,
        borderWidth: 1,
        borderColor: colores.borde,
        borderRadius: radio.md,
        padding: espacio.md,
    },
    activa: {
        borderColor: colores.caramelo,
    },
    presionada: {
        opacity: 0.8,
    },
    icono: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colores.fondoSuave,
        alignItems: "center",
        justifyContent: "center",
    },
    iconoActivo: {
        backgroundColor: colores.caramelo,
    },
    textos: {
        flex: 1,
        gap: 2,
    },
    titulo: {
        fontFamily: fuentes.negrita,
        fontSize: 15,
        color: colores.texto,
    },
    descripcion: {
        fontFamily: fuentes.texto,
        fontSize: 13,
        color: colores.textoSuave,
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: colores.borde,
        alignItems: "center",
        justifyContent: "center",
    },
    radioActivo: {
        borderColor: colores.caramelo,
    },
    punto: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colores.caramelo,
    },
});