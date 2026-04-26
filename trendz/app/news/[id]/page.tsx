import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/app/component/header";
import Footer from "@/app/component/footer";
import NewsDetailClient from "./NewsDetailClient";


const server = process.env.NEXT_PUBLIC_API_URL;
async function getNews(id: string) {
  try {
    const res = await fetch(`${server}/api/news/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* ---------------- META FOR SOCIAL SHARING ---------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {

  const { id } = await params;

  const data = await getNews(id);
  const article = data?.news;

  if (!article) {
    return {
      title: "News",
      description: "Latest news updates",
    };
  }

  const image = Array.isArray(article.urltoimage)
    ? article.urltoimage[0]
    : article.urltoimage;

  const pageUrl = `https://www.trendz.ng//news/${id}`;

  return {
    title: article.title,
    description: article.description,

    openGraph: {
      title: article.title,
      description: article.description,
      url: pageUrl,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [image],
    },
  };
}

/* ---------------- PAGE ---------------- */

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const data = await getNews(id);

  if (!data?.news) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">

          <div className="relative">
            <div className="absolute inset-0 rounded-full border-4 border-red-400 opacity-40 animate-ping"></div>

            <div className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
          </div>

          <p className="text-red-600 text-lg font-semibold animate-pulse">
            Loading...
          </p>

        </div>
      </main>
    );
  }

  const article = data.news;
  const relatedNews = data.moreNews || [];

  return (
    <main className="bg-[#f8f9fa] min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative h-[80vh]">
        <div className="relative w-full h-64">
          <img
            src={article.urltoimage?.[0]}
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

      {/* SOCIAL SHARE BUTTONS */}
      <NewsDetailClient
        title={article.title}
        description={article.description}
      />

      {/* ARTICLE BODY */}
      <section className="max-w-3xl mx-auto px-5 py-16">
        <article className="bg-white p-6 md:p-10 rounded-2xl shadow-xl -mt-24">

          <div
            className="space-y-6 text-gray-800 text-lg"
            style={{ whiteSpace: "pre-line" }}
          >
            {article.content}
          </div>

        </article>
      </section>

      {/* IMAGE GALLERY */}
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">

          {article.urltoimage?.map((img: string, i: number) => (
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

        <h2 className="text-2xl font-bold mb-8">
          Related News
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {relatedNews.map((news: any) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
            >
              <div className="relative w-full h-60">
                <img
                  src={news.urltoimage}
                  alt={news.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-5">

                <h3 className="font-semibold text-lg mb-2">
                  {news.title}
                </h3>

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