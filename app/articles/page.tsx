'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Article, ArticleFilter } from '@/types';
import ArticleCard from '@/components/articles/ArticleCard';
import ArticleFilters from '@/components/articles/ArticleFilters';
import { BookOpen } from 'lucide-react';
import { DUMMY_ARTICLES } from '@/lib/mock-data';

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async (filters?: ArticleFilter) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.getArticles(filters);
      if (response && response.data && response.data.length > 0) {
          setArticles(response.data);
      } else {
          console.log('Using dummy articles');
          setArticles(DUMMY_ARTICLES);
      }
    } catch (err: any) {
      console.warn('Failed to fetch articles, using dummy data', err);
      setArticles(DUMMY_ARTICLES);
      // Clear error so the UI shows the articles instead of error state
      setError(null); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleFilterChange = (filters: ArticleFilter) => {
    fetchArticles(filters);
  };

  return (
    <div className="animate-fade-in bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-600 dark:via-emerald-600 dark:to-cyan-700 text-white py-8 px-4 rounded-xl mb-8 shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
            <BookOpen className="h-6 w-6 text-blue-300 dark:text-emerald-300" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Legal Insights & Resources</h1>
          <p className="text-blue-50 text-base max-w-2xl mx-auto">
            Stay informed with the latest legal news, guides, and expert analysis.
            Empower yourself with knowledge.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <ArticleFilters onFilterChange={handleFilterChange} isLoading={isLoading} />
          </div>

          {/* Articles Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white dark:bg-slate-800/50 rounded-xl h-80 animate-pulse border border-slate-200 dark:border-slate-700">
                    <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-t-xl"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-center">
                <p className="text-red-800 dark:text-red-300 font-medium mb-2">Unable to load articles</p>
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                <button
                  onClick={() => fetchArticles()}
                  className="mt-4 text-blue-600 dark:text-teal-400 hover:underline text-sm font-medium"
                >
                  Try Again
                </button>
              </div>
            ) : articles?.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <BookOpen className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No articles found</h3>
                <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
