import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, ArrowLeft, Edit2, FileText, DollarSign, Package as PackageIcon, Weight, Award, Upload, ToggleLeft } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  category: z.string().min(1, 'Please select a category'),
  price: z.string().min(1, 'Price is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Price must be a positive number',
  }),
  weight: z.string().optional(),
  purity: z.string().optional(),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  stock: z.string().min(1, 'Stock is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Stock must be a non-negative number',
  }),
  status: z.enum(['active', 'inactive']),
});

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const found = allProducts.find(prod => prod.id === Number(id));
    
    if (found) {
      setProduct(found);
      setImagePreview(found.image || null);
      
      // Load categories for the same gender
      const allCategories = JSON.parse(localStorage.getItem('categories') || '[]');
      const filtered = allCategories.filter(cat => cat.gender === found.gender && cat.status === 'active');
      setCategories(filtered);
      
      reset({
        name: found.name,
        category: found.category,
        price: found.price.toString(),
        weight: found.weight || '',
        purity: found.purity || '',
        description: found.description,
        stock: found.stock.toString(),
        status: found.status,
      });
    }
  }, [id, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = allProducts.map(prod =>
      prod.id === Number(id)
        ? { 
            ...prod, 
            ...data,
            price: Number(data.price),
            stock: Number(data.stock),
            image: imagePreview || prod.image,
            updatedAt: new Date().toISOString() 
          }
        : prod
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    navigate('/products/manage');
  };

  if (!product) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Product not found</p>
          <button
            onClick={() => navigate('/products/manage')}
            className="mt-4 btn-primary"
          >
            Back to Manage Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header with Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/products/manage')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Manage Products</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Edit2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600 mt-1">Update product information</p>
          </div>
        </div>
      </div>

      {/* Edit Form Card */}
      <div className="card max-w-6xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Fields */}
          <div className="space-y-5">
            {/* Product Name & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-200">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  Product Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 font-medium"
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                    {errors.name.message}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-200">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <PackageIcon className="w-4 h-4 mr-2 text-blue-600" />
                  Category *
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 font-medium cursor-pointer"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                    {errors.category.message}
                  </div>
                )}
              </div>
            </div>

            {/* Price & Stock Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                <label className="flex items-center text-sm font-semibold text-green-900 mb-3">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                  Price (₹) *
                </label>
                <input
                  {...register('price')}
                  type="text"
                  className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-900 font-bold"
                  placeholder="e.g., 25000"
                />
                {errors.price && (
                  <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                    {errors.price.message}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
                <label className="flex items-center text-sm font-semibold text-blue-900 mb-3">
                  <PackageIcon className="w-4 h-4 mr-2 text-blue-600" />
                  Stock Quantity *
                </label>
                <input
                  {...register('stock')}
                  type="text"
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 font-bold"
                  placeholder="e.g., 50"
                />
                {errors.stock && (
                  <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                    {errors.stock.message}
                  </div>
                )}
              </div>
            </div>

            {/* Weight & Purity Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-200">
                <label className="flex items-center text-sm font-semibold text-amber-900 mb-3">
                  <Weight className="w-4 h-4 mr-2 text-amber-600" />
                  Weight (grams)
                </label>
                <input
                  {...register('weight')}
                  type="text"
                  className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-gray-900 font-medium"
                  placeholder="e.g., 10.5"
                />
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-5 border border-rose-200">
                <label className="flex items-center text-sm font-semibold text-rose-900 mb-3">
                  <Award className="w-4 h-4 mr-2 text-rose-600" />
                  Purity
                </label>
                <select
                  {...register('purity')}
                  className="w-full px-4 py-3 border-2 border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-gray-900 font-medium cursor-pointer"
                >
                  <option value="">Select purity</option>
                  <option value="24K">24K Gold</option>
                  <option value="22K">22K Gold</option>
                  <option value="18K">18K Gold</option>
                  <option value="14K">14K Gold</option>
                  <option value="Silver 925">Silver 925</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-200">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                Description *
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900"
                placeholder="Enter product description"
              />
              {errors.description && (
                <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                  {errors.description.message}
                </div>
              )}
            </div>

            {/* Status */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-200">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <ToggleLeft className="w-4 h-4 mr-2 text-blue-600" />
                Status *
              </label>
              <select
                {...register('status')}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 font-medium cursor-pointer"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border border-indigo-200">
              <label className="flex items-center text-sm font-semibold text-indigo-900 mb-3">
                <Upload className="w-4 h-4 mr-2 text-indigo-600" />
                Product Image
              </label>
              <div className="flex flex-col gap-4">
                <label className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-indigo-300 rounded-lg hover:bg-indigo-100 transition-colors">
                    <Upload size={20} className="text-indigo-600" />
                    <span className="text-indigo-700 font-medium">Upload New Image</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <div className="relative w-full h-40 border-2 border-indigo-200 rounded-lg overflow-hidden bg-white">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
            </div>

            {/* Gender Display (Read-only) */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
              <label className="text-sm font-semibold text-purple-900 mb-2 block">
                Gender Category
              </label>
              <div className="text-lg font-bold text-purple-700 capitalize">{product.gender}</div>
              <p className="text-xs text-purple-600 mt-1">Gender cannot be changed after creation</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/products/manage')}
              disabled={isSubmitting}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
