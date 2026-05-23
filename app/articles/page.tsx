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
    <div className="animate-fade-in bg-[#FAF9F5] dark:bg-[#121315]">
      {/* Header */}
      <div className="relative overflow-hidden bg-[#121315] border border-[#E5E2DC]/10 dark:border-stone-850 text-white py-10 px-4 rounded-2xl mb-8 shadow-sm">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 border border-[#B89868]/30 rounded-xl mb-4 bg-stone-900/60 shadow-sm">
            <BookOpen className="h-6 w-6 text-[#B89868]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 tracking-tight text-[#FAF9F5]">Help Guides & Resources</h1>
          <p className="text-stone-300 text-base max-w-2xl mx-auto font-normal">
            Empower yourself with clear, jargon-free explanations of your rights, guidelines, and legal queries.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
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
                  <div key={i} className="bg-[#FDFCF9] dark:bg-stone-900/20 rounded-2xl h-80 animate-pulse border border-[#E5E2DC] dark:border-stone-850">
                    <div className="h-48 bg-stone-200 dark:bg-stone-800 rounded-t-2xl"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4"></div>
                      <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
                      <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-8 bg-[#FDFCF9] dark:bg-stone-900/20 border border-red-200 dark:border-red-900/30 rounded-2xl text-center">
                <p className="text-red-800 dark:text-red-300 font-serif font-bold mb-2">Unable to load articles</p>
                <p className="text-stone-555 dark:text-stone-400 text-sm">{error}</p>
                <button
                  onClick={() => fetchArticles()}
                  className="mt-4 text-[#B89868] hover:underline text-sm font-semibold"
                >
                  Try Again
                </button>
              </div>
            ) : articles?.length === 0 ? (
              <div className="text-center py-16 bg-[#FDFCF9] dark:bg-stone-900/20 rounded-2xl border border-dashed border-[#E5E2DC] dark:border-stone-800 shadow-sm">
                <BookOpen className="h-12 w-12 text-[#B89868] mx-auto mb-4" />
                <h3 className="text-xl font-bold font-serif text-[#121315] dark:text-[#FAF9F5] mb-2">No articles found</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm font-normal">Try adjusting your search query or categories.</p>
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
