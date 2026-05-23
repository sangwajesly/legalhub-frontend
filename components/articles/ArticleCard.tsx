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
    <Card className="hover:shadow-md transition-all duration-350 border-[#E5E2DC] dark:border-stone-800 overflow-hidden flex flex-col h-full group bg-[#FDFCF9] dark:bg-stone-900/20 rounded-2xl hover:border-[#B89868]">
      {/* Image Placeholder */}
      <div className="h-44 bg-gradient-to-br from-[#FAF9F5] to-[#E5E2DC] dark:from-stone-900 dark:to-stone-950/40 relative overflow-hidden border-b border-[#E5E2DC] dark:border-stone-850">
        <div className="absolute inset-0 flex items-center justify-center text-stone-300 dark:text-stone-800 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3">
          <Scale size={70} className="text-[#B89868]/20" />
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#FDFCF9] dark:bg-stone-900 text-[#B89868] text-[10px] font-semibold uppercase tracking-wider rounded-lg shadow-sm border border-[#E5E2DC] dark:border-stone-800">
            {article.category}
          </span>
        </div>
      </div>

      <CardHeader className="p-6 pb-2">
        <Link href={`/articles/${article.id}`} className="block transition-colors">
          <h3 className="text-lg font-serif font-bold text-[#121315] dark:text-[#FAF9F5] line-clamp-2 mb-3 group-hover:text-[#B89868] dark:group-hover:text-[#B89868] transition-colors">
            {article.title}
          </h3>
        </Link>
        <div className="flex items-center gap-4 text-[10px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-[#B89868]" />
            <span>{article.author.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-[#B89868]" />
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-2 flex-1">
        <p className="text-stone-600 dark:text-stone-350 text-sm line-clamp-3 leading-relaxed font-normal">
          {article.content}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-4 mt-auto flex items-center justify-between border-t border-[#E5E2DC] dark:border-stone-850 bg-[#FAF9F5]/40 dark:bg-stone-950/20">
        <div className="flex items-center gap-4 text-stone-400 dark:text-stone-500 text-xs font-semibold">
          <div className="flex items-center gap-1.5 hover:text-[#B89868] transition-colors cursor-pointer">
            <ThumbsUp size={14} className="text-[#B89868]" />
            <span className="tabular-nums">{article.likes}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-[#B89868] transition-colors cursor-pointer">
            <MessageSquare size={14} className="text-[#B89868]" />
            <span className="tabular-nums">{article.commentCount}</span>
          </div>
        </div>

        <Link href={`/articles/${article.id}`} className="inline-flex items-center text-[#B89868] dark:text-[#B89868]/90 text-xs font-bold uppercase tracking-wider hover:translate-x-1 transition-transform">
          Read Full Article <ArrowRight size={14} className="ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
