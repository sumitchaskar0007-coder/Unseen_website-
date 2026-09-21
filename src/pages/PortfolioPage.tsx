import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaFilter } from 'react-icons/fa';
import { getApiAssetUrl, projectAPI } from '../api';
import { cmsService } from '../services/cmsService';

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
  'All',
  'website',
  'documentary films',
  'social media',
  'seo',
  'podcast & jingles'
];

const PortfolioPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  const fetchProjects = async () => {
    await cmsService.sync('projects').catch(() => [])
    const localProjects: Project[] = cmsService.published('projects').map((item) => ({
      _id: item.id,
      title: String(item.name || 'Untitled project'),
      description: String(item.shortDescription || item.description || ''),
      category: String(item.category || 'creative').toLowerCase(),
      image: String(item.image || ''),
      link: String(item.url || ''),
      technologies: String(item.services || '').split(',').map((value) => value.trim()).filter(Boolean),
      featured: Boolean(item.featured),
      createdAt: String(item.year || new Date().toISOString()),
    }));
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      const apiProjects = response.data.data || [];
      const combined = [...localProjects, ...apiProjects.filter((project: Project) => !localProjects.some((local) => local._id === project._id))];
      setProjects(combined);
      setFilteredProjects(combined);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects(localProjects);
      setFilteredProjects(localProjects);
    } finally {
      setLoading(false);
    }
  };

  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="inner-editorial-heading mb-12" data-reveal>
          <p className="inner-editorial-kicker">Selected projects</p>
          <h2>Work designed to create<br /><strong>real momentum.</strong></h2>
          <p>Explore films, platforms and campaigns made for ambitious organisations.</p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="md:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md mb-4"
          >
            <FaFilter />
            <span>Filter: {selectedCategory === 'All' ? 'All Projects' : formatCategoryName(selectedCategory)}</span>
          </button>

          <div className={`${showFilter ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
                  }`}
                >
                  {category === 'All' ? 'All Projects' : formatCategoryName(category)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={getApiAssetUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium bg-indigo-600/80 px-3 py-1 rounded-full">
                      {formatCategoryName(project.category)}
                    </span>
                  </div>
                  {project.featured && (
                    <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
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

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <Link
                      to={`/portfolio/${project._id}`}
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center space-x-1"
                    >
                      <span>View Details</span>
                      <FaExternalLinkAlt size={12} />
                    </Link>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700 text-sm"
                      >
                        Live Site →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
