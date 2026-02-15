import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

interface Category {
  _id: string;
  name: string;
}

interface ProductInput {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

interface ProductFormData {
  name: string;
  price: string;
  image: string;
  description: string;
  category: string;
  stock: string;
}

interface ProductFormErrors {
  name?: string;
  price?: string;
  image?: string;
  description?: string;
  category?: string;
  stock?: string;
}

const CreateProduct = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
  });

  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [imagePreview, setImagePreview] = useState<string>("");

  // Fetch categories for dropdown
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch("/api/v1/categories/get-category");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const result = await response.json();
      return result.data as Category[];
    }
  });

  // Create product mutation
  const mutation = useMutation<any, Error, ProductInput>({
    mutationFn: async (newProduct: ProductInput) => {
      const response = await fetch("/api/v1/products/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
        credentials: "include",
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to create product");
      }
      
      const result = await response.json();
      return result.data;
    },
    onSuccess: () => {
      // Reset form
      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
        stock: "",
      });
      setImagePreview("");
      setErrors({});
      
      // Navigate to products list
      navigate('/products');
    },
    onError: (error: Error) => {
      console.error("Error creating product:", error);
    },
  });

  const validateForm = (): boolean => {
    const newErrors: ProductFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.stock) {
      newErrors.stock = "Stock quantity is required";
    } else if (parseInt(formData.stock) < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update image preview
    if (name === "image" && value.trim()) {
      setImagePreview(value.trim());
    }

    // Clear error for this field
    if (errors[name as keyof ProductFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const productData: ProductInput = {
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      image: formData.image.trim(),
      description: formData.description.trim(),
      category: formData.category,
      stock: parseInt(formData.stock),
    };

    mutation.mutate(productData);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/products')}
            className="text-gray-600 hover:text-gray-900 transition mb-4 flex items-center gap-2"
          >
            <span>←</span> Back to Products
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Create New Product
          </h1>
          <p className="text-gray-600 mt-2">Add a new product to your inventory</p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-50 rounded-2xl shadow-md p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Product Name */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                Product Name *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={`w-full px-4 py-3 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">{errors.name}</p>
              )}
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Price ($) *
                </label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-3 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-2">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Stock Quantity *
                </label>
                <Input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full px-4 py-3 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-2">{errors.stock}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a category</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-2">{errors.category}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                Image URL *
              </label>
              <Input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-4 py-3 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.image ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-2">{errors.image}</p>
              )}
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <div className="w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/128?text=Invalid+URL";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Enter product description"
                className={`w-full px-4 py-3 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-2">{errors.description}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition font-medium"
              >
                {mutation.isPending ? "Creating Product..." : "Create Product"}
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/products')}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;