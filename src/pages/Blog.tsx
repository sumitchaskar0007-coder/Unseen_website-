import { useState, useEffect } from 'react';
import { blogAPI } from '../api';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaClock, FaTag } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  author: string;
  readingTime: number;
  tags: string[];
  createdAt: string;
  views: number;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll();
      setBlogs(response.data);
    } catch (error) {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inner-editorial-heading mb-12" data-reveal>
          <p className="inner-editorial-kicker">Ideas and perspective</p>
          <h2>Thinking behind<br /><strong>the making.</strong></h2>
          <p>Creative insight, studio stories and practical ideas for modern brands.</p>
        </div>

        {/* Blog List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts available yet</p>
          </div>
        ) : (
          <div className="space-y-12">
            {blogs.map((blog) => (
              <article key={blog._id} className="border-b border-gray-200 pb-12 last:border-0">
                {blog.featuredImage && (
                  <Link to={`/blog/${blog.slug}`}>
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg mb-6 hover:opacity-90 transition"
                    />
                  </Link>
                )}
                
                <div className="mb-4">
                  <Link to={`/blog/${blog.slug}`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-blue-600 transition font-serif mb-3">
                      {blog.title}
                    </h2>
                  </Link>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <FaUser className="mr-1" /> {blog.author}
                    </span>
                    <span className="flex items-center">
                      <FaCalendar className="mr-1" /> {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" /> {blog.readingTime} min read
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, idx) => (
                      <span key={idx} className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        <FaTag className="mr-1 text-xs" /> {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div 
                    className="prose max-w-none text-gray-700 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 300) + '...' }}
                  />
                  
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-block text-blue-500 hover:text-blue-600 font-semibold"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
