import React, { useState } from 'react';
import ProductoForm from './components/ProductoForm';
import ProductoList from './components/ProductoList';
import ProductoSearch from './components/ProductoSearch';

const App = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);

  const agregarProducto = (producto) => {
    if (editando) {
      setProductos(productos.map(p => p.id === producto.id ? producto : p));
      setEditando(null);
    } else {
      setProductos([...productos, { ...producto, id: Date.now() }]);
    }
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const editarProducto = (producto) => {
    setEditando(producto);
  };

  const productosFiltrados = productos.filter(p =>
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
    String(p.id).includes(busqueda)
  );

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <ProductoForm onGuardar={agregarProducto} producto={editando} />
      <ProductoSearch valor={busqueda} onBuscar={setBusqueda} />
      <ProductoList
        productos={productosFiltrados}
        onEliminar={eliminarProducto}
        onEditar={editarProducto}
      />
    </div>
  );
};

export default App;
