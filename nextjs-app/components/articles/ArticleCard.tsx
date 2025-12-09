'use client';

import React from 'react';
import { Article } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, ThumbsUp, MessageSquare } from 'lucide-react';

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
        <Card className="hover:shadow-md transition-all duration-300 border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-full group bg-white dark:bg-slate-800/50">
            {/* Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600">
                    <span className="text-4xl">⚖️</span>
                </div>
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-blue-700 dark:text-teal-400 text-xs font-bold rounded-full shadow-sm">
                        {article.category}
                    </span>
                </div>
            </div>

            <CardHeader className="p-6 pb-2">
                <Link href={`/articles/${article.id}`} className="block group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 mb-2">
                        {article.title}
                    </h3>
                </Link>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{article.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 pt-2 flex-1">
                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 leading-relaxed">
                    {article.content}
                </p>
            </CardContent>

            <CardFooter className="p-6 pt-0 border-t border-slate-50 dark:border-slate-700 mt-auto bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm">
                    <div className="flex items-center gap-1.5">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{article.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MessageSquare className="h-4 w-4" />
                        <span>{article.commentCount}</span>
                    </div>
                </div>

                <Link href={`/articles/${article.id}`}>
                    <Button variant="ghost" size="sm" className="text-blue-600 dark:text-teal-400 hover:text-blue-700 dark:hover:text-teal-300 hover:bg-blue-50 dark:hover:bg-teal-900/30 p-0 h-auto font-medium">
                        Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ArticleCard;
