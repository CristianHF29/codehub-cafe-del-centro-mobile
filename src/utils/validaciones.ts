const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PATRON_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;

export type DatosLogin = {
  email: string;
  password: string;
};

export type DatosRegistro = DatosLogin & {
  nombre: string;
  confirmar: string;
};

export type Errores<T> = Partial<Record<keyof T, string>>;

function validarEmail(email: string) {
  if (!email.trim()) return "Ingresa tu correo";
  if (!PATRON_EMAIL.test(email.trim())) return "Ingresa un correo válido";
}

export function validarLogin({ email, password }: DatosLogin) {
  const errores: Errores<DatosLogin> = {};

  const errorEmail = validarEmail(email);
  if (errorEmail) errores.email = errorEmail;
  if (!password) errores.password = "Ingresa tu contraseña";

  return errores;
}

export function validarRegistro(datos: DatosRegistro) {
  const errores: Errores<DatosRegistro> = {};
  const nombre = datos.nombre.trim();

  if (nombre.length < 3) {
    errores.nombre = "Escribe tu nombre completo";
  } else if (!PATRON_NOMBRE.test(nombre)) {
    errores.nombre = "El nombre solo puede llevar letras";
  }

  const errorEmail = validarEmail(datos.email);
  if (errorEmail) errores.email = errorEmail;

  if (datos.password.length < 6) {
    errores.password = "Mínimo 6 caracteres";
  } else if (!/\d/.test(datos.password)) {
    errores.password = "Incluye al menos un número";
  }

  if (datos.confirmar !== datos.password) {
    errores.confirmar = "Las contraseñas no coinciden";
  }

  return errores;
}

export function tieneErrores(errores: object) {
  return Object.keys(errores).length > 0;
}