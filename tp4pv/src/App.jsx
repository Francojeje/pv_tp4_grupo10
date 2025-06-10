import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

const agregarProducto = useCallback((producto) => {
  setProductos(prev =>
    producto.id
      ? prev.map(p => p.id === producto.id ? producto : p)
      : [...prev, { ...producto, id: Date.now() }]
  );
  setEditando(null);
}, []);

const eliminarProducto = useCallback((id) => {
  setProductos(prev => prev.filter(p => p.id !== id));
}, []);

const editarProducto = useCallback((producto) => {
  setEditando(producto);
}, []);

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
