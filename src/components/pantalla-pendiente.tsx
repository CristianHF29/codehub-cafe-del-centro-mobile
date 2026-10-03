import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, Text } from "react-native";
import { colores, espacio, fuentes } from "../constants/theme";
import Encabezado from "./encabezado";
import Pantalla from "./pantalla";
import Tarjeta from "./tarjeta";

type Props = {
    etiqueta: string;
    titulo: string;
    descripcion: string;
    icono: ComponentProps<typeof Ionicons>["name"];
};

export default function PantallaPendiente({ etiqueta, titulo, descripcion, icono }: Props) {
    return (
        <Pantalla>
            <Encabezado etiqueta={etiqueta} titulo={titulo} descripcion={descripcion} />
            <Tarjeta style={styles.aviso}>
                <Ionicons name={icono} size={32} color={colores.caramelo} />
                <Text style={styles.texto}>Estamos preparando esta sección.</Text>
            </Tarjeta>
        </Pantalla>
    );
}

const styles = StyleSheet.create({
    aviso: {
        alignItems: "center",
        paddingVertical: espacio.xl,
        gap: espacio.sm,
    },
    texto: {
        fontFamily: fuentes.texto,
        fontSize: 14,
        color: colores.textoSuave,
    },
});