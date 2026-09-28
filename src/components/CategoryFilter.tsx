import React from 'react';
import { MobileCategorySelect } from './MobileCategorySelect';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <>
      <MobileCategorySelect
        label="Category"
        options={['', ...categories]}
        value={selectedCategory}
        onChange={onSelectCategory}
        getOptionLabel={(category) => category ? category.replace('-', ' ').toUpperCase() : 'All'}
      />
      <div className="category-strip mb-6" role="group" aria-label="Filter by category">
      <button
        type="button"
        aria-pressed={selectedCategory === ''}
        onClick={() => onSelectCategory('')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === ''
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          type="button"
          aria-pressed={selectedCategory === category}
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category.replace('-', ' ').toUpperCase()}
        </button>
      ))}
      </div>
    </>
  );
};

export default CategoryFilter;
