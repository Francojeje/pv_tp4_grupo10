import React from 'react';

const ProductoList = ({ productos, onEliminar, onEditar }) => {
  return (
    <div>
      <h3>Lista de Productos</h3>
      <ul>
        {productos.map(p => (
          <li key={p.id}>
            #{p.id} - {p.descripcion} - ${p.precio}
            <button onClick={() => onEditar(p)}>Editar</button>
            <button onClick={() => onEliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductoList;
