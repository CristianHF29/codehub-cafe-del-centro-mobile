import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { login, registrar } from "../services/auth-service";
import { Usuario } from "../types";

const CLAVE_SESION = "cafe-del-centro:sesion";

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

export function SesionProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setCargando] = useState(true);

    // Recupera la sesión guardada al abrir la app
    useEffect(() => {
        AsyncStorage.getItem(CLAVE_SESION)
            .then((guardado) => {
                if (guardado) setUsuario(JSON.parse(guardado));
            })
            .finally(() => setCargando(false));
    }, []);

    // Cualquier cambio del usuario queda guardado en el dispositivo
    useEffect(() => {
        if (cargando) return;

        if (usuario) {
            AsyncStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
        } else {
            AsyncStorage.removeItem(CLAVE_SESION);
        }
    }, [usuario, cargando]);

    async function iniciarSesion(email: string, password: string) {
        const datos = await login(email.trim().toLowerCase(), password);

        if (datos.rol === "admin") {
            throw new Error("Esta app es para clientes. El panel de administración está en la versión web.");
        }

        setUsuario(datos);
    }

    async function registrarse({ nombre, email, password }: DatosRegistro) {
        await registrar({
            nombre: nombre.trim(),
            email: email.trim().toLowerCase(),
            password,
        });
        await iniciarSesion(email, password);
    }

    function cerrarSesion() {
        setUsuario(null);
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