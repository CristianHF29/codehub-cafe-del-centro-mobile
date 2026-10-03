import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { ComponentProps } from "react";
import { ColorValue } from "react-native";
import Cargando from "../../components/cargando";
import { colores, fuentes } from "../../constants/theme";
import { useCarrito } from "../../context/carrito-context";
import { useSesion } from "../../context/sesion-context";

type NombreIcono = ComponentProps<typeof Ionicons>["name"];

// Ícono relleno cuando la pestaña está activa
function icono(activo: NombreIcono, inactivo: NombreIcono) {
    return ({ color, focused }: { color: ColorValue; focused: boolean }) => (
        <Ionicons name={focused ? activo : inactivo} size={22} color={color} />
    );
}

export default function TabsLayout() {
    const { usuario, cargando } = useSesion();
    const { cantidadTotal } = useCarrito();

    if (cargando) return <Cargando />;
    if (!usuario) return <Redirect href="/login" />;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colores.caramelo,
                tabBarInactiveTintColor: colores.textoSuave,
                tabBarLabelStyle: { fontFamily: fuentes.medio, fontSize: 11 },
                tabBarStyle: {
                    backgroundColor: colores.tarjeta,
                    borderTopColor: colores.borde,
                    paddingTop: 6,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{ title: "Inicio", tabBarIcon: icono("home", "home-outline") }}
            />
            <Tabs.Screen
                name="menu"
                options={{ title: "Menú", tabBarIcon: icono("cafe", "cafe-outline") }}
            />
            <Tabs.Screen
                name="carrito"
                options={{
                    title: "Carrito",
                    tabBarIcon: icono("cart", "cart-outline"),
                    tabBarBadge: cantidadTotal > 0 ? cantidadTotal : undefined,
                    tabBarBadgeStyle: { backgroundColor: colores.caramelo, fontSize: 11 },
                }}
            />
            <Tabs.Screen
                name="cuenta"
                options={{ title: "Cuenta", tabBarIcon: icono("person", "person-outline") }}
            />
        </Tabs>
    );
}