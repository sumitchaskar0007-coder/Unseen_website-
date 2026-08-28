import React, { useState, useEffect } from 'react';
import { careerAPI } from '../../api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

interface CareerItem {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string;
  isActive: boolean;
  createdAt: string;
}

const CareerAdmin = () => {
  const [items, setItems] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CareerItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    salary: '',
    isActive: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await careerAPI.getAllAdmin();
      console.log('Fetched careers from admin API:', response.data);
      // Ensure requirements is always an array
      const careersWithArrayRequirements = (response.data || []).map((career: any) => ({
        ...career,
        requirements: Array.isArray(career.requirements) ? career.requirements : 
                     (career.requirements ? career.requirements.split(',').map((r: string) => r.trim()) : [])
      }));
      setItems(careersWithArrayRequirements);
    } catch (error: any) {
      console.error('Error fetching careers:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch careers');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.department || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Prepare requirements as array for backend
    const requirementsArray = formData.requirements
      .split(',')
      .map(req => req.trim())
      .filter(req => req !== '');

    // Prepare data for API
    const dataToSend = {
      title: formData.title,
      department: formData.department,
      location: formData.location,
      type: formData.type,
      description: formData.description,
      requirements: requirementsArray,
      salary: formData.salary,
      isActive: formData.isActive,
    };

    console.log('Sending data to backend:', dataToSend);

    try {
      if (editingItem) {
        await careerAPI.update(editingItem._id, dataToSend);
        toast.success('Career updated successfully');
      } else {
        await careerAPI.create(dataToSend);
        toast.success('Career created successfully');
      }
      setIsModalOpen(false);
      resetForm();
      await fetchItems(); // Refresh the list
    } catch (error: any) {
      console.error('Error saving career:', error);
      toast.error(error.response?.data?.message || error.response?.data?.error || 'Failed to save career');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this career opening?')) {
      try {
        await careerAPI.delete(id);
        toast.success('Career deleted successfully');
        await fetchItems();
      } catch (error: any) {
        console.error('Error deleting career:', error);
        toast.error(error.response?.data?.message || 'Failed to delete career');
      }
    }
  };

  const handleToggleStatus = async (item: CareerItem) => {
    try {
      // Send only the isActive status update
      const updatedData = {
        title: item.title,
        department: item.department,
        location: item.location,
        type: item.type,
        description: item.description,
        requirements: item.requirements,
        salary: item.salary,
        isActive: !item.isActive
      };
      await careerAPI.update(item._id, updatedData);
      toast.success(`Career ${!item.isActive ? 'activated' : 'deactivated'} successfully`);
      await fetchItems();
    } catch (error: any) {
      console.error('Error toggling status:', error);
      toast.error(error.response?.data?.message || 'Failed to update career status');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: '',
      salary: '',
      isActive: true,
    });
    setEditingItem(null);
  };

  const openModal = (item?: CareerItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        department: item.department,
        location: item.location,
        type: item.type,
        description: item.description,
        requirements: Array.isArray(item.requirements) ? item.requirements.join(', ') : '',
        salary: item.salary || '',
        isActive: item.isActive,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-100 text-green-800';
      case 'Part-time':
        return 'bg-blue-100 text-blue-800';
      case 'Contract':
        return 'bg-orange-100 text-orange-800';
      case 'Internship':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Career Management</h1>
            <p className="text-gray-600 mt-1">Manage job openings and career opportunities</p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center shadow-md"
          >
            <FaPlus className="mr-2" /> Add New Job
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading career opportunities...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Career Openings</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first job opening</p>
            <button
              onClick={() => openModal()}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition inline-flex items-center"
            >
              <FaPlus className="mr-2" /> Add New Job
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getJobTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {item.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">Department:</span> {item.department}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">Location:</span> {item.location}
                        </div>
                        {item.salary && (
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">Salary:</span> {item.salary}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {Array.isArray(item.requirements) && item.requirements.slice(0, 3).map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                          {Array.isArray(item.requirements) && item.requirements.length > 3 && (
                            <li className="text-gray-500">+{item.requirements.length - 3} more requirements</li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => handleToggleStatus(item)}
                        className={`p-2 rounded-lg transition ${
                          item.isActive 
                            ? 'text-yellow-600 hover:bg-yellow-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={item.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {item.isActive ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                      </button>
                      <button
                        onClick={() => openModal(item)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Add/Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem ? 'Edit Career Opening' : 'Add New Career Opening'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Senior Software Engineer"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Engineering"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., New York, NY or Remote"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Type *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salary Range (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., $50,000 - $70,000"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Description *
                    </label>
                    <textarea
                      placeholder="Describe the role, responsibilities, and what the candidate will do..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requirements * (comma-separated)
                    </label>
                    <textarea
                      placeholder="e.g., Bachelor's degree in Computer Science, 3+ years of experience, Strong communication skills"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={3}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate each requirement with a comma
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="mr-2 h-4 w-4 text-green-500 focus:ring-green-500"
                    />
                    <label htmlFor="isActive" className="text-sm text-gray-700">
                      Active (show this job opening on the careers page)
                    </label>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      {editingItem ? 'Update Career' : 'Create Career'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerAdmin;