"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Header from "../component/header";
import Footer from "../component/footer";
import { ArrowRight, Clock, Zap, Calendar, Loader2 } from "lucide-react";

const server = process.env.NEXT_PUBLIC_API_URL;

interface Article {
  id: number;
  title: string;
  urltoimage?: string;
  excerpt?: string;
  timeAgo?: string;
  readTime?: string;
  live?: boolean;
  category?: string;
  featured?: boolean;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchNews = useCallback(async (pageNum: number) => {
    if (!hasMore && pageNum > 1) return;
    setLoading(true);

    try {
      const res = await fetch(`${server}/api/news?page=${pageNum}`);
      const data = await res.json();
      const newArticles: Article[] = data.articles || [];

      setArticles(prev => [...prev, ...newArticles]);
      setHasMore(data.pagination.hasMore ?? false);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [hasMore]);

  useEffect(() => {
    fetchNews(1);
  }, [fetchNews]);

  const lastArticleRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    }, { rootMargin: "150px" });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) fetchNews(page);
  }, [page, fetchNews]);

  const featured = articles.find(a => a.featured) || articles[0];
  const restArticles = articles.filter(a => a.id !== featured?.id);

  return (
    <>
      <Header />

      {/* HERO */}
      {featured && (
        <section className="relative h-screen flex items-end pb-32 overflow-hidden">
          <img
            src={featured.urltoimage || "/placeholder-news.jpg"}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-3 bg-red-600/20 backdrop-blur-md border border-red-500/30 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 animate-pulse">
                <Zap className="w-5 h-5" />
                BREAKING & TRENDING
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 drop-shadow-2xl">
                {featured.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl font-light">
                {featured.excerpt || "Latest breaking news from around the world"}
              </p>
              <div className="flex items-center gap-8 text-white/80 mb-10">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {featured.readTime || "5 min read"}
                </span>
              </div>
              <Link
                href={`/news/${featured.id}`}
                className="inline-flex items-center gap-4 bg-white text-black font-bold px-12 py-6 rounded-3xl text-xl shadow-2xl hover:scale-105 transition-all duration-500 group"
              >
                Read Full Story
                <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* GRID */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Latest Stories
            </h2>
            <p className="text-xl text-gray-600">Real-time • Verified • Global</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {restArticles.map((article, i) => {
              const isLast = i === restArticles.length - 1;
              return (
                <div ref={isLast ? lastArticleRef : null}>
                <Link
                  href={`/news/${article.id}`}
                  key={article.id}
                  
                  className="group block transform transition-all duration-700 hover:-translate-y-4"
                >
                  <article className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={article.urltoimage || "/placeholder-news.jpg"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      {article.live && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                          LIVE
                        </div>
                      )}
                      {article.category && (
                        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          {article.category}
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="font-medium text-gray-700">{article.timeAgo || "Just now"}</span>
                        <span>•</span>
                        <span>{article.readTime || "4 min read"}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-2 mb-4">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-6">
                        {article.excerpt || "Click to read the full story"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-bold text-lg flex items-center gap-3 group-hover:gap-5 transition">
                          Read More <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
                </div>
              );
            })}
          </div>

          {loading && (
            <div className="text-center py-16">
              <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-600" />
              <p className="mt-4 text-gray-600">Loading more stories...</p>
            </div>
          )}

          {!hasMore && articles.length > 0 && (
            <div className="text-center py-16 text-gray-500 text-xl font-medium">
              You've reached the end of the news feed.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
