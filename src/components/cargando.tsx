import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colores, espacio, fuentes } from "../constants/theme";

export default function Cargando({ texto }: { texto?: string }) {
    return (
        <View style={styles.contenedor}>
            <ActivityIndicator size="large" color={colores.caramelo} />
            {texto ? <Text style={styles.texto}>{texto}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: espacio.md,
        backgroundColor: colores.fondo,
    },
    texto: {
        fontFamily: fuentes.texto,
        fontSize: 14,
        color: colores.textoSuave,
    },
});