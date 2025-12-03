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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-200">
      <Link href={`/articles/${article.id}`} className="block">
        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition">
          {article.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.content}</p> {/* Using content as excerpt for now */}
      </Link>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>By {article.author.name}</span>
        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Legal Articles & Insights</h1>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No articles found.</p>
            <p className="text-gray-500">Check back later for new insights.</p>
          </div>
        ) : (
          <div className="space-y-6">
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
