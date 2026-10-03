import { StyleSheet, Text, View } from "react-native";
import { colores, espacio, fuentes } from "../constants/theme";
import Tarjeta from "./tarjeta";

type Props = {
    nombre: string;
    descripcion: string;
    precio: number;
};

export default function TarjetaProducto({ nombre, descripcion, precio }: Props) {
    return (
        <Tarjeta>
            <View style={styles.fila}>
                <Text style={styles.nombre}>{nombre}</Text>
                <Text style={styles.precio}>${precio.toFixed(2)}</Text>
            </View>
            <Text style={styles.descripcion}>{descripcion}</Text>
        </Tarjeta>
    );
}

const styles = StyleSheet.create({
    fila: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: espacio.xs,
    },
    nombre: {
        fontFamily: fuentes.negrita,
        fontSize: 16,
        color: colores.texto,
        flexShrink: 1,
    },
    precio: {
        fontFamily: fuentes.negrita,
        fontSize: 15,
        color: colores.caramelo,
        marginLeft: espacio.sm,
    },
    descripcion: {
        fontFamily: fuentes.texto,
        fontSize: 13,
        lineHeight: 19,
        color: colores.textoSuave,
    },
});