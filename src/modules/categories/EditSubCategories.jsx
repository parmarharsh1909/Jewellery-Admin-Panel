import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, ArrowLeft, Edit2, FileText, ToggleLeft } from 'lucide-react';

const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  status: z.enum(['active', 'inactive']),
});

export default function EditSubCategories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    const allCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    const found = allCategories.find(cat => cat.id === Number(id));
    if (found) {
      setCategory(found);
      reset({
        name: found.name,
        description: found.description,
        status: found.status,
      });
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    const allCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    const updatedCategories = allCategories.map(cat =>
      cat.id === Number(id)
        ? { ...cat, ...data, updatedAt: new Date().toISOString() }
        : cat
    );
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    navigate('/categories/sub/manage');
  };

  if (!category) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Sub category not found</p>
          <button
            onClick={() => navigate('/categories/sub/manage')}
            className="mt-4 btn-primary"
          >
            Back to Manage Sub Categories
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
          onClick={() => navigate('/categories/sub/manage')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Manage Sub Categories</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Edit2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Sub Category</h1>
            <p className="text-gray-600 mt-1">Update sub category information</p>
          </div>
        </div>
      </div>

      {/* Edit Form Card */}
      <div className="card max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Fields */}
          <div className="space-y-5">
            {/* Category Name */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-200">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                Category Name *
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 font-medium"
                placeholder="Enter category name"
              />
              {errors.name && (
                <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-200">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                Description *
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900"
                placeholder="Enter detailed description"
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
              {errors.status && (
                <div className="mt-2 flex items-center text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                  {errors.status.message}
                </div>
              )}
            </div>

            {/* Gender Display (Read-only) */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
              <label className="text-sm font-semibold text-purple-900 mb-2 block">
                Gender Category
              </label>
              <div className="text-lg font-bold text-purple-700 capitalize">{category.gender}</div>
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
              onClick={() => navigate('/categories/sub/manage')}
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