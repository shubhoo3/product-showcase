import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import EnquiryForm from './components/EnquiryForm';
import SuccessMessage from './components/SuccessMessage';
import Pagination from './components/Pagination';
import { fetchProducts, fetchCategories } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [searchTerm, selectedCategory, currentPage]);

  const loadCategories = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchProducts(searchTerm, selectedCategory, currentPage);
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError('Network error. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleEnquire = (product) => {
    setSelectedProduct(null);
    setEnquiryProduct(product);
  };

  const handleEnquirySuccess = () => {
    setEnquiryProduct(null);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilter
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={handleSearch}
          onCategoryChange={handleCategoryChange}
        />

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <ProductGrid products={products} onViewDetails={handleViewDetails} />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEnquire={handleEnquire}
        />
      )}

      {enquiryProduct && (
        <EnquiryForm
          product={enquiryProduct}
          onClose={() => setEnquiryProduct(null)}
          onSuccess={handleEnquirySuccess}
        />
      )}

      {showSuccess && (
        <SuccessMessage onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}

export default App;