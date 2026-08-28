import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaPlus, FaEdit, FaTrash, FaTimes, 
  FaSave, FaUpload, FaChartLine, FaImages, 
  FaBriefcase, FaBlog, FaSignOutAlt, FaUser,
  FaBars, FaProjectDiagram
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { getApiAssetUrl, projectAPI } from '../../api';

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link?: string;
  technologies: string[];
  featured: boolean;
  createdAt: string;
}

const categories = [
  'website',
  'documentary films',
  'social media',
  'seo',
  'podcast & jingles'
];

const ProjectAdmin = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    link: '',
    technologies: '',
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [adminEmail, setAdminEmail] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    const email = localStorage.getItem('adminEmail');
    if (email) {
      setAdminEmail(email);
    }
    
    fetchProjects();
  }, [navigate, selectedCategory]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = selectedCategory ? { category: selectedCategory } : undefined;
      const response = await projectAPI.getAll(params);
      setProjects(response.data.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      category: categories[0],
      link: '',
      technologies: '',
      featured: false,
    });
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      link: project.link || '',
      technologies: project.technologies.join(', '),
      featured: project.featured,
    });
    setImagePreview(project.image ? getApiAssetUrl(project.image) : '');
    setImageFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      link: '',
      technologies: '',
      featured: false,
    });
    setImageFile(null);
    setImagePreview('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('technologies', JSON.stringify(
        formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
      ));
      formDataToSend.append('featured', String(formData.featured));
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      if (editingProject) {
        // Update existing project
        await projectAPI.update(editingProject._id, formDataToSend);
        toast.success('Project updated successfully!');
      } else {
        // Create new project
        await projectAPI.create(formDataToSend);
        toast.success('Project created successfully!');
      }

      closeModal();
      fetchProjects();
    } catch (error: any) {
      console.error('Error saving project:', error);
      toast.error(error.response?.data?.message || 'Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await projectAPI.delete(id);
      toast.success('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const stats = [
    { title: 'Total Projects', icon: FaProjectDiagram, color: 'bg-indigo-500', count: projects.length },
    { title: 'Categories', icon: FaChartLine, color: 'bg-purple-500', count: categories.length },
  ];

  return (
    <div className="min-h-screen bg-gray-100" style={{ color: '#111827' }}>
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden mr-4 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
              <Link to="/admin/dashboard" className="text-xl font-bold text-gray-800 hover:text-gray-900">
                Admin Dashboard
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                  <FaUser className="text-white text-sm" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {adminEmail || 'Administrator'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition border border-red-200"
              >
                <FaSignOutAlt size={16} />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white shadow-lg min-h-screen border-r border-gray-200">
          <div className="p-6">
            <div className="space-y-2">
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition font-medium"
              >
                <FaChartLine />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/admin/gallery"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition font-medium"
              >
                <FaImages />
                <span>Gallery</span>
              </Link>
              <Link
                to="/admin/careers"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition font-medium"
              >
                <FaBriefcase />
                <span>Careers</span>
              </Link>
              <Link
                to="/admin/blogs"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition font-medium"
              >
                <FaBlog />
                <span>Blogs</span>
              </Link>
              <Link
                to="/admin/projects"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 bg-indigo-50 rounded-lg font-medium"
                style={{ color: '#1e40af' }}
              >
                <FaProjectDiagram className="text-indigo-600" />
                <span>Projects</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white shadow-xl z-40 lg:hidden overflow-y-auto border-r border-gray-200">
              <div className="p-6">
                <div className="space-y-2">
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition font-medium"
                  >
                    <FaChartLine />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/admin/gallery"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition font-medium"
                  >
                    <FaImages />
                    <span>Gallery</span>
                  </Link>
                  <Link
                    to="/admin/careers"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition font-medium"
                  >
                    <FaBriefcase />
                    <span>Careers</span>
                  </Link>
                  <Link
                    to="/admin/blogs"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition font-medium"
                  >
                    <FaBlog />
                    <span>Blogs</span>
                  </Link>
                  <Link
                    to="/admin/projects"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 bg-indigo-50 rounded-lg font-medium"
                  >
                    <FaProjectDiagram className="text-indigo-600" />
                    <span>Projects</span>
                  </Link>
                </div>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manage Projects</h1>
                <p className="text-gray-600">Create and manage your portfolio projects</p>
              </div>
              <button
                onClick={openCreateModal}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-lg"
              >
                <FaPlus size={16} />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stat.count}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-xl`}>
                      <stat.icon className="text-white text-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div className="bg-white rounded-2xl shadow-md p-4 mb-6 border border-gray-100">
              <div className="flex flex-wrap items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Filter by Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            {/* Projects List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
                <FaProjectDiagram className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
                <p className="text-gray-600 mb-4">Start by adding your first project</p>
                <button
                  onClick={openCreateModal}
                  className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  <FaPlus size={16} />
                  <span>Add New Project</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getApiAssetUrl(project.image)}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        {project.featured && (
                          <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                        <button
                          onClick={() => openEditModal(project)}
                          className="bg-white text-gray-800 p-2 rounded-full hover:bg-indigo-600 hover:text-white transition"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="bg-white text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white transition"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{project.title}</h3>
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter project description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Link (Optional)
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Image *
                </label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
                    <FaUpload className="text-gray-600" />
                    <span className="text-sm text-gray-700">Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {!editingProject && !imageFile && (
                  <p className="text-xs text-red-500 mt-1">Image is required for new projects</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Featured Project
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition shadow-lg"
                >
                  <FaSave size={16} />
                  <span>{editingProject ? 'Update' : 'Create'} Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAdmin;
