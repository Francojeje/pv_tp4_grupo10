import React from 'react';

const ProductoList = ({ productos, onEliminar, onEditar }) => {
  return (
    <div>
      <h3>Lista de Productos</h3>
      <ul>
        {productos.map(p => (
          <li key={p.id} className="producto-item">
            <p><strong>ID:</strong> {p.id}</p>
            <p><strong>Descripción:</strong> {p.descripcion}</p>
            <p><strong>Precio Unitario:</strong> ${p.precioUnitario}</p>
            <p><strong>Descuento:</strong> {p.descuento}%</p>
            <p><strong>Precio con Descuento:</strong> ${p.precioConDescuento.toFixed(2)}</p>
            <p><strong>Stock:</strong> {p.stock}</p>
            <button className='boton' onClick={() => onEditar(p)}>✏️ Editar</button>
            <button className='boton' onClick={() => onEliminar(p.id)}>🗑️ Eliminar</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductoList;
