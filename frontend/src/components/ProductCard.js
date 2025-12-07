import React from 'react';

const ProductCard = ({ product, onViewDetails }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
    <img 
      src={product.image_url} 
      alt={product.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <div className="text-sm text-blue-600 font-medium mb-1">{product.category}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.short_desc}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
        <button
          onClick={() => onViewDetails(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;