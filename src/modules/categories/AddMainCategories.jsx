import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';

export default function AddMainCategory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIconChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        icon: e.target.files[0]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic would go here
    console.log('Saving main category:', formData);
    navigate('/categories/main/manage');
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
          <h1 className="text-3xl font-bold text-gray-900">Add Main Category</h1>
          <p className="text-gray-600 mt-1">Create a new main category for your products</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="card max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input-field"
              placeholder="Enter category description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Icon/Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label className="btn-primary cursor-pointer inline-block">
                  <span>Choose File</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    accept="image/*"
                    onChange={handleIconChange}
                  />
                </label>
                <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 2MB</p>
              </div>
              {formData.icon && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {formData.icon.name}
                </p>
              )}
            </div>
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
              onClick={() => setFormData({ name: '', description: '', icon: null })}
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