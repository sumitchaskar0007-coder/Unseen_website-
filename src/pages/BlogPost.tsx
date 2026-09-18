import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../api';
import ReadingProgressBar from '../components/ReadingProgressBar';
import ShareButtons from '../components/ShareButtons';
import { FaUser, FaCalendar, FaClock, FaEye, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { cmsService } from '../services/cmsService';
import { onlineImages } from '../data/onlineImages';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  author: string;
  featuredImage: string;
  readingTime: number;
  tags: string[];
  views: number;
  createdAt: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      await cmsService.sync('blogs').catch(() => [])
      const local = cmsService.published('blogs').find((item) => String(item.slug || item.id) === slug);
      if (local) {
        const localBlog: BlogPost = {
          _id: local.id,
          title: String(local.name || 'Untitled article'),
          slug: String(local.slug || local.id),
          metaTitle: String(local.name || 'Unseen Studios'),
          metaDescription: String(local.shortDescription || ''),
          content: String(local.description || local.shortDescription || ''),
          author: String(local.author || 'Unseen Studios'),
          featuredImage: String(local.image || ''),
          readingTime: Math.max(1, Math.ceil(String(local.description || '').split(/\s+/).length / 200)),
          tags: String(local.tags || '').split(',').map((tag) => tag.trim()).filter(Boolean),
          views: 0,
          createdAt: String(local.publishDate || new Date().toISOString()),
        };
        setBlog(localBlog);
        document.title = localBlog.metaTitle;
        return;
      }
      const response = await blogAPI.getBySlug(slug!);
      setBlog(response.data);
      document.title = response.data.metaTitle;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', response.data.metaDescription);
      }
    } catch (error) {
      const fallback = {
        'brand-distinction': { title: 'Why distinct brands outperform loud ones', content: '<p>A useful brand is not the one that says the most. It is the one people recognise, understand and remember. Distinction comes from a clear point of view repeated with care across every experience.</p><p>Start with the truth only your brand can own. Express it consistently, remove what does not help, and let recognition compound over time.</p>', featuredImage: onlineImages.businessPlanning, createdAt: '2026-08-28' },
        'films-people-watch': { title: 'Making a brand film people choose to watch', content: '<p>The best brand films earn attention through a human idea, a confident point of view and disciplined craft. They respect the audience before they ask for anything in return.</p><p>Begin with tension, build around a real emotion and make every frame serve the story.</p>', featuredImage: onlineImages.cameraOperator, createdAt: '2026-08-12' },
        'websites-for-momentum': { title: 'Designing websites for momentum, not decoration', content: '<p>A modern website should make the next decision feel obvious—for the visitor and for the business. Strong hierarchy, useful content and fast feedback matter more than ornamental complexity.</p><p>Design the journey around intent, then make each interaction remove friction.</p>', featuredImage: onlineImages.developerWorkspace, createdAt: '2026-07-24' },
      }[slug || '']
      if (fallback) {
        setBlog({ _id: slug!, slug: slug!, metaTitle: fallback.title, metaDescription: fallback.title, author: 'Unseen Studios', readingTime: 4, tags: ['Perspective'], views: 0, ...fallback })
        document.title = `${fallback.title} | Unseen Studios`
      } else toast.error('Blog post not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link to="/blog" className="text-blue-500 hover:text-blue-600">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReadingProgressBar />
      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        {blog.featuredImage && (
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 font-serif max-w-3xl mx-auto">
                  {blog.title}
                </h1>
              </div>
            </div>
          </div>
        )}

        {/* Blog Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Metadata */}
          <div className="flex flex-wrap justify-between items-center mb-8 pb-8 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <FaUser className="mr-1" /> {blog.author}
              </span>
              <span className="flex items-center">
                <FaCalendar className="mr-1" /> {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center">
                <FaClock className="mr-1" /> {blog.readingTime} min read
              </span>
              <span className="flex items-center">
                <FaEye className="mr-1" /> {blog.views} views
              </span>
            </div>
          </div>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content with Drop Cap */}
          <div 
            className="blog-content drop-cap"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Share Buttons */}
          <div className="my-12 pt-8 border-t border-gray-200">
            <ShareButtons title={blog.title} url={window.location.href} />
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center my-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Have an idea worth building?</h3>
            <p className="text-gray-600 mb-6">Bring us the challenge. We’ll help shape the strategy, story and experience around it.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Start a conversation
              </Link>
              <Link
                to="/services"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
              >
                Explore our services
              </Link>
              <Link
                to="/portfolio"
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
              >
                View our work
              </Link>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="text-center mt-8">
            <Link to="/blog" className="inline-flex items-center text-blue-500 hover:text-blue-600">
              <FaArrowLeft className="mr-2" /> Back to all blogs
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
