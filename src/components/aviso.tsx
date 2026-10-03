import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { colores, espacio, fuentes, radio } from "../constants/theme";

export type DatosAviso = {
    texto: string;
    clave: number;
} | null;

export default function Aviso({ aviso }: { aviso: DatosAviso }) {
    const animacion = useRef(new Animated.Value(0)).current;
    const [texto, setTexto] = useState("");

    useEffect(() => {
        if (!aviso) return;

        setTexto(aviso.texto);
        animacion.setValue(0);

        const secuencia = Animated.sequence([
            Animated.timing(animacion, { toValue: 1, duration: 220, useNativeDriver: true }),
            Animated.delay(1600),
            Animated.timing(animacion, { toValue: 0, duration: 220, useNativeDriver: true }),
        ]);

        secuencia.start();
        return () => secuencia.stop();
    }, [aviso?.clave]);

    if (!texto) return null;

    return (
        <Animated.View
            pointerEvents="none"
            style={[
                styles.contenedor,
                {
                    opacity: animacion,
                    transform: [
                        { translateY: animacion.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) },
                    ],
                },
            ]}
        >
            <Animated.View style={styles.pastilla}>
                <Ionicons name="checkmark-circle" size={18} color={colores.caramelo} />
                <Text style={styles.texto} numberOfLines={1}>
                    {texto}
                </Text>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        position: "absolute",
        left: espacio.lg,
        right: espacio.lg,
        bottom: espacio.md,
        alignItems: "center",
    },
    pastilla: {
        flexDirection: "row",
        alignItems: "center",
        gap: espacio.sm,
        backgroundColor: colores.cafe,
        borderRadius: radio.lg,
        paddingVertical: 10,
        paddingHorizontal: espacio.md,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    texto: {
        fontFamily: fuentes.medio,
        fontSize: 13,
        color: "#FFFFFF",
        flexShrink: 1,
    },
});