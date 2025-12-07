const API_URL = 'http://localhost:3001/api';

export const fetchProducts = async (searchTerm, selectedCategory, currentPage, limit = 9) => {
  const params = new URLSearchParams({
    page: currentPage,
    limit: limit,
    ...(searchTerm && { search: searchTerm }),
    ...(selectedCategory && { category: selectedCategory })
  });
  
  const response = await fetch(`${API_URL}/products?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to load products');
  }
  
  return await response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to load categories');
  }
  
  const data = await response.json();
  return data.categories || [];
};

export const submitEnquiry = async (productId, formData) => {
  const response = await fetch(`${API_URL}/enquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id: productId,
      ...formData
    })
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to submit enquiry');
  }
  
  return data;
};