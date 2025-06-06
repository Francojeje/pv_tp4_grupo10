import React, { useState, useEffect } from 'react';

const ProductoForm = ({ onGuardar, producto }) => {
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

useEffect(() => {
  if (producto) {
    setDescripcion(producto.descripcion || "");
    setPrecio(producto.precio || "");
  } else {
    setDescripcion("");
    setPrecio("");
  }
}, [producto]);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!descripcion.trim()) {
    alert("La descripción es obligatoria.");
    return;
  }
  if (isNaN(precio) || parseFloat(precio) <= 0) {
    alert("El precio debe ser un número positivo.");
    return;
  }

  onGuardar({ id: producto?.id, descripcion, precio: parseFloat(precio) });
  setDescripcion("");
  setPrecio("");
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
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <button type="submit">{producto ? "Guardar cambios" : "Agregar"}</button>
    </form>
  );
};

export default ProductoForm;
