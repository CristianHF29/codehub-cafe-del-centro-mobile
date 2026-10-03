import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colores, espacio, fuentes } from "../constants/theme";
import Boton from "./boton";

type Props = {
    icono: ComponentProps<typeof Ionicons>["name"];
    titulo: string;
    texto: string;
    accion?: {
        titulo: string;
        onPress: () => void;
    };
};

export default function EstadoVacio({ icono, titulo, texto, accion }: Props) {
    return (
        <View style={styles.contenedor}>
            <View style={styles.circulo}>
                <Ionicons name={icono} size={34} color={colores.caramelo} />
            </View>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.texto}>{texto}</Text>
            {accion ? (
                <View style={styles.accion}>
                    <Boton titulo={accion.titulo} onPress={accion.onPress} />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: espacio.lg,
        gap: espacio.sm,
        backgroundColor: colores.fondo,
    },
    circulo: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colores.fondoSuave,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: espacio.sm,
    },
    titulo: {
        fontFamily: fuentes.titulo,
        fontSize: 24,
        color: colores.texto,
        textAlign: "center",
    },
    texto: {
        fontFamily: fuentes.texto,
        fontSize: 14,
        lineHeight: 21,
        color: colores.textoSuave,
        textAlign: "center",
    },
    accion: {
        alignSelf: "stretch",
        marginTop: espacio.md,
    },
});