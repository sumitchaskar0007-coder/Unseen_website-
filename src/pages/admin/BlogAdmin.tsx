import React, { useState, useEffect } from 'react';
import { blogAPI } from '../../api';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaImage } from 'react-icons/fa';

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: string;
  createdAt: string;
}

const BlogAdmin = () => {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    content: '',
    author: 'Admin',
    tags: '',
    status: 'published',
  });
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await blogAPI.getAllAdmin();
      setItems(response.data);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('slug', formData.slug || generateSlug(formData.title));
    formDataObj.append('metaTitle', formData.metaTitle);
    formDataObj.append('metaDescription', formData.metaDescription);
    formDataObj.append('content', formData.content);
    formDataObj.append('author', formData.author);
    formDataObj.append('tags', formData.tags);
    formDataObj.append('status', formData.status);
    if (featuredImage) {
      formDataObj.append('featuredImage', featuredImage);
    }

    try {
      if (editingItem) {
        await blogAPI.update(editingItem._id, formDataObj);
        toast.success('Blog updated successfully');
      } else {
        await blogAPI.create(formDataObj);
        toast.success('Blog created successfully');
      }
      setIsModalOpen(false);
      resetForm();
      fetchItems();
    } catch (error) {
      toast.error('Failed to save blog');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.delete(id);
        toast.success('Blog deleted successfully');
        fetchItems();
      } catch (error) {
        toast.error('Failed to delete blog');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      metaTitle: '',
      metaDescription: '',
      content: '',
      author: 'Admin',
      tags: '',
      status: 'published',
    });
    setFeaturedImage(null);
    setEditingItem(null);
  };

  const openModal = (item?: BlogItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        slug: item.slug,
        metaTitle: item.title,
        metaDescription: item.title.substring(0, 160),
        content: item.content,
        author: 'Admin',
        tags: '',
        status: item.status,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <button
            onClick={() => openModal()}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition flex items-center"
          >
            <FaPlus className="mr-2" /> Write New Blog
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  {item.featuredImage && (
                    <img src={item.featuredImage} alt={item.title} className="md:w-48 h-48 object-cover" />
                  )}
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">Slug: {item.slug}</p>
                        <p className="text-gray-700 mb-4 line-clamp-2">{item.content.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {item.status}
                          </span>
                          <span className="ml-3">Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => openModal(item)}
                          className="text-blue-500 hover:text-blue-600 p-2"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500 hover:text-red-600 p-2"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{editingItem ? 'Edit' : 'Write New'} Blog</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Blog Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Slug (auto-generated)"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                  <input
                    type="text"
                    placeholder="Meta Title (SEO)"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                  <textarea
                    placeholder="Meta Description (SEO)"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={2}
                    required
                  />
                  <div className="border border-gray-300 rounded-lg p-2">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(content) => setFormData({ ...formData, content })}
                      modules={modules}
                      className="h-64 mb-12"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer">
                      <FaImage className="mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">Featured Image:</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <span className="ml-2 px-3 py-1 bg-gray-100 rounded-lg text-sm">Choose File</span>
                    </label>
                    {featuredImage && <span className="text-sm text-green-600">File selected: {featuredImage.name}</span>}
                  </div>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                  >
                    {editingItem ? 'Update' : 'Publish'} Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;