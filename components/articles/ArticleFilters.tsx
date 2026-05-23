'use client';

import React, { useState } from 'react';
import { ArticleFilter } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArticleFilterProps {
    onFilterChange: (filters: ArticleFilter) => void;
    isLoading: boolean;
}

const ArticleFilters: React.FC<ArticleFilterProps> = ({ onFilterChange, isLoading }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<ArticleFilter>({});

    const categories = ['Constitutional Law', 'Criminal Law', 'Civil Rights', 'Corporate Law', 'Family Law'];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onFilterChange({ ...filters, search: searchQuery });
    };

    const handleFilterChange = (key: keyof ArticleFilter, value: any) => {
        const newFilters = { ...filters };
        if (value === undefined) {
            delete newFilters[key];
        } else {
            newFilters[key] = value;
        }

        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0 space-y-6">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={isLoading}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FDFCF9] dark:bg-stone-900/30 border border-[#E5E2DC] dark:border-stone-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] transition-all disabled:opacity-50 text-[#121315] dark:text-[#FAF9F5] placeholder-stone-400 dark:placeholder-stone-500 text-sm font-medium"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 dark:text-stone-500 h-4 w-4" />
                </form>

                {/* Categories */}
                <div>
                    <h3 className="text-xs font-semibold text-stone-450 dark:text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Filter className="h-3.5 w-3.5 text-[#B89868]" /> Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => handleFilterChange('category', undefined)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${!filters.category
                                ? 'bg-[#1C1B19] dark:bg-[#FAF9F5] text-white dark:text-[#121315] shadow-sm'
                                : 'bg-[#FAF9F5] dark:bg-stone-900/40 text-stone-600 dark:text-stone-300 hover:bg-[#E5E2DC] dark:hover:bg-stone-850 border border-[#E5E2DC] dark:border-stone-850'
                                }`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                type="button"
                                key={category}
                                onClick={() => handleFilterChange('category', category)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${filters.category === category
                                    ? 'bg-[#1C1B19] dark:bg-[#FAF9F5] text-white dark:text-[#121315] shadow-sm'
                                    : 'bg-[#FAF9F5] dark:bg-stone-900/40 text-stone-600 dark:text-stone-300 hover:bg-[#E5E2DC] dark:hover:bg-stone-850 border border-[#E5E2DC] dark:border-stone-850'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reset Filters */}
                {
                    (filters.category || searchQuery) && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setFilters({});
                                setSearchQuery('');
                                onFilterChange({});
                            }}
                            className="text-stone-550 dark:text-stone-400 hover:text-red-600 dark:hover:text-red-400 self-start p-0 h-auto font-semibold"
                        >
                            <X className="h-3.5 w-3.5 mr-1" /> Clear Filters
                        </Button>
                    )
                }
            </CardContent>
        </Card>
    );
};

export default ArticleFilters;
