import { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores, espacio } from "../constants/theme";

type Props = {
    children: ReactNode;
};

export default function Pantalla({ children }: Props) {
    return (
        <SafeAreaView style={styles.fondo} edges={["top"]}>
            <ScrollView
                contentContainerStyle={styles.contenido}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        backgroundColor: colores.fondo,
    },
    contenido: {
        padding: espacio.md,
        paddingBottom: espacio.xl,
        gap: espacio.md,
    },
});