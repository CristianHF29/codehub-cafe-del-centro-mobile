import { StyleSheet, Text, View } from "react-native";
import { colores, espacio, fuentes, radio } from "../constants/theme";
import { detectarMarca } from "../utils/tarjeta";

const MASCARA = "•••• •••• •••• ••••";

type Props = {
    numero: string;
    nombre: string;
    vencimiento: string;
};

export default function TarjetaVisual({ numero, nombre, vencimiento }: Props) {
    const marca = detectarMarca(numero);
    const numeroVisible = numero + MASCARA.slice(numero.length);

    return (
        <View style={styles.tarjeta}>
            <View style={styles.circuloGrande} />
            <View style={styles.circuloChico} />

            <View style={styles.fila}>
                <View style={styles.chip} />
                <Text style={styles.marca}>{marca || "TARJETA"}</Text>
            </View>

            <Text style={styles.numero}>{numeroVisible}</Text>

            <View style={styles.fila}>
                <View style={styles.titular}>
                    <Text style={styles.etiqueta}>TITULAR</Text>
                    <Text style={styles.valor} numberOfLines={1}>
                        {nombre.trim() ? nombre.toUpperCase() : "TU NOMBRE"}
                    </Text>
                </View>
                <View>
                    <Text style={styles.etiqueta}>VENCE</Text>
                    <Text style={styles.valor}>{vencimiento || "MM/AA"}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tarjeta: {
        height: 190,
        backgroundColor: colores.cafe,
        borderRadius: radio.lg,
        padding: espacio.lg,
        justifyContent: "space-between",
        overflow: "hidden",
    },
    circuloGrande: {
        position: "absolute",
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: colores.caramelo,
        opacity: 0.18,
        top: -90,
        right: -60,
    },
    circuloChico: {
        position: "absolute",
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: colores.caramelo,
        opacity: 0.12,
        bottom: -70,
        left: -30,
    },
    fila: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    chip: {
        width: 40,
        height: 30,
        borderRadius: 6,
        backgroundColor: "#D9B57A",
    },
    marca: {
        fontFamily: fuentes.negrita,
        fontSize: 14,
        letterSpacing: 1.5,
        color: "#FFFFFF",
    },
    numero: {
        fontFamily: fuentes.medio,
        fontSize: 20,
        letterSpacing: 2,
        color: "#FFFFFF",
    },
    titular: {
        flex: 1,
        marginRight: espacio.md,
    },
    etiqueta: {
        fontFamily: fuentes.negrita,
        fontSize: 9,
        letterSpacing: 1.2,
        color: colores.sobreOscuro,
        opacity: 0.8,
    },
    valor: {
        fontFamily: fuentes.medio,
        fontSize: 14,
        color: "#FFFFFF",
        marginTop: 2,
    },
});