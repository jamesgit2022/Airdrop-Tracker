import React from 'react';
import { Search, SortAsc, Filter } from 'lucide-react';
import { SortOption } from '../types/Task';

interface SearchAndSortProps {
  searchQuery: string;
  sortOption: SortOption;
  onSearchChange: (query: string) => void;
  onSortChange: (option: SortOption) => void;
}

export const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchQuery,
  sortOption,
  onSearchChange,
  onSortChange
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks by title, link, or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="none">No Sorting</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="completed">Completed First</option>
            <option value="uncompleted">Uncompleted First</option>
          </select>
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Searching for: "</span>
          <span className="font-medium">{searchQuery}</span>
          <span>"</span>
        </div>
      )}
    </div>
  );
};