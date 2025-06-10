import React, { useState, useEffect } from 'react';

const ProductoForm = ({ onGuardar, producto }) => {
  const [descripcion, setDescripcion] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [descuento, setDescuento] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (producto) {
      setDescripcion(producto.descripcion || "");
      setPrecioUnitario(producto.precioUnitario || "");
      setDescuento(producto.descuento || "");
      setStock(producto.stock || "");
    } else {
      setDescripcion("");
      setPrecioUnitario("");
      setDescuento("");
      setStock("");
    }
  }, [producto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const precio = parseFloat(precioUnitario);
    const desc = parseFloat(descuento) || 0;
    const stockNum = parseInt(stock);

    if (!descripcion.trim() || isNaN(precio) || precio <= 0 || isNaN(stockNum) || stockNum < 0) {
      alert("Todos los campos son obligatorios y deben tener valores válidos.");
      return;
    }

    const precioConDescuento = precio * (1 - desc / 100);

    onGuardar({
      id: producto?.id,
      descripcion,
      precioUnitario: precio,
      descuento: desc,
      precioConDescuento,
      stock: stockNum,
    });

    setDescripcion("");
    setPrecioUnitario("");
    setDescuento("");
    setStock("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{producto ? "Editar Producto" : "Agregar Producto"}</h3>
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio Unitario"
        value={precioUnitario}
        onChange={(e) => setPrecioUnitario(e.target.value)}
      />
      <input
        type="number"
        placeholder="Descuento (%)"
        value={descuento}
        onChange={(e) => setDescuento(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button type="submit">{producto ? "Guardar cambios" : "Agregar"}</button>
    </form>
  );
};

export default ProductoForm;
