import { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colores, espacio, fuentes, radio } from "../constants/theme";

type Props = TextInputProps & {
    etiqueta: string;
    error?: string;
};

export default function CampoTexto({ etiqueta, error, style, onFocus, onBlur, ...resto }: Props) {
    const [enfocado, setEnfocado] = useState(false);

    return (
        <View>
            <Text style={styles.etiqueta}>{etiqueta.toUpperCase()}</Text>
            <TextInput
                {...resto}
                placeholderTextColor={colores.textoSuave}
                onFocus={(e) => {
                    setEnfocado(true);
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    setEnfocado(false);
                    onBlur?.(e);
                }}
                style={[styles.input, enfocado && styles.enfocado, !!error && styles.conError, style]}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    etiqueta: {
        fontFamily: fuentes.negrita,
        fontSize: 11,
        letterSpacing: 1,
        color: colores.texto,
        marginBottom: espacio.xs,
    },
    input: {
        fontFamily: fuentes.texto,
        fontSize: 15,
        color: colores.texto,
        backgroundColor: colores.fondo,
        borderWidth: 1,
        borderColor: colores.borde,
        borderRadius: radio.sm,
        paddingHorizontal: espacio.md,
        paddingVertical: 12,
    },
    enfocado: {
        borderColor: colores.caramelo,
    },
    conError: {
        borderColor: colores.peligro,
    },
    error: {
        fontFamily: fuentes.texto,
        fontSize: 12,
        color: colores.peligro,
        marginTop: espacio.xs,
    },
});