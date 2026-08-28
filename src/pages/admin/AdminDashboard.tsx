import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaImages, FaBriefcase, FaBlog, FaChartLine, FaSignOutAlt, 
  FaUser, FaBars, FaTimes, FaProjectDiagram 
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { projectAPI } from '../../api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [stats, setStats] = useState({
    gallery: 0,
    careers: 0,
    blogs: 0,
    projects: 0,
  });
  const [loading, setLoading] = useState(true);

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
    
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Fetch projects count
      const projectsResponse = await projectAPI.getAll();
      setStats(prev => ({
        ...prev,
        projects: projectsResponse.data.data?.length || 0,
      }));
      
      // You can add similar API calls for gallery, careers, and blogs
      // For now, using static numbers or you can fetch from respective APIs
      
      // Example: If you have APIs for other sections, uncomment and use them
      // const galleryResponse = await galleryAPI.getAll();
      // const careersResponse = await careerAPI.getAllAdmin();
      // const blogsResponse = await blogAPI.getAllAdmin();
      
      // For demonstration, using static numbers (you can replace with actual API calls)
      setStats(prev => ({
        ...prev,
        gallery: 24, // Replace with actual count from API
        careers: 12, // Replace with actual count from API
        blogs: 8,    // Replace with actual count from API
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default values if API fails
      setStats({
        gallery: 0,
        careers: 0,
        blogs: 0,
        projects: 0,
      });
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

  const statItems = [
    { 
      title: 'Gallery Items', 
      icon: FaImages, 
      color: 'bg-blue-500',
      hoverColor: 'hover:shadow-blue-100',
      link: '/admin/gallery', 
      description: 'Manage your gallery images', 
      count: stats.gallery 
    },
    { 
      title: 'Career Openings', 
      icon: FaBriefcase, 
      color: 'bg-green-500',
      hoverColor: 'hover:shadow-green-100',
      link: '/admin/careers', 
      description: 'Post and manage jobs', 
      count: stats.careers 
    },
    { 
      title: 'Blog Posts', 
      icon: FaBlog, 
      color: 'bg-purple-500',
      hoverColor: 'hover:shadow-purple-100',
      link: '/admin/blogs', 
      description: 'Create and edit blogs', 
      count: stats.blogs 
    },
    { 
      title: 'Projects', 
      icon: FaProjectDiagram, 
      color: 'bg-indigo-500',
      hoverColor: 'hover:shadow-indigo-100',
      link: '/admin/projects', 
      description: 'Manage portfolio projects', 
      count: stats.projects 
    },
  ];

  const quickActions = [
    { title: 'Add Gallery Image', icon: FaImages, link: '/admin/gallery', color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { title: 'Post New Job', icon: FaBriefcase, link: '/admin/careers', color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    { title: 'Write New Blog', icon: FaBlog, link: '/admin/blogs', color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
    { title: 'Add New Project', icon: FaProjectDiagram, link: '/admin/projects', color: 'text-indigo-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
  ];

  const sidebarLinks = [
    { to: '/admin/dashboard', icon: FaChartLine, label: 'Dashboard', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { to: '/admin/gallery', icon: FaImages, label: 'Gallery' },
    { to: '/admin/careers', icon: FaBriefcase, label: 'Careers' },
    { to: '/admin/blogs', icon: FaBlog, label: 'Blogs' },
    { to: '/admin/projects', icon: FaProjectDiagram, label: 'Projects' },
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
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
              <Link to="/admin/dashboard" className="text-xl font-bold text-gray-800 hover:text-gray-900 transition">
                Admin Dashboard
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                  <FaUser className="text-white text-sm" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {adminEmail || 'Administrator'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition border border-red-200 hover:border-red-300"
              >
                <FaSignOutAlt size={16} />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar for larger screens */}
        <aside className="hidden lg:block w-64 bg-white shadow-lg min-h-screen border-r border-gray-200">
          <div className="p-6">
            <div className="space-y-2">
              {sidebarLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition font-medium ${
                    link.to === '/admin/dashboard' ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <link.icon className={link.to === '/admin/dashboard' ? 'text-blue-600' : 'text-gray-500'} />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                <p className="text-xs text-gray-600 font-medium uppercase tracking-wider mb-2">Quick Stats</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-semibold text-gray-900">
                      {loading ? '...' : Object.values(stats).reduce((a, b) => a + b, 0)}
                    </span>
                  </div>
                </div>
              </div>
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
                  {sidebarLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition font-medium ${
                        link.to === '/admin/dashboard' ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                    >
                      <link.icon className={link.to === '/admin/dashboard' ? 'text-blue-600' : 'text-gray-500'} />
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {adminEmail?.split('@')[0] || 'Admin'}!
              </h2>
              <p className="text-blue-100">Here's what's happening with your website today.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statItems.map((stat, index) => (
                <Link
                  key={index}
                  to={stat.link}
                  className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group border border-gray-100 ${stat.hoverColor}`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`${stat.color} w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                        <stat.icon className="text-white text-2xl" />
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-800">
                          {loading ? '...' : stat.count}
                        </div>
                        <div className="text-sm text-gray-500">Total</div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.title}</h3>
                    <p className="text-gray-600 text-sm">{stat.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 mb-8">
              <div className="border-b border-gray-200 px-6 py-5">
                <div className="flex items-center">
                  <FaChartLine className="text-2xl text-blue-500 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Link
                      key={index}
                      to={action.link}
                      className={`${action.bgColor} p-5 rounded-xl text-center hover:shadow-md transition-all group border ${action.borderColor} hover:border-transparent`}
                    >
                      <action.icon className={`${action.color} text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                      <span className="text-gray-800 font-medium">{action.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Two Column Layout: Recent Activity & Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <div className="border-b border-gray-200 px-6 py-5">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition border border-transparent hover:border-gray-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-gray-800">Welcome to your dashboard</p>
                            <p className="text-sm text-gray-500">Start by adding content to your website</p>
                          </div>
                          <span className="text-sm text-gray-400">Just now</span>
                        </div>
                        <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition border border-transparent hover:border-gray-200">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-gray-800">Total content items: {Object.values(stats).reduce((a, b) => a + b, 0)}</p>
                            <p className="text-sm text-gray-500">Manage your content from the sidebar</p>
                          </div>
                          <span className="text-sm text-gray-400">Today</span>
                        </div>
                        <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition border border-transparent hover:border-gray-200">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-gray-800">Projects section added</p>
                            <p className="text-sm text-gray-500">You can now manage portfolio projects</p>
                          </div>
                          <span className="text-sm text-gray-400">Today</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <div className="border-b border-gray-200 px-6 py-5">
                  <h2 className="text-xl font-bold text-gray-900">💡 Pro Tips</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <h3 className="font-semibold text-gray-900 mb-1">Keep Content Fresh</h3>
                    <p className="text-sm text-gray-700">Regularly update your gallery and blog posts to keep your website engaging.</p>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <h3 className="font-semibold text-gray-900 mb-1">Showcase Your Work</h3>
                    <p className="text-sm text-gray-700">Add projects to your portfolio to demonstrate your capabilities to clients.</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <h3 className="font-semibold text-gray-900 mb-1">Career Opportunities</h3>
                    <p className="text-sm text-gray-700">Keep career postings updated to attract the right talent.</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <h3 className="font-semibold text-gray-900 mb-1">SEO Best Practices</h3>
                    <p className="text-sm text-gray-700">Use descriptive titles and alt text for images to improve search rankings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;