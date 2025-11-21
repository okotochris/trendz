"use client";

import Footer from "@/app/component/footer";
import Header from "@/app/component/header";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewsDetail({
  params,
}: {
  params: { slug: string };
}) {
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const article = {
    title: "Nigeria Records Highest Tech Startup Growth in 2025",
    date: "November 21, 2025",
    author: "Trendz Editorial",
    category: "Technology",
    readTime: "4 min read",
    image: "/hero.jpg",
    content: [
      "Nigeria's tech ecosystem has recorded unprecedented growth in 2025, with over 180 new startups founded across fintech, edtech, and healthtech sectors.",
      "Experts believe this growth is driven by improved internet access, increased foreign investment, and a new wave of self-taught developers across the country.",
      "Lagos, Abuja, and Port Harcourt remain top innovation hubs, with several startups now expanding globally.",
      "Analysts predict even greater growth in 2026 as government policies continue to support digital entrepreneurship."
    ]
  };

  const relatedNews = [
    {
      slug: "fintech-boom-in-africa",
      title: "Fintech Boom Continues Across Africa",
      image: "/hero1.jpg",
      excerpt: "African fintech startups attract record-breaking funding in 2025."
    },
    {
      slug: "nigeria-ai-innovation",
      title: "Nigeria Emerges as AI Innovation Hub",
      image: "/hero.jpg",
      excerpt: "Local developers are building global AI solutions from Lagos."
    },
    {
      slug: "west-africa-tech-investment",
      title: "West Africa Gets $5B Tech Investment",
      image: "/hero2.jpg",
      excerpt: "Investors turn to West Africa as the next Silicon Valley."
    }
  ];

  const share = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(article.title + " " + pageUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${pageUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
  };

  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    alert("Link copied!");
  };

  return (
    <main className="bg-[#f8f9fa] min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative h-[80vh]">
        <Image src={article.image} alt={article.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 max-w-4xl w-full px-5 text-white">
          <span className="bg-red-600 px-4 py-1 text-sm rounded-full uppercase">
            {article.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold mt-4">
            {article.title}
          </h1>

          <p className="mt-4 text-gray-300">
            {article.author} • {article.date} • {article.readTime}
          </p>
        </div>
      </section>

      {/* FLOATING SHARE BAR */}
      <div className="fixed top-1/2 left-4 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-50">
        <a href={share.whatsapp} target="_blank" className="bg-green-600 text-white px-4 py-2 rounded-full">WA</a>
        <a href={share.twitter} target="_blank" className="bg-black text-white px-4 py-2 rounded-full">X</a>
        <a href={share.facebook} target="_blank" className="bg-blue-600 text-white px-4 py-2 rounded-full">FB</a>
        <button onClick={copyLink} className="bg-gray-700 text-white px-4 py-2 rounded-full">Copy</button>
      </div>

      {/* ARTICLE CONTENT */}
      <section className="max-w-3xl mx-auto px-5 py-16">
        <article className="bg-white p-6 md:p-10 rounded-2xl shadow-xl -mt-24">
          <div className="space-y-6 text-gray-800 text-lg">
            {article.content.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </article>
      </section>

      {/* RELATED NEWS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8">Related News</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {relatedNews.map((news) => (
            <Link
              key={news.slug}
              href={`/news/${news.slug}`}
              className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                <p className="text-sm text-gray-600">{news.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
