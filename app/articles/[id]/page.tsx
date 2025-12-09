'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client'; // Direct import of apiClient
import { Article } from '@/types';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setError(null);
        const fetchedArticle = await apiClient.getArticleById(id as string);
        setArticle(fetchedArticle);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch article.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]); // apiClient is directly imported and stable, so remove it from dependency array.

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin inline-flex items-center justify-center w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p>{error}</p>
          <Link href="/articles" className="text-blue-600 hover:underline mt-2 block">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          <p>Article not found.</p>
          <Link href="/articles" className="text-blue-600 hover:underline mt-2 block">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 bg-white rounded-lg shadow-md p-6">
        <Link href="/articles" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Articles
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>By {article.author.name}</span>
          <span className="mx-2">•</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{article.likes} Likes</span>
        </div>
        <div className="prose prose-blue max-w-none text-gray-800 leading-relaxed">
          {/* Assuming article.content is markdown or plain text that can be rendered directly */}
          <p>{article.content}</p>
        </div>
        {/* Potentially add comments section, like button, etc. here */}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
