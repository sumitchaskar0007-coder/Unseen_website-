import React from 'react';
import { FaWhatsapp, FaLinkedin, FaTwitter, FaFacebook, FaLink } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="flex items-center space-x-3 my-6">
      <span className="text-gray-600 text-sm">Share:</span>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-green-600 transition text-xl"
      >
        <FaWhatsapp />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-800 transition text-xl"
      >
        <FaLinkedin />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-500 transition text-xl"
      >
        <FaTwitter />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 transition text-xl"
      >
        <FaFacebook />
      </a>
      <button
        onClick={copyToClipboard}
        className="text-gray-500 hover:text-gray-600 transition text-xl"
      >
        <FaLink />
      </button>
    </div>
  );
};

export default ShareButtons;