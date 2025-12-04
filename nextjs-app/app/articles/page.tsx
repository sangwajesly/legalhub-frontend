'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client'; // Direct import of apiClient
import { Article } from '@/types';
import Link from 'next/link';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={`/articles/${article.id}`} className="block">
      <div className="bg-white rounded-xl border border-border hover:border-primary/20 p-5 sm:p-6 transition-all duration-200 hover:shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold text-primary mb-2 sm:mb-3 hover:text-primary/80 transition-colors leading-tight">
          {article.title}
        </h2>
        <p className="text-secondary mb-4 sm:mb-5 line-clamp-3 text-sm sm:text-base leading-relaxed">{article.content}</p>
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted pt-3 sm:pt-4 border-t border-border">
          <span>By {article.author.name}</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Assuming getArticles returns a PaginatedResponse, we'll take the data array
        const response = await apiClient.getArticles();
        setArticles(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch articles.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []); // Remove apiClient from dependency array as it's directly imported and stable.

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-gray-600">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-primary">Legal Articles & Insights</h1>
          <Link
            href="/articles/create"
            className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors text-sm whitespace-nowrap"
          >
            Write Article
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-base sm:text-lg text-secondary mb-2">No articles found.</p>
            <p className="text-muted text-sm">Check back later for new insights.</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
