import { useState, useEffect, useMemo } from 'react';
import { galleryAPI } from '../api';
import { FaSearch } from 'react-icons/fa';
import { cmsService } from '../services/cmsService';
import { onlineImages } from '../data/onlineImages';

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  mediaType?: string;
  category: string;
  createdAt: string;
}

const editorialGallery: GalleryItem[] = [
  { _id: 'editorial-film-set', title: 'On the film set', description: 'Professional camera craft and production detail.', imageUrl: onlineImages.filmSet, category: 'production', mediaType: 'image', createdAt: '2026-01-01' },
  { _id: 'editorial-camera', title: 'Framing the story', description: 'A cinematographer preparing the next shot.', imageUrl: onlineImages.cameraOperator, category: 'production', mediaType: 'image', createdAt: '2026-01-02' },
  { _id: 'editorial-podcast', title: 'In the recording room', description: 'A focused space for podcasts, interviews and sound.', imageUrl: onlineImages.podcastStudio, category: 'studio', mediaType: 'image', createdAt: '2026-01-03' },
  { _id: 'editorial-team', title: 'Ideas in progress', description: 'A creative team shaping strategy together.', imageUrl: onlineImages.collaboration, category: 'people', mediaType: 'image', createdAt: '2026-01-04' },
  { _id: 'editorial-office', title: 'The creative workspace', description: 'A modern environment designed for focused work.', imageUrl: onlineImages.creativeOffice, category: 'studio', mediaType: 'image', createdAt: '2026-01-05' },
  { _id: 'editorial-development', title: 'Building digital experiences', description: 'Design and development coming together on screen.', imageUrl: onlineImages.developerWorkspace, category: 'digital', mediaType: 'image', createdAt: '2026-01-06' },
  { _id: 'editorial-analytics', title: 'Reading the signals', description: 'Performance data translated into clear decisions.', imageUrl: onlineImages.analyticsDashboard, category: 'strategy', mediaType: 'image', createdAt: '2026-01-07' },
  { _id: 'editorial-hospitality', title: 'Hospitality, thoughtfully framed', description: 'Atmosphere and detail captured for a hospitality story.', imageUrl: onlineImages.hospitality, category: 'campaigns', mediaType: 'image', createdAt: '2026-01-08' },
  { _id: 'editorial-social', title: 'Social in motion', description: 'Digital channels built for attention and connection.', imageUrl: onlineImages.socialMedia, category: 'digital', mediaType: 'image', createdAt: '2026-01-09' },
];

const youtubeEmbed = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/i);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};

const instagramEmbed = (url: string) => {
  const match = url.match(/instagram\.com\/(p|reel|reels)\/([^?/#]+)/i);
  return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed` : url;
};

const GalleryMedia = ({ item, modal = false }: { item: GalleryItem; modal?: boolean }) => {
  const className = modal ? 'w-full max-h-[75vh] rounded-lg bg-black object-contain' : 'w-full h-64 object-cover transition group-hover:scale-110';
  if (item.mediaType === 'youtube') {
    return <iframe src={youtubeEmbed(item.videoUrl || '')} title={item.title} className={className} allowFullScreen loading="lazy" />;
  }
  if (item.mediaType === 'instagram') {
    return <iframe src={instagramEmbed(item.videoUrl || '')} title={item.title} className={className} allowFullScreen loading="lazy" />;
  }
  if (item.mediaType === 'video') {
    return <video src={item.videoUrl} className={className} controls={modal} muted={!modal} preload="metadata" />;
  }
  return <img src={item.imageUrl} alt={item.title} className={className} />;
};

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['all', ...Array.from(new Set(items.map((item) => item.category || 'general')))];
  const filteredItems = useMemo(() => items.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchTerm.toLowerCase();
    const matchesSearch = !query || item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  }), [items, selectedCategory, searchTerm]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const mediaItems: GalleryItem[] = cmsService.published('media').map((item) => ({
      _id: item.id,
      title: String(item.name || 'Studio image').replace(/\.[^.]+$/, ''),
      description: String(item.description || 'A moment from Unseen Studios.'),
      imageUrl: String(item.image || ''),
      videoUrl: String(item.videoUrl || ''),
      mediaType: String(item.mediaType || 'image'),
      category: String(item.category || 'general').toLowerCase(),
      createdAt: new Date().toISOString(),
    }));
    const projectImages: GalleryItem[] = cmsService.published('projects').flatMap((project) => {
      const images = Array.isArray(project.gallery) ? project.gallery : [];
      return images.map((image, index) => ({
        _id: `${project.id}-gallery-${index}`,
        title: String(project.name || 'Project gallery'),
        description: String(project.shortDescription || project.description || 'Project image'),
        imageUrl: image,
        mediaType: 'image',
        category: String(project.category || 'projects').toLowerCase(),
        createdAt: new Date().toISOString(),
      }));
    });
    const localItems = [...mediaItems, ...projectImages];
    try {
      const response = await galleryAPI.getAll();
      const apiItems: GalleryItem[] = response.data || [];
      const combined = [...localItems, ...apiItems.filter((item) => !localItems.some((local) => local._id === item._id)), ...editorialGallery];
      setItems(combined);
    } catch (error) {
      setItems([...localItems, ...editorialGallery]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inner-editorial-heading mb-12" data-reveal>
          <p className="inner-editorial-kicker">Behind the work</p>
          <h2>Moments from<br /><strong>inside the studio.</strong></h2>
          <p>Production, collaboration and the details that shape every Unseen Studios project.</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search portfolio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No media found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer transform transition hover:scale-105"
                onClick={() => setSelectedImage(item)}
              >
                <GalleryMedia item={item} />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm">{item.description.substring(0, 100)}...</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-white bg-opacity-30 rounded-full text-xs capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
              >
                ×
              </button>
              <GalleryMedia item={selectedImage} modal />
              <div className="bg-white p-4 rounded-b-lg mt-2">
                <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600">{selectedImage.description}</p>
                <p className="text-sm text-gray-400 mt-2 capitalize">Category: {selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
