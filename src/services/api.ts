// Traduce los errores de Firebase a mensajes claros para el cliente
const MENSAJES_FIREBASE: Record<string, string> = {
  "auth/invalid-credential": "Correo o contraseña incorrectos",
  "auth/invalid-email": "El correo no es válido",
  "auth/email-already-in-use": "Ya existe una cuenta con ese correo",
  "auth/weak-password": "La contraseña es muy débil",
  "auth/too-many-requests": "Demasiados intentos. Espera un momento e intenta de nuevo",
  "auth/network-request-failed": "No hay conexión a internet",
  "auth/user-disabled": "Esta cuenta está deshabilitada",
  "permission-denied": "No tienes permiso para realizar esta acción",
  unavailable: "No se pudo conectar con el servidor. Revisa tu conexión.",
};

export function mensajeError(error: unknown) {
  if (typeof error === "object" && error !== null && "code" in error) {
    const codigo = String((error as { code: unknown }).code);
    if (MENSAJES_FIREBASE[codigo]) return MENSAJES_FIREBASE[codigo];
  }

  return error instanceof Error ? error.message : "Ocurrió un error inesperado";
}