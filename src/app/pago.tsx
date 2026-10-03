import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Boton from "../components/boton";
import CampoTexto from "../components/campo-texto";
import Encabezado from "../components/encabezado";
import EstadoVacio from "../components/estado-vacio";
import OpcionPago from "../components/opcion-pago";
import Pantalla from "../components/pantalla";
import Tarjeta from "../components/tarjeta";
import TarjetaVisual from "../components/tarjeta-visual";
import { colores, espacio, fuentes, radio } from "../constants/theme";
import { useCarrito } from "../context/carrito-context";
import { useSesion } from "../context/sesion-context";
import { mensajeError } from "../services/api";
import { crearPedido } from "../services/pedidos-service";
import { MetodoPago } from "../types";
import { formatearPrecio } from "../utils/formato";
import {
    DatosTarjeta,
    formatearNumero,
    formatearVencimiento,
    soloDigitos,
    ultimosDigitos,
    validarTarjeta,
} from "../utils/tarjeta";
import { Errores, tieneErrores } from "../utils/validaciones";

const TARJETA_VACIA: DatosTarjeta = { numero: "", nombre: "", vencimiento: "", cvv: "" };
const ESPERA_PROCESO = 1800;

function esperar(ms: number) {
    return new Promise((resolver) => setTimeout(resolver, ms));
}

export default function Pago() {
    const { usuario, actualizarPuntos } = useSesion();
    const { items, total, cantidadTotal, vaciar } = useCarrito();
    const [metodo, setMetodo] = useState<MetodoPago>("efectivo");
    const [tarjeta, setTarjeta] = useState<DatosTarjeta>(TARJETA_VACIA);
    const [errores, setErrores] = useState<Errores<DatosTarjeta>>({});
    const [estado, setEstado] = useState<"listo" | "procesando" | "enviando">("listo");
    const [errorGeneral, setErrorGeneral] = useState("");

    if (!usuario) return <Redirect href="/login" />;

    if (items.length === 0) {
        return (
            <EstadoVacio
                icono="cart-outline"
                titulo="No hay nada que pagar"
                texto="Tu carrito está vacío."
                accion={{ titulo: "Ir al menú", onPress: () => router.replace("/menu") }}
            />
        );
    }

    function cambiarTarjeta(campo: keyof DatosTarjeta, valor: string) {
        let limpio = valor;
        if (campo === "numero") limpio = formatearNumero(valor);
        if (campo === "vencimiento") limpio = formatearVencimiento(valor);
        if (campo === "cvv") limpio = soloDigitos(valor).slice(0, 4);

        setTarjeta((actual) => ({ ...actual, [campo]: limpio }));
        if (errores[campo]) setErrores((actual) => ({ ...actual, [campo]: undefined }));
    }

    async function pagar() {
        if (!usuario) return;
        setErrorGeneral("");

        if (metodo === "tarjeta") {
            const encontrados = validarTarjeta(tarjeta);
            setErrores(encontrados);
            if (tieneErrores(encontrados)) return;

            // Simula la respuesta de una pasarela de pago
            setEstado("procesando");
            await esperar(ESPERA_PROCESO);
        }

        setEstado("enviando");

        try {
            const respuesta = await crearPedido({
                usuarioId: usuario.id,
                items,
                total: Number(total.toFixed(2)),
                metodoPago: metodo,
                referenciaPago: metodo === "tarjeta" ? ultimosDigitos(tarjeta.numero) : undefined,
            });

            actualizarPuntos(respuesta.puntosTotales);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            router.replace({
                pathname: "/pedido-confirmado",
                params: {
                    id: String(respuesta.pedido.id),
                    puntos: String(respuesta.puntosGanados),
                    total: String(respuesta.pedido.total),
                    metodo,
                },
            });
            vaciar();
        } catch (e) {
            setErrorGeneral(mensajeError(e));
            setEstado("listo");
        }
    }

    const ocupado = estado !== "listo";
    const mensajeEstado =
        estado === "procesando" ? "Verificando tu tarjeta..." : estado === "enviando" ? "Enviando tu pedido..." : "";

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Pantalla sinPestanas>
                <View style={styles.barra}>
                    <Pressable onPress={() => router.back()} hitSlop={10} disabled={ocupado}>
                        <Ionicons name="arrow-back" size={24} color={colores.texto} />
                    </Pressable>
                    <Text style={styles.barraTitulo}>Pago</Text>
                </View>

                <Encabezado etiqueta="Último paso" titulo="¿Cómo quieres pagar?" />

                <Tarjeta style={styles.resumen}>
                    <View style={styles.fila}>
                        <Text style={styles.resumenTexto}>
                            {cantidadTotal} {cantidadTotal === 1 ? "bebida" : "bebidas"}
                        </Text>
                        <Text style={styles.total}>{formatearPrecio(total)}</Text>
                    </View>
                    <Text style={styles.puntos}>Ganas {Math.floor(total)} puntos con este pedido</Text>
                </Tarjeta>

                <OpcionPago
                    icono="cash-outline"
                    titulo="Efectivo"
                    descripcion="Pagas en caja al recoger tu pedido."
                    activa={metodo === "efectivo"}
                    onPress={() => setMetodo("efectivo")}
                />
                <OpcionPago
                    icono="card-outline"
                    titulo="Tarjeta"
                    descripcion="Débito o crédito."
                    activa={metodo === "tarjeta"}
                    onPress={() => setMetodo("tarjeta")}
                />

                {metodo === "tarjeta" ? (
                    <>
                        <TarjetaVisual
                            numero={tarjeta.numero}
                            nombre={tarjeta.nombre}
                            vencimiento={tarjeta.vencimiento}
                        />

                        <Tarjeta style={styles.formulario}>
                            <CampoTexto
                                etiqueta="Número de tarjeta"
                                placeholder="1234 5678 9012 3456"
                                keyboardType="number-pad"
                                maxLength={19}
                                value={tarjeta.numero}
                                onChangeText={(valor) => cambiarTarjeta("numero", valor)}
                                error={errores.numero}
                            />

                            <CampoTexto
                                etiqueta="Nombre en la tarjeta"
                                placeholder="Como aparece impreso"
                                autoCapitalize="characters"
                                value={tarjeta.nombre}
                                onChangeText={(valor) => cambiarTarjeta("nombre", valor)}
                                error={errores.nombre}
                            />

                            <View style={styles.filaCampos}>
                                <View style={styles.columna}>
                                    <CampoTexto
                                        etiqueta="Vence"
                                        placeholder="MM/AA"
                                        keyboardType="number-pad"
                                        maxLength={5}
                                        value={tarjeta.vencimiento}
                                        onChangeText={(valor) => cambiarTarjeta("vencimiento", valor)}
                                        error={errores.vencimiento}
                                    />
                                </View>
                                <View style={styles.columna}>
                                    <CampoTexto
                                        etiqueta="CVV"
                                        placeholder="123"
                                        keyboardType="number-pad"
                                        secureTextEntry
                                        maxLength={4}
                                        value={tarjeta.cvv}
                                        onChangeText={(valor) => cambiarTarjeta("cvv", valor)}
                                        error={errores.cvv}
                                    />
                                </View>
                            </View>
                        </Tarjeta>

                        <View style={styles.demo}>
                            <Ionicons name="lock-closed-outline" size={14} color={colores.textoSuave} />
                            <Text style={styles.demoTexto}>
                                Pago de demostración. No se realiza ningún cobro ni se guardan los datos de la tarjeta.
                            </Text>
                        </View>
                    </>
                ) : null}

                {errorGeneral ? <Text style={styles.errorGeneral}>{errorGeneral}</Text> : null}

                <Boton
                    titulo={metodo === "tarjeta" ? `Pagar ${formatearPrecio(total)}` : "Confirmar pedido"}
                    onPress={pagar}
                    cargando={ocupado}
                />

                {mensajeEstado ? <Text style={styles.estado}>{mensajeEstado}</Text> : null}
            </Pantalla>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    barra: {
        flexDirection: "row",
        alignItems: "center",
        gap: espacio.md,
    },
    barraTitulo: {
        fontFamily: fuentes.negrita,
        fontSize: 16,
        color: colores.texto,
    },
    resumen: {
        gap: espacio.xs,
    },
    fila: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    resumenTexto: {
        fontFamily: fuentes.medio,
        fontSize: 15,
        color: colores.texto,
    },
    total: {
        fontFamily: fuentes.titulo,
        fontSize: 28,
        color: colores.texto,
    },
    puntos: {
        fontFamily: fuentes.texto,
        fontSize: 13,
        color: colores.caramelo,
    },
    formulario: {
        gap: espacio.md,
    },
    filaCampos: {
        flexDirection: "row",
        gap: espacio.md,
    },
    columna: {
        flex: 1,
    },
    demo: {
        flexDirection: "row",
        gap: espacio.sm,
        alignItems: "flex-start",
    },
    demoTexto: {
        flex: 1,
        fontFamily: fuentes.texto,
        fontSize: 12,
        lineHeight: 17,
        color: colores.textoSuave,
    },
    errorGeneral: {
        fontFamily: fuentes.medio,
        fontSize: 13,
        color: colores.peligro,
        backgroundColor: "#F8E6E2",
        padding: espacio.sm,
        borderRadius: radio.sm,
    },
    estado: {
        fontFamily: fuentes.texto,
        fontSize: 13,
        color: colores.textoSuave,
        textAlign: "center",
    },
});