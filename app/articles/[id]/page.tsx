'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  ThumbsUp, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { apiClient } from '@/lib/api-client';
import { DUMMY_ARTICLES } from '@/lib/mock-data';
import { Article } from '@/types';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await apiClient.getArticleById(id as string);
        setArticle(data);
      } catch (err) {
        console.error('Failed to fetch article, checking dummy data:', err);
        const dummyArticle = DUMMY_ARTICLES.find(a => a.id === id);
        if (dummyArticle) {
            setArticle(dummyArticle);
        } else {
            // Hard fallback if not in dummy list (legacy fallback)
            setArticle({
            id: id as string,
            title: "Understanding Land Ownership Laws in Kenya (2025 Guide)",
            content: "Land ownership in Kenya is governed by a complex set of statutes...",
            author: { name: "Dr. Jane Odhiambo", avatar: "" },
            likes: 342,
            tags: ["Real Estate", "Law Guide", "Kenya"],
            createdAt: new Date().toISOString()
            } as any);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5] dark:bg-[#121315]">
         <div className="h-12 w-12 border-4 border-[#B89868] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#121315] pb-20">
      {/* Article Progress / Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#FAF9F5]/90 dark:bg-[#121315]/90 backdrop-blur-md border-b border-[#E5E2DC] dark:border-stone-850">
         <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()} className="gap-2 text-stone-600 dark:text-stone-400 font-semibold">
               <ArrowLeft className="h-4 w-4 text-[#B89868]" /> Library
            </Button>
            <div className="flex items-center gap-3">
               <Button variant="ghost" size="icon" className="rounded-full">
                  <ThumbsUp className="h-5 w-5 text-stone-500 hover:text-[#B89868] transition-colors" />
               </Button>
               <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5 text-stone-500 hover:text-[#B89868] transition-colors" />
               </Button>
               <div className="h-8 w-[1px] bg-[#E5E2DC] dark:bg-stone-850 mx-2 hidden sm:block"></div>
               <Badge className="bg-[#B89868] text-white border-none font-bold hidden sm:flex px-2.5 py-0.5 rounded-lg">NEW UPDATE</Badge>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-6 pt-12 lg:pt-20">
         <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Meta Information */}
            <div className="space-y-6 text-center lg:text-left">
               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  {article.tags?.map((tag: string, idx: number) => (
                    <Badge key={idx} className="bg-[#FDFCF9] dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-850 text-stone-600 dark:text-stone-300 px-3 py-1 font-semibold rounded-lg">
                       #{tag}
                    </Badge>
                  ))}
               </div>
               <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#121315] dark:text-[#FAF9F5] tracking-tight leading-tight">
                  {article.title}
               </h1>
               
               <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                  <div className="flex items-center gap-3">
                     <Avatar className="h-12 w-12 border-2 border-[#B89868] dark:border-stone-800">
                        <AvatarImage src={article.author.avatar} />
                        <AvatarFallback className="bg-[#1C1B19] text-white font-serif font-bold">{article.author.name.charAt(0)}</AvatarFallback>
                     </Avatar>
                     <div className="text-left">
                        <p className="text-sm font-bold text-[#121315] dark:text-white">{article.author.name}</p>
                        <p className="text-xs text-stone-500 font-normal">Verified Legal Content Author</p>
                     </div>
                  </div>
                  <div className="h-4 w-[1px] bg-[#E5E2DC] dark:bg-stone-800 hidden sm:block"></div>
                  <div className="flex items-center gap-6 text-sm text-stone-500 font-semibold uppercase tracking-wider">
                     <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#B89868]" /> {new Date(article.createdAt).toLocaleDateString()}
                     </div>
                     <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#B89868]" /> 8 min read
                     </div>
                  </div>
               </div>
            </div>

            {/* Featured Image Placeholder (Simulated) */}
            <div className="relative group overflow-hidden rounded-2xl border border-[#E5E2DC] dark:border-stone-800 shadow-sm">
               <img 
                 src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop" 
                 className="w-full h-[300px] lg:h-[450px] object-cover group-hover:scale-103 transition-transform duration-700"
                 alt="Article Feature"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none prose-p:text-stone-600 dark:prose-p:text-stone-300 prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#B89868] dark:prose-a:text-[#B89868]">
               {/* Splitting content to simulate markdown rendering if needed, 
                   but for prototype we can use a wrapper */}
               <div className="whitespace-pre-wrap leading-relaxed space-y-8 font-normal">
                  {article.content}
               </div>
            </article>

            {/* Share & Feedback */}
            <div className="pt-12 border-t border-[#E5E2DC] dark:border-stone-850 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-stone-555 uppercase tracking-wider">Was this helpful?</span>
                  <Button variant="outline" className="rounded-xl gap-2 border-[#E5E2DC] dark:border-stone-850 font-semibold dark:text-white bg-[#FDFCF9] dark:bg-stone-900/30 hover:bg-[#FAF9F5] dark:hover:bg-stone-900">
                     <ThumbsUp className="h-4 w-4 text-[#B89868]" /> {article.likes}
                  </Button>
                  <Button variant="outline" className="rounded-xl gap-2 border-[#E5E2DC] dark:border-stone-850 font-semibold dark:text-white bg-[#FDFCF9] dark:bg-stone-900/30 hover:bg-[#FAF9F5] dark:hover:bg-stone-900">
                     <MessageCircle className="h-4 w-4 text-[#B89868]" /> 12 Comments
                  </Button>
               </div>
               <div className="flex gap-3">
                  <Button size="icon" className="rounded-xl bg-[#1C1B19] hover:bg-[#2C2A27] dark:bg-stone-900 dark:hover:bg-stone-850 text-white shadow-sm border border-[#E5E2DC]/10 dark:border-stone-800">
                     <Share2 className="h-4 w-4" />
                  </Button>
               </div>
            </div>

            {/* Read Next Section */}
            <div className="pt-20 space-y-10">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-serif font-bold text-[#121315] dark:text-white tracking-tight">Recommended for you</h3>
                  <Link href="/articles" className="text-[#B89868] dark:text-[#B89868]/90 font-bold flex items-center gap-2 hover:underline">
                     See library <ArrowRight className="h-4 w-4" />
                  </Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "Statutory Marriage Rights in Urban Jurisdictions", tag: "Family Law", time: "5 min" },
                    { title: "Filing a Small Claims Court report in Kenya", tag: "Litigation", time: "12 min" }
                  ].map((rec, i) => (
                    <div key={i} className="group p-8 rounded-2xl border border-[#E5E2DC] dark:border-stone-850 bg-[#FAF9F5] dark:bg-stone-950/20 hover:bg-[#FDFCF9] dark:hover:bg-stone-900/40 hover:border-[#B89868] hover:shadow-sm transition-all duration-300 cursor-pointer space-y-4">
                       <Badge className="bg-[#FDFCF9] dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-800 text-[#B89868] font-semibold uppercase text-[10px] tracking-wider rounded-lg px-2 py-0.5">{rec.tag}</Badge>
                       <h4 className="text-xl font-serif font-bold text-[#121315] dark:text-white group-hover:text-[#B89868] dark:group-hover:text-[#B89868] transition-colors">{rec.title}</h4>
                       <div className="flex items-center gap-4 text-stone-400 font-semibold text-xs uppercase">
                          <Clock className="h-3 w-3 text-[#B89868]" /> {rec.time} read
                       </div>
                    </div>
                  ))}
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
