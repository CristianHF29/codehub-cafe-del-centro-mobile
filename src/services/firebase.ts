import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import * as FirebaseAuth from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNdOuEBQzmtxVmeINKB9mpWN7QFfC2MFI",
  authDomain: "cafe-del-centro-5df50.firebaseapp.com",
  projectId: "cafe-del-centro-5df50",
  storageBucket: "cafe-del-centro-5df50.firebasestorage.app",
  messagingSenderId: "470528255428",
  appId: "1:470528255428:web:0ea8c3fe8961791909f091",
};

// Evita inicializar Firebase dos veces cuando Expo recarga el código
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// getReactNativePersistence existe en la versión para React Native,
// pero los tipos de TypeScript solo incluyen la versión web
const { getReactNativePersistence } = FirebaseAuth as unknown as {
  getReactNativePersistence: (almacen: typeof AsyncStorage) => FirebaseAuth.Persistence;
};

function crearAuth() {
  try {
    // La sesión se guarda en el teléfono y se mantiene al cerrar la app
    return FirebaseAuth.initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return FirebaseAuth.getAuth(app);
  }
}

export const auth = crearAuth();
export const db = getFirestore(app);