'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  ThumbsUp, 
  BookOpen, 
  MessageCircle,
  Hash,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { apiClient } from '@/lib/api-client';
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
        console.error('Failed to fetch article:', err);
        // Fallback for prototype/demo
        setArticle({
          id: id as string,
          title: "Understanding Land Ownership Laws in Kenya (2025 Guide)",
          content: "Land ownership in Kenya is governed by a complex set of statutes, primarily the Land Act of 2012 and the Land Registration Act of 2012. Understanding these regulations is crucial for both domestic and foreign investors. \n\n### 1. Types of Land Tenure\nThere are three main categories of land in Kenya:\n- **Public Land**: Includes forests, water bodies, and minerals.\n- **Community Land**: Land held by communities on the basis of ethnicity, culture or similar community of interest.\n- **Private Land**: Land held by individuals or corporations under freehold or leasehold tenure.\n\n### 2. The Step-by-Step Purchase Process\nBuying land requires due diligence starting with an official search at the Land Registry to confirm ownership and encumbrances. \n\n### 3. Recent Legislative Updates\nThe 2024 Digital Land Records initiative has significantly reduced fraud by shifting all title deeds to an encrypted blockchain backend...",
          author: { name: "Dr. Jane Odhiambo", avatar: "" },
          likes: 342,
          tags: ["Real Estate", "Law Guide", "Kenya"],
          createdAt: new Date().toISOString()
        } as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
         <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      {/* Article Progress / Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
         <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()} className="gap-2 text-slate-600 dark:text-slate-400 font-bold">
               <ArrowLeft className="h-4 w-4" /> Library
            </Button>
            <div className="flex items-center gap-3">
               <Button variant="ghost" size="icon" className="rounded-full">
                  <ThumbsUp className="h-5 w-5 text-slate-500" />
               </Button>
               <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5 text-slate-500" />
               </Button>
               <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>
               <Badge className="bg-blue-600 text-white border-none font-black hidden sm:flex">NEW UPDATE</Badge>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-6 pt-12 lg:pt-20">
         <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Meta Information */}
            <div className="space-y-6 text-center lg:text-left">
               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  {article.tags?.map((tag, idx) => (
                    <Badge key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none px-3 py-1 font-bold">
                       #{tag}
                    </Badge>
                  ))}
               </div>
               <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {article.title}
               </h1>
               
               <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                  <div className="flex items-center gap-3">
                     <Avatar className="h-12 w-12 border-2 border-blue-100 dark:border-slate-800">
                        <AvatarImage src={article.author.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white font-bold">{article.author.name.charAt(0)}</AvatarFallback>
                     </Avatar>
                     <div className="text-left">
                        <p className="text-sm font-black text-slate-900 dark:text-white">{article.author.name}</p>
                        <p className="text-xs text-slate-500 font-medium">Verified Legal Content Author</p>
                     </div>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
                  <div className="flex items-center gap-6 text-sm text-slate-500 font-bold uppercase tracking-widest">
                     <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {new Date(article.createdAt).toLocaleDateString()}
                     </div>
                     <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" /> 8 min read
                     </div>
                  </div>
               </div>
            </div>

            {/* Featured Image Placeholder (Simulated) */}
            <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop" 
                 className="w-full h-[300px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
                 alt="Article Feature"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-headings:font-black prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-teal-400">
               {/* Splitting content to simulate markdown rendering if needed, 
                   but for prototype we can use a wrapper */}
               <div className="whitespace-pre-wrap leading-relaxed space-y-8">
                  {article.content}
               </div>
            </article>

            {/* Share & Feedback */}
            <div className="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Was this helpful?</span>
                  <Button variant="outline" className="rounded-full gap-2 border-slate-200 dark:border-slate-800 font-bold dark:text-white">
                     <ThumbsUp className="h-4 w-4" /> {article.likes}
                  </Button>
                  <Button variant="outline" className="rounded-full gap-2 border-slate-200 dark:border-slate-800 font-bold dark:text-white">
                     <MessageCircle className="h-4 w-4" /> 12 Comments
                  </Button>
               </div>
               <div className="flex gap-3">
                  <Button size="icon" className="rounded-full bg-slate-900 dark:bg-slate-800 text-white hover:bg-black">
                     <Share2 className="h-5 w-5" />
                  </Button>
               </div>
            </div>

            {/* Read Next Section */}
            <div className="pt-20 space-y-10">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Recommended for you</h3>
                  <Link href="/articles" className="text-blue-600 dark:text-teal-400 font-bold flex items-center gap-2 hover:underline">
                     See library <ArrowRight className="h-4 w-4" />
                  </Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "Statutory Marriage Rights in Urban Jurisdictions", tag: "Family Law", time: "5 min" },
                    { title: "Filing a Small Claims Court reported: Kenya", tag: "Litigation", time: "12 min" }
                  ].map((rec, i) => (
                    <div key={i} className="group p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl transition-all cursor-pointer space-y-4">
                       <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 border-none font-bold uppercase text-[10px] tracking-widest">{rec.tag}</Badge>
                       <h4 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">{rec.title}</h4>
                       <div className="flex items-center gap-4 text-slate-400 font-bold text-xs uppercase">
                          <Clock className="h-3 w-3" /> {rec.time} read
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
