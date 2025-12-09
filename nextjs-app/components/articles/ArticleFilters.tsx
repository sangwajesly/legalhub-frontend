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
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-teal-500/20 focus:border-blue-500 dark:focus:border-teal-500 transition-all disabled:opacity-50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4 w-4" />
                </form>

                {/* Categories */}
                <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Filter className="h-3 w-3" /> Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleFilterChange('category', undefined)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!filters.category
                                ? 'bg-blue-600 dark:bg-teal-600 text-white shadow-sm'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleFilterChange('category', category)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filters.category === category
                                    ? 'bg-blue-600 dark:bg-teal-600 text-white shadow-sm'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
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
                            className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 self-start p-0 h-auto"
                        >
                            <X className="h-3 w-3 mr-1" /> Clear Filters
                        </Button>
                    )
                }
            </CardContent>
        </Card>
    );
};

export default ArticleFilters;
