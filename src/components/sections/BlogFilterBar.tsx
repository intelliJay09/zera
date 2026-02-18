'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getAllUniqueCategories, getCategoryCount } from '@/data/blog-posts';

interface BlogFilterBarProps {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onClearFilters: () => void;
  totalPosts: number;
  filteredCount: number;
}

export default function BlogFilterBar({
  activeCategory,
  onCategoryChange,
  onClearFilters,
  totalPosts,
  filteredCount
}: BlogFilterBarProps) {
  const categories = getAllUniqueCategories();

  const hasActiveFilters = activeCategory !== null;

  return (
    <motion.div
      className="mb-12 space-y-8"
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6 }}
    >
      {/* Results Count */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-near-black/60">
          Showing <span className="text-copper-500 font-semibold">{filteredCount}</span> of {totalPosts} Intelligence Briefings
        </p>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="group inline-flex items-center gap-2 text-xs font-medium tracking-brand-label uppercase text-near-black/60 hover:text-copper-500 border border-near-black/20 hover:border-copper-500/60 px-4 py-2 transition-all duration-300"
          >
            <X className="w-3.5 h-3.5" />
            Clear All Filters
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div className="space-y-4">
        <h3 className="text-xs font-medium tracking-brand-label uppercase text-copper-500">
          Filter by Category
        </h3>

        {/* Dropdown Select for all screen sizes */}
        <div className="max-w-md">
          <select
            value={activeCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value || null)}
            className="w-full appearance-none bg-white border border-copper-500/20 text-near-black px-4 py-3 pr-10 min-h-[44px] text-sm font-medium focus:outline-none focus:border-copper-500 focus:ring-2 focus:ring-copper-500/20 transition-colors cursor-pointer rounded-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23B87333' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => {
              const count = getCategoryCount(category);
              return (
                <option key={category} value={category}>
                  {category} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <motion.div
          className="pt-4 border-t border-copper-500/20"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="text-xs text-near-black/40 mb-3">Active Filter:</p>
          <div className="flex flex-wrap gap-2">
            {activeCategory && (
              <div className="inline-flex items-center gap-2 bg-copper-500/10 border border-copper-500/30 text-copper-600 text-xs font-medium px-3 py-1.5">
                <span className="text-near-black/40">Category:</span>
                <span>{activeCategory}</span>
                <button
                  onClick={() => onCategoryChange(null)}
                  className="ml-1 hover:text-copper-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
