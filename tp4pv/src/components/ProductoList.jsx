import React from 'react';

const ProductoList = ({ productos, onEliminar, onEditar }) => {
  return (
    <div>
      <h3>Lista de Productos</h3>
      <ul>
        {productos.map(p => (
          <li key={p.id} className="producto-item">
            #{p.id} - {p.descripcion} - ${p.precio}
            <button className='boton' onClick={() => onEditar(p)}>✏️ Editar</button>
            <button className='boton' onClick={() => onEliminar(p.id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductoList;
