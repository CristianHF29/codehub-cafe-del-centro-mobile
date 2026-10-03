import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { colores } from "../constants/theme";

type Props = {
    uri: string;
    style?: StyleProp<ViewStyle>;
};

export default function FotoProducto({ uri, style }: Props) {
    const [fallo, setFallo] = useState(false);

    return (
        <View style={[styles.marco, style]}>
            {fallo ? (
                <Ionicons name="cafe-outline" size={32} color={colores.caramelo} />
            ) : (
                <Image
                    source={{ uri }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                    onError={() => setFallo(true)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    marco: {
        overflow: "hidden",
        backgroundColor: colores.fondoSuave,
        alignItems: "center",
        justifyContent: "center",
    },
});