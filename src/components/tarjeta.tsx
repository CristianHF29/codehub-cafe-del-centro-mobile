import { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { colores, espacio, radio } from "../constants/theme";

type Props = {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
};

export default function Tarjeta({ children, style }: Props) {
    return <View style={[styles.tarjeta, style]}>{children}</View>;
}

const styles = StyleSheet.create({
    tarjeta: {
        backgroundColor: colores.tarjeta,
        borderColor: colores.borde,
        borderWidth: 1,
        borderRadius: radio.md,
        padding: espacio.md,
    },
});