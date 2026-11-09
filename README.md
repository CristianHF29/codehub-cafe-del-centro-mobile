# Café del Centro · App móvil

App para pedir café en **Café del Centro**, una cafetería de especialidad en el Centro Histórico de San Salvador. Desde el teléfono podés ver el menú, elegir el tamaño de tu bebida, pagar y acumular puntos.

Es la versión móvil del proyecto de DPS941. La versión web, con el panel de administración, está en [codehub-cafe-del-centro-web](https://github.com/CristianHF29/codehub-cafe-del-centro-web).

## Entrega Foro 1

- **Video de demostración:** [Ver video](https://udbedu-my.sharepoint.com/:v:/g/personal/hf252375_alumno_udb_edu_sv/IQCtN-2-UVxfSaUael5wPyzDAZqpA-RhDCI1ZZ76po8zh-s?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=91Y5vg)
- **Documento:** [Investigación sobre React Native y Figma aplicados al proyecto (PDF)](Etapa3-CodeHub-Movil.pdf)
- **Código fuente entregado:** [ver versión del Foro 1](https://github.com/CristianHF29/codehub-cafe-del-centro-mobile/tree/foro-1)

## Entrega Foro 2

- **Video de demostración:** [Ver video](https://udbedu-my.sharepoint.com/:v:/g/personal/hf252375_alumno_udb_edu_sv/IQC02c4GFIAUQIGde5hmSK3nAfFTIbZccIG0Pfx9Izk0yKU?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=gRt7aK)
- **Documento:** [Integración de Firebase en la aplicación móvil (PDF)](Etapa3-Foro2-Firebase.pdf)
- **Código fuente entregado:** [ver versión del Foro 2](https://github.com/CristianHF29/codehub-cafe-del-centro-mobile/tree/foro-2)

## Qué hace

- Registro e inicio de sesión con correo o con cuenta de Google
- Menú por categorías, con fotos y tamaños de 16 a 32 oz
- Carrito con cantidades y total
- Pago en efectivo o con tarjeta (simulado, no cobra nada)
- Puntos de fidelidad: 1 punto por cada dólar
- Historial de pedidos y puntos que se actualizan en tiempo real

## Tecnologías

React Native, Expo, Expo Router y TypeScript. La autenticación usa Firebase Authentication y los datos se guardan en Cloud Firestore.

## Cómo correrlo

1. Cloná el repo e instalá las dependencias:

```bash
git clone https://github.com/CristianHF29/codehub-cafe-del-centro-mobile.git
cd codehub-cafe-del-centro-mobile
npm install
```

2. La app usa el inicio de sesión de Google, que no funciona en Expo Go. Por eso necesita una development build, que se compila una sola vez con EAS:

```bash
npm install -g eas-cli
eas login
eas build -p android --profile development
```

Al terminar, instalá el APK en el emulador o en un teléfono Android.

3. Arrancá el servidor de desarrollo:

```bash
npx expo start
```

Presioná `a` para abrir la app en el emulador de Android.

## Cómo probarla

Creá una cuenta desde **Regístrate** o entrá con **Continuar con Google**. La app es solo para clientes; el panel de administración está en la versión web.

## Estructura

```
src/
  app/          pantallas y navegación
  components/   piezas reutilizables (botones, tarjetas, campos)
  context/      sesión y carrito
  hooks/        lógica compartida, como la carga de productos
  services/     conexión con Firebase y consultas a Firestore
  constants/    colores y fuentes
  utils/        validaciones y formatos
scripts/        carga inicial del catálogo en Firestore
```

## Equipo CodeHub

| Integrante | Carnet |
|---|---|
| Cristian Arturo Hernández Flores | HF252375 |