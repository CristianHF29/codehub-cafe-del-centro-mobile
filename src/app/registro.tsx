import { Redirect, router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import Boton from "../components/boton";
import CampoTexto from "../components/campo-texto";
import Encabezado from "../components/encabezado";
import Pantalla from "../components/pantalla";
import Tarjeta from "../components/tarjeta";
import { colores, espacio, fuentes, radio } from "../constants/theme";
import { useSesion } from "../context/sesion-context";
import { mensajeError } from "../services/api";
import { DatosRegistro, Errores, tieneErrores, validarRegistro } from "../utils/validaciones";

const VACIO: DatosRegistro = { nombre: "", email: "", password: "", confirmar: "" };

export default function Registro() {
    const { usuario, registrarse } = useSesion();
    const [datos, setDatos] = useState<DatosRegistro>(VACIO);
    const [errores, setErrores] = useState<Errores<DatosRegistro>>({});
    const [errorGeneral, setErrorGeneral] = useState("");
    const [enviando, setEnviando] = useState(false);

    if (usuario) return <Redirect href="/" />;

    function cambiar(campo: keyof DatosRegistro, valor: string) {
        setDatos((actual) => ({ ...actual, [campo]: valor }));
        if (errores[campo]) setErrores((actual) => ({ ...actual, [campo]: undefined }));
    }

    async function enviar() {
        const encontrados = validarRegistro(datos);
        setErrores(encontrados);
        setErrorGeneral("");
        if (tieneErrores(encontrados)) return;

        setEnviando(true);
        try {
            await registrarse(datos);
        } catch (e) {
            setErrorGeneral(mensajeError(e));
            setEnviando(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Pantalla>
                <Encabezado
                    etiqueta="Únete a Café del Centro"
                    titulo="Crea tu cuenta"
                    descripcion="Acumula un punto por cada dólar en tus pedidos."
                />

                <Tarjeta style={styles.formulario}>
                    <CampoTexto
                        etiqueta="Nombre completo"
                        placeholder="Ej. Andrea Flores"
                        autoCapitalize="words"
                        value={datos.nombre}
                        onChangeText={(valor) => cambiar("nombre", valor)}
                        error={errores.nombre}
                    />

                    <CampoTexto
                        etiqueta="Correo electrónico"
                        placeholder="tucorreo@ejemplo.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        value={datos.email}
                        onChangeText={(valor) => cambiar("email", valor)}
                        error={errores.email}
                    />

                    <CampoTexto
                        etiqueta="Contraseña"
                        placeholder="Mínimo 6 caracteres y un número"
                        secureTextEntry
                        value={datos.password}
                        onChangeText={(valor) => cambiar("password", valor)}
                        error={errores.password}
                    />

                    <CampoTexto
                        etiqueta="Confirmar contraseña"
                        placeholder="Repite tu contraseña"
                        secureTextEntry
                        value={datos.confirmar}
                        onChangeText={(valor) => cambiar("confirmar", valor)}
                        error={errores.confirmar}
                        returnKeyType="go"
                        onSubmitEditing={enviar}
                    />

                    {errorGeneral ? <Text style={styles.errorGeneral}>{errorGeneral}</Text> : null}

                    <Boton titulo="Crear cuenta" onPress={enviar} cargando={enviando} />
                </Tarjeta>

                <View style={styles.pie}>
                    <Text style={styles.pieTexto}>¿Ya tienes cuenta? </Text>
                    <Text style={styles.enlace} onPress={() => router.back()}>
                        Inicia sesión
                    </Text>
                </View>
            </Pantalla>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    formulario: {
        gap: espacio.md,
        padding: espacio.lg,
    },
    errorGeneral: {
        fontFamily: fuentes.medio,
        fontSize: 13,
        color: colores.peligro,
        backgroundColor: "#F8E6E2",
        padding: espacio.sm,
        borderRadius: radio.sm,
    },
    pie: {
        flexDirection: "row",
        justifyContent: "center",
    },
    pieTexto: {
        fontFamily: fuentes.texto,
        fontSize: 14,
        color: colores.textoSuave,
    },
    enlace: {
        fontFamily: fuentes.negrita,
        fontSize: 14,
        color: colores.caramelo,
    },
});