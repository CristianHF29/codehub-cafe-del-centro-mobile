import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Usuario } from "../types";

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

export function cerrarSesion() {
  return signOut(auth);
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