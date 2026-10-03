import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colores, espacio, fuentes, radio } from "../constants/theme";
import { useCarrito } from "../context/carrito-context";
import { Producto, Tamano, TAMANOS } from "../types";
import { formatearPrecio, nombreCategoria } from "../utils/formato";
import { imagenDeProducto } from "../utils/imagenes";
import Boton from "./boton";
import Chips from "./chips";
import FotoProducto from "./foto-producto";

type Props = {
    producto: Producto | null;
    onCerrar: () => void;
};

export default function HojaProducto({ producto, onCerrar }: Props) {
    const { agregar } = useCarrito();
    const insets = useSafeAreaInsets();
    const [mostrado, setMostrado] = useState<Producto | null>(producto);
    const [tamano, setTamano] = useState<Tamano>("16oz");
    const [cantidad, setCantidad] = useState(1);

    // Guarda el último producto para que no desaparezca mientras se cierra la hoja
    useEffect(() => {
        if (producto) {
            setMostrado(producto);
            setTamano("16oz");
            setCantidad(1);
        }
    }, [producto]);

    if (!mostrado) return null;

    const precio = mostrado.precios?.[tamano] ?? 0;

    function alAgregar() {
        if (!mostrado) return;
        agregar(mostrado, tamano, cantidad);
        onCerrar();
    }

    return (
        <Modal visible={!!producto} transparent animationType="slide" onRequestClose={onCerrar}>
            <View style={styles.fondo}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onCerrar} />

                <View style={[styles.hoja, { paddingBottom: insets.bottom + espacio.md }]}>
                    <View style={styles.agarre} />

                    <FotoProducto uri={imagenDeProducto(mostrado)} style={styles.foto} />

                    <View style={styles.cuerpo}>
                        <Text style={styles.categoria}>
                            {nombreCategoria(mostrado.categoria).toUpperCase()}
                        </Text>
                        <Text style={styles.nombre}>{mostrado.nombre}</Text>
                        <Text style={styles.descripcion}>{mostrado.descripcion}</Text>

                        <Text style={styles.subtitulo}>Tamaño de vaso</Text>
                        <Chips opciones={TAMANOS} seleccionada={tamano} onCambiar={setTamano} />

                        <View style={styles.pie}>
                            <View style={styles.contador}>
                                <BotonCantidad icono="remove" onPress={() => setCantidad((c) => Math.max(1, c - 1))} />
                                <Text style={styles.cantidad}>{cantidad}</Text>
                                <BotonCantidad icono="add" onPress={() => setCantidad((c) => c + 1)} />
                            </View>

                            <View style={styles.boton}>
                                <Boton titulo={`Agregar · ${formatearPrecio(precio * cantidad)}`} onPress={alAgregar} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

function BotonCantidad({ icono, onPress }: { icono: "add" | "remove"; onPress: () => void }) {
    return (
        <Pressable
            onPress={onPress}
            hitSlop={8}
            style={({ pressed }) => [styles.botonCantidad, pressed && { opacity: 0.7 }]}
        >
            <Ionicons name={icono} size={20} color={colores.cafe} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    hoja: {
        backgroundColor: colores.fondo,
        borderTopLeftRadius: radio.lg,
        borderTopRightRadius: radio.lg,
        overflow: "hidden",
    },
    agarre: {
        position: "absolute",
        top: 10,
        alignSelf: "center",
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 1,
    },
    foto: {
        width: "100%",
        height: 220,
    },
    cuerpo: {
        padding: espacio.lg,
        gap: espacio.sm,
    },
    categoria: {
        fontFamily: fuentes.negrita,
        fontSize: 10,
        letterSpacing: 1.5,
        color: colores.caramelo,
    },
    nombre: {
        fontFamily: fuentes.titulo,
        fontSize: 28,
        color: colores.texto,
    },
    descripcion: {
        fontFamily: fuentes.texto,
        fontSize: 14,
        lineHeight: 21,
        color: colores.textoSuave,
    },
    subtitulo: {
        fontFamily: fuentes.negrita,
        fontSize: 13,
        color: colores.texto,
        marginTop: espacio.sm,
    },
    pie: {
        flexDirection: "row",
        alignItems: "center",
        gap: espacio.md,
        marginTop: espacio.md,
    },
    contador: {
        flexDirection: "row",
        alignItems: "center",
        gap: espacio.sm,
    },
    botonCantidad: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colores.fondoSuave,
        alignItems: "center",
        justifyContent: "center",
    },
    cantidad: {
        fontFamily: fuentes.negrita,
        fontSize: 17,
        color: colores.texto,
        minWidth: 22,
        textAlign: "center",
    },
    boton: {
        flex: 1,
    },
});