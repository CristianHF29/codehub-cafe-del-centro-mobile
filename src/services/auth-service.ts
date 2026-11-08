import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { auth, db } from "./firebase";
import { Usuario } from "../types";

GoogleSignin.configure({
  webClientId: "470528255428-9ohpgd5k8hl8aap45ddh8rgs0tt72r3f.apps.googleusercontent.com",
});

type DatosRegistro = {
  nombre: string;
  email: string;
  password: string;
};

function perfilInicial(nombre: string, email: string) {
  return {
    nombre,
    email,
    rol: "cliente",
    puntos: 0,
    creado: serverTimestamp(),
  };
}

export async function registrar({ nombre, email, password }: DatosRegistro) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: nombre });
  await setDoc(doc(db, "usuarios", user.uid), perfilInicial(nombre, email));
}

export function iniciarSesion(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Devuelve null si la persona cierra la ventana de Google sin elegir cuenta
export async function iniciarSesionConGoogle() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const respuesta = await GoogleSignin.signIn();
    if (!isSuccessResponse(respuesta)) return null;

    const { idToken } = respuesta.data;
    if (!idToken) throw new Error("Google no devolvió la información de la cuenta");

    const credencial = GoogleAuthProvider.credential(idToken);
    const { user } = await signInWithCredential(auth, credencial);
    await asegurarPerfil(user);
    return user;
  } catch (error) {
    if (isErrorWithCode(error)) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) return null;
      if (error.code === statusCodes.IN_PROGRESS) return null;
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error("Este dispositivo no tiene Google Play Services");
      }
      if (error.code === "DEVELOPER_ERROR" || error.code === "10") {
        throw new Error("Falta registrar la huella SHA-1 de la app en Firebase");
      }
    }
    throw error;
  }
}

export async function cerrarSesion() {
  // Así la próxima vez Google vuelve a preguntar qué cuenta usar
  await GoogleSignin.signOut().catch(() => {});
  await signOut(auth);
}

// Crea el perfil si el usuario todavía no tiene uno en Firestore
export async function asegurarPerfil(user: User) {
  const referencia = doc(db, "usuarios", user.uid);
  const actual = await getDoc(referencia);

  if (!actual.exists()) {
    const nombre = user.displayName ?? user.email?.split("@")[0] ?? "Cliente";
    await setDoc(referencia, perfilInicial(nombre, user.email ?? ""));
  }
}

export async function obtenerUsuario(id: string): Promise<Usuario> {
  const datos = await getDoc(doc(db, "usuarios", id));
  if (!datos.exists()) throw new Error("No se encontró el perfil");

  const perfil = datos.data();
  return {
    id,
    nombre: perfil.nombre,
    email: perfil.email,
    rol: perfil.rol,
    puntos: perfil.puntos ?? 0,
  };
}