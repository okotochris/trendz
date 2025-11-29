"use client";

import Footer from "@/app/component/footer";
import Header from "@/app/component/header";
import Link from "next/link";
import { Key, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaFacebook, FaTwitter, FaCopy } from "react-icons/fa";

const server = process.env.NEXT_PUBLIC_API_URL;

export default function NewsDetail() {
  const [article, setArticle] = useState<any>(null);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  const [pageUrl, setPageUrl] = useState("");
  const pathname = usePathname()
  const id = pathname.split('/')[2]
  // COPY LINK
  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    alert("Link copied!");
  };

  // Fetch article + related
  useEffect(() => {
    console.log(id)
    const fetchData = async () => {
      try {
        const res = await fetch(`${server}/api/news/${id}`);
        const data = await res.json();
        setArticle(data.news);
        setRelatedNews(data.moreNews);
      } catch (err) {
        console.error("Failed to load article:", err);
      }
    };

    fetchData();
    setPageUrl(window.location.href);
  }, [id]);

  // Loading
  if (!article) {
    return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">

        {/* Fancy Rolling Loader */}
        <div className="relative">
          {/* Outer glowing ring */}
          <div className="absolute inset-0 rounded-full border-4 border-red-400 opacity-40 animate-ping"></div>

          {/* Main spinning ring */}
          <div className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>

          {/* Small bouncing dot */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
        </div>

        <p className="text-red-600 text-lg font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    </main>


    );
  }

  const share = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      article.title + " " + pageUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      article.title
    )}&url=${pageUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
  };

  return (
    <main className="bg-[#f8f9fa] min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative h-[80vh]">
        <div className="relative w-full h-64">
        <img
          src={article.urltoimage[0]}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
         
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 max-w-4xl w-full px-5 text-white">
          <span className="bg-red-600 px-4 py-1 text-sm rounded-full uppercase">
            {article.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold mt-4">
            {article.title}
          </h1>

          <p className="mt-4 text-gray-300">
            {article.author} • {article.publishedat}
          </p>
        </div>
    </section>

      {/* FLOATING SHARE BAR */}
<div className="fixed top-1/2 left-4 -translate-y-1/2 flex flex-col gap-3 z-50">
  <a
    href={share.whatsapp}
    target="_blank"
    className="bg-green-600 text-white px-4 py-2 rounded-full"
  >
    <FaWhatsapp />
  </a>

  <a
    href={share.twitter}
    target="_blank"
    className="bg-black text-white px-4 py-2 rounded-full"
  >
    <FaTwitter />
  </a>

  <a
    href={share.facebook}
    target="_blank"
    className="bg-blue-600 text-white px-4 py-2 rounded-full"
  >
    <FaFacebook />
  </a>

  <button
    onClick={copyLink}
    className="bg-gray-700 text-white px-4 py-2 rounded-full"
  >
    <FaCopy />
  </button>
</div>


      {/* ARTICLE CONTENT */}
      <section className="max-w-3xl mx-auto px-5 py-16">
        <article className="bg-white p-6 md:p-10 rounded-2xl shadow-xl -mt-24">
          <div className="space-y-6 text-gray-800 text-lg">
            
              <p>{article.content}</p>
        
          </div>
        </article>
      </section>
<div className="w-full flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
    {article.urltoimage?.map((img:string, i:number) => (
      <div
        key={i}
        className="w-full h-60 bg-gray-100 rounded-lg overflow-hidden shadow"
      >
        <img
          src={img}
          alt={article.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    ))}
  </div>
</div>

      {/* RELATED NEWS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8">Related News</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {relatedNews.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
            >
              <div className="relative w-full h-64">
              <div className="relative w-full h-60">
              <img
                src={news.urltoimage}
                alt={news.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>

              </div>

              <div className="p-5">
                <div className="h-4"></div>
                <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {news.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
