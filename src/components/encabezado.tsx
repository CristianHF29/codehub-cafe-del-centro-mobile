import { View, Text, StyleSheet } from "react-native";
import { colores, espacio, fuentes } from "../constants/theme";

type Props = {
    etiqueta?: string;
    titulo: string;
    descripcion?: string;
    centrado?: boolean;
};

export default function Encabezado({
    etiqueta,
    titulo,
    descripcion,
    centrado = false,
}: Props) {
    return (
        <View style={{ alignItems: centrado ? "center" : "flex-start" }}>
            {etiqueta ? <Text style={styles.etiqueta}>{etiqueta.toUpperCase()}</Text> : null}
            <Text style={[styles.titulo, centrado && styles.centrado]}>{titulo}</Text>
            <View style={styles.linea} />
            {descripcion ? (
                <Text style={[styles.descripcion, centrado && styles.centrado]}>
                    {descripcion}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    etiqueta: {
        fontFamily: fuentes.negrita,
        fontSize: 11,
        letterSpacing: 1.5,
        color: colores.caramelo,
        marginBottom: espacio.xs,
    },
    titulo: {
        fontFamily: fuentes.titulo,
        fontSize: 28,
        color: colores.texto,
    },
    linea: {
        width: 40,
        height: 2,
        backgroundColor: colores.caramelo,
        marginVertical: espacio.sm,
    },
    descripcion: {
        fontFamily: fuentes.texto,
        fontSize: 14,
        lineHeight: 21,
        color: colores.textoSuave,
    },
    centrado: {
        textAlign: "center",
    },
});