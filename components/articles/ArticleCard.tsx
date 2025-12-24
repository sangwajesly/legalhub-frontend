'use client';

import React from 'react';
import { Article } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, User, ArrowRight, ThumbsUp, MessageSquare, Scale } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className="hover:shadow-2xl transition-all duration-500 border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-full group bg-white dark:bg-slate-900/50 rounded-[2rem]">
      {/* Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-800 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-blue-100 dark:text-slate-800 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
          <Scale size={80} />
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white dark:bg-slate-800 text-blue-600 dark:text-teal-400 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md border border-slate-100 dark:border-slate-700">
            {article.category}
          </span>
        </div>
      </div>

      <CardHeader className="p-6 pb-2">
        <Link href={`/articles/${article.id}`} className="block transition-colors">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-teal-400">
            {article.title}
          </h3>
        </Link>
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-blue-500 dark:text-teal-400" />
            <span>{article.author.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-blue-500 dark:text-teal-400" />
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-2 flex-1">
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed">
          {article.content}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-slate-50 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30">
        <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500 text-xs font-bold">
          <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-pointer">
            <ThumbsUp size={14} />
            <span className="tabular-nums">{article.likes}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-pointer">
            <MessageSquare size={14} />
            <span className="tabular-nums">{article.commentCount}</span>
          </div>
        </div>

        <Link href={`/articles/${article.id}`} className="inline-flex items-center text-blue-600 dark:text-teal-400 text-xs font-bold uppercase tracking-widest hover:translate-x-1 transition-transform">
          Read Full Article <ArrowRight size={14} className="ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
