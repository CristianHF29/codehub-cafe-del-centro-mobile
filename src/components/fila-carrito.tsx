import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colores, espacio, fuentes } from "../constants/theme";
import { ItemCarrito } from "../types";
import { formatearPrecio } from "../utils/formato";
import Tarjeta from "./tarjeta";

type Props = {
    item: ItemCarrito;
    onCambiar: (cambio: number) => void;
};

export default function FilaCarrito({ item, onCambiar }: Props) {
    return (
        <Tarjeta style={styles.fila}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.detalle}>
                    {item.tamano} · {formatearPrecio(item.precio)} c/u
                </Text>
                <Text style={styles.subtotal}>{formatearPrecio(item.precio * item.cantidad)}</Text>
            </View>

            <View style={styles.controles}>
                <BotonCantidad
                    icono={item.cantidad === 1 ? "trash-outline" : "remove"}
                    onPress={() => onCambiar(-1)}
                />
                <Text style={styles.cantidad}>{item.cantidad}</Text>
                <BotonCantidad icono="add" onPress={() => onCambiar(1)} />
            </View>
        </Tarjeta>
    );
}

type PropsBoton = {
    icono: ComponentProps<typeof Ionicons>["name"];
    onPress: () => void;
};

function BotonCantidad({ icono, onPress }: PropsBoton) {
    return (
        <Pressable
            onPress={onPress}
            hitSlop={8}
            style={({ pressed }) => [styles.botonCantidad, pressed && styles.presionado]}
        >
            <Ionicons name={icono} size={18} color={colores.cafe} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    fila: {
        flexDirection: "row",
        alignItems: "center",
        gap: espacio.md,
    },
    info: {
        flex: 1,
        gap: 2,
    },
    nombre: {
        fontFamily: fuentes.negrita,
        fontSize: 15,
        color: colores.texto,
    },
    detalle: {
        fontFamily: fuentes.texto,
        fontSize: 13,
        color: colores.textoSuave,
    },
    subtotal: {
        fontFamily: fuentes.negrita,
        fontSize: 15,
        color: colores.caramelo,
        marginTop: espacio.xs,
    },
    controles: {
        flexDirection: "row",
        alignItems: "center",
        gap: espacio.sm,
    },
    botonCantidad: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: colores.fondoSuave,
        alignItems: "center",
        justifyContent: "center",
    },
    presionado: {
        opacity: 0.7,
    },
    cantidad: {
        fontFamily: fuentes.negrita,
        fontSize: 16,
        color: colores.texto,
        minWidth: 20,
        textAlign: "center",
    },
});