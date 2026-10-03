import { ReactNode } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores, espacio } from "../constants/theme";

type Props = {
    children: ReactNode;
    refrescando?: boolean;
    onRefrescar?: () => void;
};

export default function Pantalla({ children, refrescando = false, onRefrescar }: Props) {
    return (
        <SafeAreaView style={styles.fondo} edges={["top"]}>
            <ScrollView
                contentContainerStyle={styles.contenido}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    onRefrescar ? (
                        <RefreshControl
                            refreshing={refrescando}
                            onRefresh={onRefrescar}
                            colors={[colores.caramelo]}
                            tintColor={colores.caramelo}
                        />
                    ) : undefined
                }
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