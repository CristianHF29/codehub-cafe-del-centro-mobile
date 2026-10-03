import { useMemo, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Pantalla from "../../components/pantalla";
import Encabezado from "../../components/encabezado";
import Tarjeta from "../../components/tarjeta";
import TarjetaMenu from "../../components/tarjeta-menu";
import HojaProducto from "../../components/hoja-producto";
import Cargando from "../../components/cargando";
import EstadoVacio from "../../components/estado-vacio";
import { useProductos } from "../../hooks/use-productos";
import { nombreCategoria } from "../../utils/formato";
import { Producto } from "../../types";
import { colores, espacio, fuentes } from "../../constants/theme";

export default function Menu() {
  const { productos, cargando, error, recargar } = useProductos();
  const [seleccionado, setSeleccionado] = useState<Producto | null>(null);

  // Agrupa el catálogo por categoría para mostrarlo en secciones
  const secciones = useMemo(() => {
    const grupos = new Map<string, Producto[]>();

    productos.forEach((producto) => {
      const categoria = nombreCategoria(producto.categoria);
      grupos.set(categoria, [...(grupos.get(categoria) ?? []), producto]);
    });

    return Array.from(grupos, ([titulo, lista]) => ({ titulo, lista }));
  }, [productos]);

  if (cargando && productos.length === 0) {
    return <Cargando texto="Preparando el menú..." />;
  }

  if (error) {
    return (
      <EstadoVacio
        icono="cloud-offline-outline"
        titulo="No pudimos cargar el menú"
        texto={error}
        accion={{ titulo: "Reintentar", onPress: recargar }}
      />
    );
  }

  return (
    <>
      <Pantalla refrescando={cargando} onRefrescar={recargar}>
        <Encabezado
          etiqueta="Nuestra carta"
          titulo="Café con identidad y origen"
          descripcion="Toca una bebida para elegir el tamaño de vaso."
        />

        {secciones.map((seccion) => (
          <View key={seccion.titulo} style={styles.seccion}>
            <Text style={styles.tituloSeccion}>{seccion.titulo}</Text>
            <Tarjeta style={styles.lista}>
              {seccion.lista.map((producto, indice) => (
                <TarjetaMenu
                  key={producto.id}
                  producto={producto}
                  ultimo={indice === seccion.lista.length - 1}
                  onAbrir={() => setSeleccionado(producto)}
                />
              ))}
            </Tarjeta>
          </View>
        ))}
      </Pantalla>

      <HojaProducto producto={seleccionado} onCerrar={() => setSeleccionado(null)} />
    </>
  );
}

const styles = StyleSheet.create({
  seccion: {
    gap: espacio.sm,
  },
  tituloSeccion: {
    fontFamily: fuentes.titulo,
    fontSize: 24,
    color: colores.texto,
    marginTop: espacio.sm,
  },
  lista: {
    paddingVertical: 0,
  },
});