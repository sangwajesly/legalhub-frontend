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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin inline-flex items-center justify-center w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
        <p className="ml-4 text-secondary">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-800 max-w-md">
          <p className="mb-3">{error}</p>
          <Link href="/articles" className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 max-w-md">
          <p className="mb-3">Article not found.</p>
          <Link href="/articles" className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Link 
          href="/articles" 
          className="text-secondary hover:text-primary transition-colors mb-6 inline-flex items-center gap-2 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </Link>
        <article className="bg-white rounded-xl border border-border p-8">
          <h1 className="text-4xl font-semibold text-primary mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center text-sm text-muted mb-8 pb-6 border-b border-border">
            <span>By {article.author.name}</span>
            <span className="mx-2">•</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{article.likes} Likes</span>
          </div>
          <div className="prose prose-lg max-w-none text-secondary leading-relaxed">
            <div className="whitespace-pre-wrap">{article.content}</div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
