import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import {
  asegurarPerfil,
  cerrarSesion as salirDeFirebase,
  iniciarSesion as entrarConCorreo,
  obtenerUsuario,
  registrar,
} from "../services/auth-service";
import { Usuario } from "../types";

type DatosRegistro = {
  nombre: string;
  email: string;
  password: string;
};

type SesionValor = {
  usuario: Usuario | null;
  cargando: boolean;
  iniciarSesion: (email: string, password: string) => Promise<void>;
  registrarse: (datos: DatosRegistro) => Promise<void>;
  cerrarSesion: () => void;
  actualizarPuntos: (puntos: number) => void;
};

const SesionContext = createContext<SesionValor | null>(null);

const MENSAJE_ADMIN =
  "Esta app es para clientes. El panel de administración está en la versión web.";

export function SesionProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let dejarDeEscucharPerfil: (() => void) | undefined;

    const dejarDeEscucharAuth = onAuthStateChanged(auth, (user) => {
      dejarDeEscucharPerfil?.();
      dejarDeEscucharPerfil = undefined;

      if (!user) {
        setUsuario(null);
        setCargando(false);
        return;
      }

      // El perfil se escucha en tiempo real, así los puntos se actualizan solos
      dejarDeEscucharPerfil = onSnapshot(
        doc(db, "usuarios", user.uid),
        (perfil) => {
          if (!perfil.exists()) {
            asegurarPerfil(user);
            return;
          }

          const datos = perfil.data();
          if (datos.rol === "admin") {
            salirDeFirebase();
            return;
          }

          setUsuario({
            id: user.uid,
            nombre: datos.nombre,
            email: datos.email,
            rol: datos.rol,
            puntos: datos.puntos ?? 0,
          });
          setCargando(false);
        },
        () => setCargando(false)
      );
    });

    return () => {
      dejarDeEscucharPerfil?.();
      dejarDeEscucharAuth();
    };
  }, []);

  async function iniciarSesion(email: string, password: string) {
    const { user } = await entrarConCorreo(email.trim().toLowerCase(), password);
    const perfil = await obtenerUsuario(user.uid).catch(() => null);

    if (perfil?.rol === "admin") {
      await salirDeFirebase();
      throw new Error(MENSAJE_ADMIN);
    }
  }

  async function registrarse({ nombre, email, password }: DatosRegistro) {
    await registrar({
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      password,
    });
  }

  function cerrarSesion() {
    salirDeFirebase();
  }

  const actualizarPuntos = useCallback((puntos: number) => {
    setUsuario((actual) => (actual ? { ...actual, puntos } : actual));
  }, []);

  return (
    <SesionContext.Provider
      value={{ usuario, cargando, iniciarSesion, registrarse, cerrarSesion, actualizarPuntos }}
    >
      {children}
    </SesionContext.Provider>
  );
}

export function useSesion() {
  const contexto = useContext(SesionContext);
  if (!contexto) throw new Error("useSesion debe usarse dentro de SesionProvider");
  return contexto;
}