import React, { useState, useEffect, useMemo } from 'react';
import ProductoForm from './components/ProductoForm';
import ProductoList from './components/ProductoList';
import ProductoSearch from './components/ProductoSearch';
import './App.css'; 

const App = () => {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos');
    return guardados ? JSON.parse(guardados) : [];
  });
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

  const productosFiltrados = useMemo(() =>
    productos.filter(p =>
      p.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      String(p.id).includes(busqueda)
    ),
    [productos, busqueda]
  );

  
  useEffect(() => {
  localStorage.setItem('productos', JSON.stringify(productos));
}, [productos]);

  return (
    <div className="app-container">
      <h1>Gestión de Productos</h1>
      <div className="panel">
        <ProductoForm onGuardar={agregarProducto} producto={editando} />
        <ProductoSearch valor={busqueda} onBuscar={setBusqueda} />
      </div>
      {productos.length === 0 && (
        <div className="mensaje-info">No hay productos cargados.</div>
      )}
      {productos.length > 0 && productosFiltrados.length === 0 && (
        <div className="mensaje-info">No se encontraron productos con esa búsqueda.</div>
      )}
      <ProductoList
        productos={productosFiltrados}
        onEliminar={eliminarProducto}
        onEditar={editarProducto}
      />
    </div>
  );
};

export default App;
