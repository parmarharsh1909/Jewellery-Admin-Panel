import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Tag, DollarSign, Package as PackageIcon, Weight, Award, Info, ArrowLeft } from 'lucide-react';

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const found = allProducts.find(prod => prod.id === Number(id));
    setProduct(found);
  }, [id]);

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
        <h1 className="text-3xl font-bold text-gray-900">View Product</h1>
        <p className="text-gray-600 mt-2">Product details and information</p>
      </div>

      {/* Product Details Card */}
      <div className="card max-w-6xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <PackageIcon className="w-10 h-10 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                    product.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 capitalize">
                    {product.gender}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Image if exists */}
          {product.image && (
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6">
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-white flex items-center justify-center">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
              </div>
            </div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Price */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h3 className="text-sm font-semibold text-green-900">Price</h3>
              </div>
              <p className="text-2xl font-bold text-green-700">₹{product.price.toLocaleString()}</p>
            </div>

            {/* Stock */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <PackageIcon className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-semibold text-blue-900">Stock</h3>
              </div>
              <p className="text-2xl font-bold text-blue-700">{product.stock} units</p>
            </div>

            {/* Category */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-semibold text-purple-900">Category</h3>
              </div>
              <p className="text-xl font-bold text-purple-700">{product.category}</p>
            </div>

            {/* Weight */}
            {product.weight && (
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Weight className="w-5 h-5 text-amber-600" />
                  <h3 className="text-sm font-semibold text-amber-900">Weight</h3>
                </div>
                <p className="text-xl font-bold text-amber-700">{product.weight}g</p>
              </div>
            )}

            {/* Purity */}
            {product.purity && (
              <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-5 border border-rose-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-rose-600" />
                  <h3 className="text-sm font-semibold text-rose-900">Purity</h3>
                </div>
                <p className="text-xl font-bold text-rose-700">{product.purity}</p>
              </div>
            )}

            {/* Gender */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border border-indigo-200">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-semibold text-indigo-900">Gender</h3>
              </div>
              <p className="text-xl font-bold text-indigo-700 capitalize">{product.gender}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Created Date */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl p-5 border border-gray-200">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Created On</h3>
                <p className="text-base font-medium text-gray-900">
                  {new Date(product.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => navigate(`/products/edit/${product.id}`)}
              className="btn-primary"
            >
              Edit Product
            </button>
            <button
              onClick={() => navigate('/products/manage')}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
