import React from 'react';

const ProductoSearch = ({ valor, onBuscar }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por ID o descripción"
        value={valor}
        onChange={(e) => onBuscar(e.target.value)}
      />
    </div>
  );
};

export default ProductoSearch;
