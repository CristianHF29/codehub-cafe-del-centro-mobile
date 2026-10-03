import { StyleSheet, Text, View } from "react-native";
import { colores, espacio, fuentes, radio } from "../constants/theme";
import { EstadoPedido, Pedido } from "../types";
import { formatearFecha, formatearPrecio } from "../utils/formato";
import Tarjeta from "./tarjeta";

const ESTADOS: Record<EstadoPedido, { texto: string; color: string }> = {
    pendiente: { texto: "Preparando", color: colores.caramelo },
    listo: { texto: "Listo para recoger", color: colores.exito },
    entregado: { texto: "Entregado", color: colores.textoSuave },
};

export default function TarjetaPedido({ pedido }: { pedido: Pedido }) {
    const estado = ESTADOS[pedido.estado] ?? ESTADOS.pendiente;

    return (
        <Tarjeta style={styles.tarjeta}>
            <View style={styles.encabezado}>
                <Text style={styles.numero}>Pedido #{pedido.id}</Text>
                <View style={[styles.estado, { borderColor: estado.color }]}>
                    <Text style={[styles.estadoTexto, { color: estado.color }]}>{estado.texto}</Text>
                </View>
            </View>

            <Text style={styles.fecha}>{formatearFecha(pedido.fecha)}</Text>

            {pedido.items.map((item) => (
                <Text key={`${item.id}-${item.tamano}`} style={styles.item}>
                    {item.cantidad}× {item.nombre} ({item.tamano})
                </Text>
            ))}

            <View style={styles.pie}>
                <Text style={styles.totalEtiqueta}>Total</Text>
                <Text style={styles.total}>{formatearPrecio(pedido.total)}</Text>
            </View>
        </Tarjeta>
    );
}

const styles = StyleSheet.create({
    tarjeta: {
        gap: espacio.xs,
    },
    encabezado: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    numero: {
        fontFamily: fuentes.negrita,
        fontSize: 15,
        color: colores.texto,
    },
    estado: {
        borderWidth: 1,
        borderRadius: radio.lg,
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    estadoTexto: {
        fontFamily: fuentes.medio,
        fontSize: 11,
    },
    fecha: {
        fontFamily: fuentes.texto,
        fontSize: 12,
        color: colores.textoSuave,
        marginBottom: espacio.xs,
    },
    item: {
        fontFamily: fuentes.texto,
        fontSize: 13,
        color: colores.texto,
    },
    pie: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: colores.borde,
        paddingTop: espacio.sm,
        marginTop: espacio.xs,
    },
    totalEtiqueta: {
        fontFamily: fuentes.medio,
        fontSize: 14,
        color: colores.textoSuave,
    },
    total: {
        fontFamily: fuentes.negrita,
        fontSize: 15,
        color: colores.caramelo,
    },
});