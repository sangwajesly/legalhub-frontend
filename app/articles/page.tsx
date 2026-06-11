'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/lib/store/auth-store';
import { Article, ArticleFilter } from '@/types';
import ArticleCard from '@/components/articles/ArticleCard';
import ArticleFilters from '@/components/articles/ArticleFilters';
import { BookOpen, Plus, X, PenTool, Globe, EyeOff } from 'lucide-react';
import { DUMMY_ARTICLES } from '@/lib/mock-data';
import toast from 'react-hot-toast';

const ArticlesPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Composer Form State
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Constitutional Law');
  const [tagsInput, setTagsInput] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const author = {
          id: user?.id || '',
          name: user?.name || 'Advocate',
          isLawyer: user?.role === 'lawyer',
          avatar: user?.avatar
      };

      await apiClient.createArticle({
        title,
        content,
        category,
        tags,
        author,
        commentCount: 0,
        views: 0,
        published: isPublished
      });

      toast.success(isPublished ? 'Guide published successfully!' : 'Draft saved successfully!');
      setIsComposerOpen(false);
      
      // Reset form
      setTitle('');
      setContent('');
      setCategory('Constitutional Law');
      setTagsInput('');
      setIsPublished(true);
      
      // Refresh articles feed
      fetchArticles();
    } catch (err) {
      console.error('Failed to create article:', err);
      toast.error('Failed to publish guide.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in bg-[#FAF9F5] dark:bg-[#121315]">
      {/* Header */}
      <div className="relative overflow-hidden bg-[#121315] border border-[#E5E2DC]/10 dark:border-stone-850 text-white py-10 px-4 rounded-2xl mb-8 shadow-sm">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center p-3 border border-[#B89868]/30 rounded-xl mb-4 bg-stone-900/60 shadow-sm">
            <BookOpen className="h-6 w-6 text-[#B89868]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 tracking-tight text-[#FAF9F5]">Help Guides & Resources</h1>
          <p className="text-stone-300 text-base max-w-2xl mx-auto font-normal mb-6">
            Empower yourself with clear, jargon-free explanations of your rights, guidelines, and legal queries.
          </p>
          {isAuthenticated && (user?.role === 'lawyer' || user?.role === 'ngo' || user?.role === 'admin') && (
            <button
              onClick={() => setIsComposerOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#B89868] hover:bg-[#A38253] text-white px-6 h-11 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98] duration-350"
            >
              <Plus className="h-4.5 w-4.5" /> Publish Legal Guide
            </button>
          )}
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

      {/* Article Composer Modal */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white/90 dark:bg-stone-900/95 border border-[#E5E2DC] dark:border-stone-850 shadow-2xl rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto animate-scale-up backdrop-blur-xl">
            {/* Close button */}
            <button
              onClick={() => setIsComposerOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E5E2DC] dark:border-stone-850">
              <div className="p-2.5 bg-[#B89868]/10 text-[#B89868] rounded-xl">
                <PenTool className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5]">Compose Legal Guide</h2>
                <p className="text-xs text-stone-400 dark:text-stone-500 font-medium">Share legal knowledge and insights with the community</p>
              </div>
            </div>

            <form onSubmit={handlePublish} className="space-y-6 text-left">
              {/* Title input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Understanding Customary Land Tenure"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F5]/50 dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] transition-all font-serif font-bold text-lg text-[#121315] dark:text-[#FAF9F5]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF9F5]/50 dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] transition-all text-sm font-semibold text-[#121315] dark:text-[#FAF9F5]"
                  >
                    <option value="Constitutional Law">Constitutional Law</option>
                    <option value="Criminal Law">Criminal Law</option>
                    <option value="Civil Rights">Civil Rights</option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Family Law">Family Law</option>
                  </select>
                </div>

                {/* Tags input */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Tags (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. property, boundary, land rights"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF9F5]/50 dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] transition-all text-sm font-semibold text-[#121315] dark:text-[#FAF9F5]"
                  />
                </div>
              </div>

              {/* Content textarea */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Content</label>
                <textarea
                  rows={8}
                  placeholder="Draft your clear, informative guide here. Keep it structured and easy to read."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F5]/50 dark:bg-stone-950/40 border border-[#E5E2DC] dark:border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B89868]/20 focus:border-[#B89868] transition-all text-sm leading-relaxed text-[#121315] dark:text-[#FAF9F5]"
                  required
                />
              </div>

              {/* Toggles & Submit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E5E2DC] dark:border-stone-850">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPublished(!isPublished)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isPublished 
                        ? 'bg-[#B89868]/15 border-[#B89868]/30 text-[#B89868]' 
                        : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400'
                    }`}
                  >
                    {isPublished ? (
                      <>
                        <Globe className="h-3.5 w-3.5" /> Publicly Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3.5 w-3.5" /> Save Draft Only
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 max-w-[200px]">
                    {isPublished 
                      ? 'This guide will be visible immediately to all platform users.' 
                      : 'Save privately to your profile drafts.'}
                  </p>
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(false)}
                    className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-600 dark:text-stone-300 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-[#FAF9F5] dark:hover:bg-[#E5E2DC] text-[#FAF9F5] dark:text-[#121315] px-6 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-3.5 h-3.5 border-2 border-white dark:border-stone-900 border-t-transparent rounded-full"></div>
                        Processing...
                      </>
                    ) : isPublished ? (
                      'Publish Guide'
                    ) : (
                      'Save Draft'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
