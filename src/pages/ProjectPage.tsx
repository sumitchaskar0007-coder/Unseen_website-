import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaTag, FaCalendar } from 'react-icons/fa';
import { getApiAssetUrl, projectAPI } from '../api';

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

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (projectId: string) => {
    try {
      setLoading(true);
      const response = await projectAPI.getById(projectId);
      setProject(response.data.data);
    } catch (err: any) {
      console.error('Error fetching project:', err);
      setError(err.response?.data?.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 sm:p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The project you are looking for does not exist.'}</p>
          <Link
            to="/portfolio"
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <FaArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/portfolio"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition mb-6"
        >
          <FaArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        {/* Project Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image */}
          <div className="relative h-56 sm:h-72 md:h-96 overflow-hidden">
            <img
              src={getApiAssetUrl(project.image)}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {project.featured && (
              <div className="absolute top-4 right-4 bg-yellow-500 text-white font-semibold px-4 py-2 rounded-full shadow-lg">
                Featured
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                  <FaTag className="inline mr-1" />
                  {project.category}
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                  <FaCalendar className="inline mr-1" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">{project.description}</p>
            </div>

            {/* Technologies */}
            {project.technologies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Link */}
            {project.link && (
              <div className="pt-6 border-t border-gray-200">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition shadow-lg"
                >
                  <span>View Live Project</span>
                  <FaExternalLinkAlt size={16} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Related Projects Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Projects</h2>
          <Link
            to="/portfolio"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <span>View All Projects</span>
            <FaArrowLeft className="rotate-180" size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
