import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colores, espacio, fuentes, radio } from "../constants/theme";
import { Producto } from "../types";
import { formatearPrecio } from "../utils/formato";
import { imagenDeProducto } from "../utils/imagenes";
import FotoProducto from "./foto-producto";

type Props = {
    producto: Producto;
    onAbrir: () => void;
    ultimo?: boolean;
};

export default function TarjetaMenu({ producto, onAbrir, ultimo = false }: Props) {
    return (
        <Pressable
            onPress={onAbrir}
            style={({ pressed }) => [styles.fila, !ultimo && styles.separador, pressed && styles.presionada]}
        >
            <View style={styles.info}>
                <Text style={styles.nombre} numberOfLines={2}>
                    {producto.nombre}
                </Text>
                <Text style={styles.descripcion} numberOfLines={2}>
                    {producto.descripcion}
                </Text>
                <Text style={styles.tamanos}>16 a 32 oz</Text>
                <Text style={styles.precio}>Desde {formatearPrecio(producto.precios?.["16oz"] ?? 0)}</Text>
            </View>

            <View>
                <FotoProducto uri={imagenDeProducto(producto)} style={styles.foto} />
                <View style={styles.mas}>
                    <Ionicons name="add" size={22} color={colores.texto} />
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    fila: {
        flexDirection: "row",
        alignItems: "center",
        gap: espacio.md,
        paddingVertical: espacio.md,
    },
    separador: {
        borderBottomWidth: 1,
        borderBottomColor: colores.borde,
    },
    presionada: {
        opacity: 0.7,
    },
    info: {
        flex: 1,
        gap: 4,
    },
    nombre: {
        fontFamily: fuentes.negrita,
        fontSize: 16,
        color: colores.texto,
    },
    descripcion: {
        fontFamily: fuentes.texto,
        fontSize: 13,
        lineHeight: 18,
        color: colores.textoSuave,
    },
    tamanos: {
        fontFamily: fuentes.medio,
        fontSize: 12,
        color: colores.caramelo,
    },
    precio: {
        fontFamily: fuentes.negrita,
        fontSize: 17,
        color: colores.texto,
        marginTop: 2,
    },
    foto: {
        width: 112,
        height: 112,
        borderRadius: radio.md,
    },
    mas: {
        position: "absolute",
        right: 8,
        bottom: 8,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colores.tarjeta,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
});