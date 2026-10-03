import { Pressable, StyleSheet, Text, View } from "react-native";
import { colores, espacio, fuentes, radio } from "../constants/theme";

type Props<T extends string> = {
    opciones: readonly T[];
    seleccionada: T;
    onCambiar: (opcion: T) => void;
};

export default function Chips<T extends string>({ opciones, seleccionada, onCambiar }: Props<T>) {
    return (
        <View style={styles.fila}>
            {opciones.map((opcion) => {
                const activa = opcion === seleccionada;

                return (
                    <Pressable
                        key={opcion}
                        onPress={() => onCambiar(opcion)}
                        style={[styles.chip, activa && styles.activa]}
                    >
                        <Text style={[styles.texto, activa && styles.textoActivo]}>{opcion}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    fila: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: espacio.sm,
    },
    chip: {
        borderWidth: 1,
        borderColor: colores.borde,
        borderRadius: radio.lg,
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: colores.tarjeta,
    },
    activa: {
        backgroundColor: colores.cafe,
        borderColor: colores.cafe,
    },
    texto: {
        fontFamily: fuentes.medio,
        fontSize: 13,
        color: colores.texto,
    },
    textoActivo: {
        color: "#FFFFFF",
    },
});