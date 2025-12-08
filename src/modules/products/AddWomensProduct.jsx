import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, Trash2 } from 'lucide-react';

const mockMainCategories = [
  { id: 1, name: 'Rings' },
  { id: 2, name: 'Necklaces' },
  { id: 3, name: 'Bracelets' },
  { id: 4, name: 'Earrings' },
  { id: 5, name: 'Pendants' }
];

const mockSubCategories = [
  { id: 1, name: 'Engagement Rings', parentId: 1 },
  { id: 2, name: 'Wedding Bands', parentId: 1 },
  { id: 3, name: 'Fashion Necklaces', parentId: 2 },
  { id: 4, name: 'Chokers', parentId: 2 },
  { id: 5, name: 'Cuff Bracelets', parentId: 3 }
];

const mockMetalTypes = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum', 'Silver'];
const mockStoneTypes = ['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl', 'None'];

export default function AddWomensProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    weight: '',
    metalType: '',
    stoneType: '',
    stock: '',
    description: '',
    mainCategory: '',
    subCategory: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic would go here
    console.log('Saving women\'s product:', formData);
    navigate('/products/womens/manage');
  };

  // Filter subcategories based on selected main category
  const filteredSubCategories = mockSubCategories.filter(
    sub => sub.parentId === parseInt(formData.mainCategory) || !formData.mainCategory
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Women's Product</h1>
          <p className="text-gray-600 mt-1">Create a new product for women's collection</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter price"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (grams) *</label>
                  <input
                    type="number"
                    step="0.01"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter weight"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter stock quantity"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Metal Type *</label>
                  <select
                    name="metalType"
                    value={formData.metalType}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select metal type</option>
                    {mockMetalTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stone Type</label>
                  <select
                    name="stoneType"
                    value={formData.stoneType}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select stone type</option>
                    {mockStoneTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Main Category *</label>
                  <select
                    name="mainCategory"
                    value={formData.mainCategory}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select main category</option>
                    {mockMainCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="input-field"
                    disabled={!formData.mainCategory}
                  >
                    <option value="">Select sub category</option>
                    {filteredSubCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="input-field"
                  placeholder="Enter product description"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <div className="card">
                <h4 className="font-semibold text-gray-900 mb-4">Product Images</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label className="btn-primary cursor-pointer inline-block">
                      <span>Upload Images</span>
                      <input 
                        type="file" 
                        className="sr-only" 
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Selected Images:</h5>
                    <div className="grid grid-cols-3 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <div className="w-full h-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                            {image.name}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="card">
                <h4 className="font-semibold text-gray-900 mb-4">Publish Options</h4>
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full btn-primary"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      name: '',
                      price: '',
                      weight: '',
                      metalType: '',
                      stoneType: '',
                      stock: '',
                      description: '',
                      mainCategory: '',
                      subCategory: '',
                      images: []
                    })}
                    className="w-full btn-secondary"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}