import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Button from '../../../components/Button';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  stock: number;
}

const Products = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Fetch products
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch("/api/v1/products/get-products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const result = await response.json();
      return result.data as Product[];
    }
  });

  // Delete product mutation
  const deleteMutation = useMutation<string, Error, string>({
    mutationFn: async (id) => {
      const response = await fetch(`/api/v1/products/delete-product/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      
      const result = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err) => {
      console.error("Delete error:", err.message);
    }
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  // Filter products
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category._id === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(
    new Set(products?.map(p => JSON.stringify({ _id: p.category._id, name: p.category.name })))
  ).map(str => JSON.parse(str));

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Out of Stock", color: "text-red-600 bg-red-50" };
    if (stock <= 10) return { text: "Low Stock", color: "text-yellow-600 bg-yellow-50" };
    return { text: "In Stock", color: "text-green-600 bg-green-50" };
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">
              Manage your product inventory ({filteredProducts?.length || 0} products)
            </p>
          </div>
          <Button
            onClick={() => navigate('/admin/products/create-products')}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition font-medium flex items-center gap-2 justify-center"
          >
            <FaPlus /> Add New Product
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-2xl shadow-md p-5 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by product name..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">All Categories</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-gray-50 rounded-2xl shadow-md p-5 sm:p-6">
          
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 text-gray-600 font-medium pb-4 border-b mb-4">
            <div className="col-span-1">Image</div>
            <div className="col-span-3">Product</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1">Price</div>
            <div className="col-span-1">Stock</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-end">Actions</div>
          </div>

          {/* Products */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="space-y-4">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                
                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow"
                  >
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid grid-cols-12 items-center gap-4">
                      {/* Image */}
                      <div className="col-span-1">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/64?text=No+Image";
                            }}
                          />
                        </div>
                      </div>

                      {/* Product Name & Description */}
                      <div className="col-span-3">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                          {product.description}
                        </p>
                      </div>

                      {/* Category */}
                      <div className="col-span-2">
                        <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full">
                          {product.category.name}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="col-span-1">
                        <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
                      </div>

                      {/* Stock */}
                      <div className="col-span-1">
                        <p className="font-semibold text-gray-700">{product.stock}</p>
                      </div>

                      {/* Status */}
                      <div className="col-span-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2 flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`/products/edit/${product._id}`)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
                          disabled={deleteMutation.isPending}
                          className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition disabled:opacity-50"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden">
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/80?text=No+Image";
                            }}
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                          <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded-full mb-2">
                            {product.category.name}
                          </span>
                          <div className="flex items-center gap-3 text-sm">
                            <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
                            <p className="text-gray-600">Stock: {product.stock}</p>
                          </div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${stockStatus.color}`}>
                            {stockStatus.text}
                          </span>
                        </div>
                      </div>

                      {/* Mobile Actions */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => navigate(`/products/edit/${product._id}`)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition font-medium text-sm flex items-center justify-center gap-2"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
                          disabled={deleteMutation.isPending}
                          className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                {searchTerm || filterCategory ? "No products found matching your filters" : "No products yet"}
              </p>
              {!searchTerm && !filterCategory && (
                <Button
                  onClick={() => navigate('/products/create')}
                  className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition font-medium inline-flex items-center gap-2"
                >
                  <FaPlus /> Add Your First Product
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;