import React from 'react';

const SearchFilter = ({ searchTerm, selectedCategory, categories, onSearchChange, onCategoryChange }) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">Search products</label>
        <input
          type="text"
          id="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="sm:w-64">
        <label htmlFor="category" className="sr-only">Filter by category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={onCategoryChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;