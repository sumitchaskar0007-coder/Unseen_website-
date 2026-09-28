import { useState, useEffect, useMemo, useRef } from 'react';
import { galleryAPI } from '../api';
import { FaSearch } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
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

const youtubeEmbed = (url: string, modal = false) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/i);
  if (!match) return '';
  const videoId = match[1];
  const params = new URLSearchParams({
    autoplay: '1',
    playsinline: '1',
    rel: '0',
    mute: modal ? '0' : '1',
  });
  if (!modal) {
    params.set('controls', '0');
    params.set('loop', '1');
    params.set('playlist', videoId);
  }
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

const instagramEmbed = (url: string) => {
  const match = url.match(/instagram\.com\/(p|reel|reels)\/([^?/#]+)/i);
  return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed` : url;
};

const GalleryMedia = ({ item, modal = false }: { item: GalleryItem; modal?: boolean }) => {
  const className = modal
    ? 'h-full w-full bg-black object-contain'
    : 'h-full w-full object-cover transition duration-700 group-hover:scale-105';
  if (item.mediaType === 'youtube') {
    return <iframe
      src={youtubeEmbed(item.videoUrl || '', modal)}
      title={item.title}
      className={`${className} ${modal ? '' : 'pointer-events-none'}`}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      loading={modal ? 'eager' : 'lazy'}
    />;
  }
  if (item.mediaType === 'instagram') {
    return <iframe
      src={instagramEmbed(item.videoUrl || '')}
      title={item.title}
      className={`${className} ${modal ? '' : 'pointer-events-none'}`}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      loading={modal ? 'eager' : 'lazy'}
    />;
  }
  if (item.mediaType === 'video') {
    return <video
      src={item.videoUrl}
      className={className}
      autoPlay
      controls={modal}
      loop={!modal}
      muted={!modal}
      playsInline
      preload="metadata"
    />;
  }
  return <img src={item.imageUrl} alt={item.title} className={className} />;
};

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!selectedImage) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedImage]);

  useEffect(() => {
    if (!categoryMenuOpen) return;
    const closeMenu = (event: MouseEvent) => {
      if (!categoryMenuRef.current?.contains(event.target as Node)) setCategoryMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCategoryMenuOpen(false);
    };
    document.addEventListener('pointerdown', closeMenu);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeMenu);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [categoryMenuOpen]);

  const fetchGallery = async () => {
    await Promise.allSettled([cmsService.sync('media'), cmsService.sync('projects')]);
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

          <div className="gallery-category-dropdown" ref={categoryMenuRef}>
            <button
              type="button"
              className="gallery-category-trigger"
              aria-haspopup="listbox"
              aria-expanded={categoryMenuOpen}
              onClick={() => setCategoryMenuOpen((open) => !open)}
            >
              <span><small>Category</small>{selectedCategory === 'all' ? 'All media' : selectedCategory}</span>
              <ChevronDown className={categoryMenuOpen ? 'is-open' : ''} />
            </button>
            {categoryMenuOpen && (
              <div className="gallery-category-menu" role="listbox" aria-label="Gallery categories">
                {categories.map((category) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedCategory === category}
                    className={selectedCategory === category ? 'is-active' : ''}
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCategoryMenuOpen(false);
                    }}
                  >
                    <span>{category === 'all' ? 'All media' : category}</span>
                    <small>{items.filter((item) => category === 'all' || item.category === category).length}</small>
                  </button>
                ))}
              </div>
            )}
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
              <button
                type="button"
                key={item._id}
                aria-label={`Open ${item.title}`}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-neutral-900 text-left shadow-md transition duration-300 md:hover:-translate-y-1 md:hover:shadow-xl"
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
              </button>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[10001] flex items-center justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title}
          >
            <div className="my-auto w-[min(92vw,74vh,900px)]" onClick={(event) => event.stopPropagation()}>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-black shadow-2xl">
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-2xl text-white backdrop-blur transition hover:bg-white hover:text-black"
                  aria-label="Close media viewer"
                >
                  ×
                </button>
                <GalleryMedia item={selectedImage} modal />
              </div>
              <div className="mt-3 rounded-2xl bg-white p-5 sm:p-6">
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
