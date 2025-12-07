import React from 'react';

const ProductModal = ({ product, onClose, onEnquire }) => {
  if (!product) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4" 
      style={{ zIndex: 1000 }}
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
        style={{ position: 'relative', zIndex: 1001 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-90 text-2xl font-bold"
            style={{ zIndex: 10 }}
          >
            ×
          </button>
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="p-6 bg-white">
          <div className="text-sm text-blue-600 font-medium mb-2">{product.category}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{product.long_desc}</p>
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <button
              onClick={() => onEnquire(product)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;