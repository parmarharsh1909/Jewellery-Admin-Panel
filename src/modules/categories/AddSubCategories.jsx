import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';

const mockParentCategories = [
  { id: 1, name: 'Mens' },
  { id: 2, name: 'Womens' },
];

export default function AddSubCategory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentCategory: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic would go here
    console.log('Saving sub-category:', formData);
    navigate('/categories/sub/manage');
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Add Sub Category</h1>
          <p className="text-gray-600 mt-1">Create a new sub category for your products</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter sub category name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Main Category *</label>
              <select
                name="maincat_id"
                value={formData.maincat_id}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value=""> </option>
                {mockParentCategories.map(category => (
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
              placeholder="Enter sub category description"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="btn-primary px-6 py-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setFormData({ name: '', description: '', parentCategory: '' })}
              className="btn-secondary px-6 py-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}