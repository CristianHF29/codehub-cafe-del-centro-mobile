# Café del Centro · App móvil

App para pedir café en **Café del Centro**, una cafetería de especialidad en el Centro Histórico de San Salvador. Desde el teléfono podés ver el menú, elegir el tamaño de tu bebida, pagar y acumular puntos.

Es la versión móvil del proyecto de DPS941. La versión web, con el panel de administración, está en [codehub-cafe-del-centro-web](https://github.com/CristianHF29/codehub-cafe-del-centro-web).

## Qué hace

- Registro e inicio de sesión, con la sesión guardada en el teléfono
- Menú por categorías, con fotos y tamaños de 16 a 32 oz
- Carrito con cantidades y total
- Pago en efectivo o con tarjeta (simulado, no cobra nada)
- Puntos de fidelidad: 1 punto por cada dólar
- Historial de pedidos que se actualiza solo cuando el admin cambia el estado desde la web

## Tecnologías

React Native, Expo, Expo Router y TypeScript. Los datos vienen de la API del proyecto web.

## Cómo correrlo

1. Cloná el repo e instalá las dependencias:

```bash
   git clone https://github.com/CristianHF29/codehub-cafe-del-centro-mobile.git
   cd codehub-cafe-del-centro-mobile
   npm install
```

2. Revisá la URL de la API en `src/constants/config.ts`. Por defecto apunta a Vercel; si querés usar el proyecto web en local, poné la IP de tu compu, por ejemplo `http://192.168.0.10:3000/api`.

3. Arrancá la app:

```bash
   npx expo start
```

   Escaneá el QR con **Expo Go** o presioná `a` para abrirla en el emulador de Android.

## Usuario de prueba

| Correo | Contraseña |
|---|---|
| cliente@correo.com | cliente123 |

La app es solo para clientes. Si entrás con una cuenta de administrador, te avisa que el panel está en la web.

## Estructura

```
src/
  app/          pantallas y navegación
  components/   piezas reutilizables (botones, tarjetas, campos)
  context/      sesión y carrito
  services/     llamadas a la API
  constants/    colores, fuentes y configuración
  utils/        validaciones y formatos
```

## Equipo CodeHub

| Integrante | Carnet |
|---|---|
| Rebeca Sarai Flores De Tejada | FD253107 |
| Cristian Arturo Hernández Flores | HF252375 |
| Henry Beisson Chacón García | CG253400 |
| Giovanni Manuel Quijano Sosa | QS242538 |
| Eduardo Ezequiel Amaya Montano | AM210570 |
