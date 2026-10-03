import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "../components/boton";
import { colores, espacio, fuentes, radio } from "../constants/theme";
import { formatearPrecio } from "../utils/formato";

type Parametros = {
    id: string;
    puntos: string;
    total: string;
    metodo: string;
};

export default function PedidoConfirmado() {
    const { id, puntos, total, metodo } = useLocalSearchParams<Parametros>();
    const escala = useRef(new Animated.Value(0.5)).current;
    const opacidad = useRef(new Animated.Value(0)).current;
    const contenido = useRef(new Animated.Value(0)).current;

    // Primero aparece el check con un pequeño rebote, después el texto
    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.spring(escala, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
                Animated.timing(opacidad, { toValue: 1, duration: 250, useNativeDriver: true }),
            ]),
            Animated.timing(contenido, { toValue: 1, duration: 350, useNativeDriver: true }),
        ]).start();
    }, [escala, opacidad, contenido]);

    const entrada = {
        opacity: contenido,
        transform: [
            { translateY: contenido.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) },
        ],
    };

    return (
        <SafeAreaView style={styles.pantalla}>
            <View style={styles.centro}>
                <Animated.View style={[styles.halo, { opacity: opacidad, transform: [{ scale: escala }] }]}>
                    <View style={styles.circulo}>
                        <Ionicons name="checkmark" size={44} color="#FFFFFF" />
                    </View>
                </Animated.View>

                <Animated.View style={[styles.textos, entrada]}>
                    <Text style={styles.etiqueta}>PEDIDO #{id}</Text>
                    <Text style={styles.titulo}>¡Gracias por tu pedido!</Text>
                    <Text style={styles.texto}>
                        {metodo === "tarjeta" ? "Tu pago fue aprobado." : "Pagas en caja al recogerlo."} Te
                        avisamos cuando esté listo.
                    </Text>

                    <View style={styles.resumen}>
                        <Dato etiqueta="Total" valor={formatearPrecio(Number(total))} />
                        <View style={styles.divisor} />
                        <Dato etiqueta="Puntos ganados" valor={`+${puntos}`} />
                    </View>
                </Animated.View>
            </View>

            <Animated.View style={[styles.acciones, entrada]}>
                <Boton titulo="Ver mis pedidos" onPress={() => router.replace("/cuenta")} />
                <Boton titulo="Volver al inicio" variante="secundario" onPress={() => router.replace("/")} />
            </Animated.View>
        </SafeAreaView>
    );
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
    return (
        <View style={styles.dato}>
            <Text style={styles.datoEtiqueta}>{etiqueta}</Text>
            <Text style={styles.datoValor}>{valor}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: colores.fondo,
        padding: espacio.lg,
    },
    centro: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: espacio.lg,
    },
    halo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colores.fondoSuave,
        alignItems: "center",
        justifyContent: "center",
    },
    circulo: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: colores.caramelo,
        alignItems: "center",
        justifyContent: "center",
    },
    textos: {
        alignItems: "center",
        gap: espacio.sm,
        width: "100%",
    },
    etiqueta: {
        fontFamily: fuentes.negrita,
        fontSize: 11,
        letterSpacing: 1.5,
        color: colores.caramelo,
    },
    titulo: {
        fontFamily: fuentes.titulo,
        fontSize: 30,
        color: colores.texto,
        textAlign: "center",
    },
    texto: {
        fontFamily: fuentes.texto,
        fontSize: 15,
        lineHeight: 22,
        color: colores.textoSuave,
        textAlign: "center",
    },
    resumen: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colores.tarjeta,
        borderWidth: 1,
        borderColor: colores.borde,
        borderRadius: radio.md,
        paddingVertical: espacio.md,
        marginTop: espacio.md,
        width: "100%",
    },
    dato: {
        flex: 1,
        alignItems: "center",
        gap: 2,
    },
    datoEtiqueta: {
        fontFamily: fuentes.medio,
        fontSize: 12,
        color: colores.textoSuave,
    },
    datoValor: {
        fontFamily: fuentes.titulo,
        fontSize: 24,
        color: colores.texto,
    },
    divisor: {
        width: 1,
        height: 36,
        backgroundColor: colores.borde,
    },
    acciones: {
        gap: espacio.sm,
    },
});