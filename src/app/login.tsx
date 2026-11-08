import { Ionicons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import Boton from "../components/boton";
import BotonGoogle from "../components/boton-google";
import CampoTexto from "../components/campo-texto";
import Encabezado from "../components/encabezado";
import Pantalla from "../components/pantalla";
import Tarjeta from "../components/tarjeta";
import { colores, espacio, fuentes, radio } from "../constants/theme";
import { useSesion } from "../context/sesion-context";
import { mensajeError } from "../services/api";
import { DatosLogin, Errores, tieneErrores, validarLogin } from "../utils/validaciones";

export default function Login() {
  const { usuario, iniciarSesion, iniciarConGoogle } = useSesion();
  const [datos, setDatos] = useState<DatosLogin>({ email: "", password: "" });
  const [errores, setErrores] = useState<Errores<DatosLogin>>({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [entrandoConGoogle, setEntrandoConGoogle] = useState(false);

  if (usuario) return <Redirect href="/" />;

  function cambiar(campo: keyof DatosLogin, valor: string) {
    setDatos((actual) => ({ ...actual, [campo]: valor }));
    if (errores[campo]) setErrores((actual) => ({ ...actual, [campo]: undefined }));
  }

  async function enviar() {
    const encontrados = validarLogin(datos);
    setErrores(encontrados);
    setErrorGeneral("");
    if (tieneErrores(encontrados)) return;

    setEnviando(true);
    try {
      await iniciarSesion(datos.email, datos.password);
    } catch (e) {
      setErrorGeneral(mensajeError(e));
      setEnviando(false);
    }
  }

  async function entrarConGoogle() {
    setErrorGeneral("");
    setEntrandoConGoogle(true);
    try {
      await iniciarConGoogle();
    } catch (e) {
      setErrorGeneral(mensajeError(e));
    } finally {
      setEntrandoConGoogle(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Pantalla sinPestanas>
        <View style={styles.marca}>
          <View style={styles.logo}>
            <Ionicons name="cafe" size={30} color="#FFFFFF" />
          </View>
          <Text style={styles.nombreMarca}>Café del Centro</Text>
          <Text style={styles.submarca}>CAFÉ DE ESPECIALIDAD</Text>
        </View>

        <Tarjeta style={styles.formulario}>
          <Encabezado titulo="Inicia sesión" descripcion="Pide tu café favorito y acumula puntos." />

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
            placeholder="Tu contraseña"
            secureTextEntry
            value={datos.password}
            onChangeText={(valor) => cambiar("password", valor)}
            error={errores.password}
            returnKeyType="go"
            onSubmitEditing={enviar}
          />

          {errorGeneral ? <Text style={styles.errorGeneral}>{errorGeneral}</Text> : null}

          <Boton titulo="Entrar" onPress={enviar} cargando={enviando} />

          <View style={styles.separador}>
            <View style={styles.linea} />
            <Text style={styles.separadorTexto}>o</Text>
            <View style={styles.linea} />
          </View>

          <BotonGoogle onPress={entrarConGoogle} cargando={entrandoConGoogle} />
        </Tarjeta>

        <View style={styles.pie}>
          <Text style={styles.pieTexto}>¿No tienes cuenta? </Text>
          <Link href="/registro" style={styles.enlace}>
            Regístrate
          </Link>
        </View>
      </Pantalla>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  marca: {
    alignItems: "center",
    marginTop: espacio.xl,
    marginBottom: espacio.sm,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colores.cafe,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: espacio.md,
  },
  nombreMarca: {
    fontFamily: fuentes.titulo,
    fontSize: 32,
    color: colores.texto,
  },
  submarca: {
    fontFamily: fuentes.negrita,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colores.caramelo,
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
  separador: {
    flexDirection: "row",
    alignItems: "center",
    gap: espacio.sm,
  },
  linea: {
    flex: 1,
    height: 1,
    backgroundColor: colores.borde,
  },
  separadorTexto: {
    fontFamily: fuentes.texto,
    fontSize: 13,
    color: colores.textoSuave,
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