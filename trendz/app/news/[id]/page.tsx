import type { Metadata } from "next";
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
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">

    <img
      src={article.urltoimage?.[0]}
      alt={article.title}
      className="absolute inset-0 w-full h-full object-cover scale-105"
    />

  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-5xl w-full px-6 text-white">

    <span className="bg-red-600 px-5 py-2 rounded-full text-sm uppercase">
      {article.category}
    </span>

    <h1 className="text-4xl md:text-6xl font-black mt-6 leading-tight">
      {article.title}
    </h1>

    <p className="mt-5 text-gray-300 text-lg">
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
      {/* ARTICLE BODY (EDITORIAL STYLE) */}
<section className="max-w-5xl mx-auto px-6 py-16">

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

    {/* MAIN ARTICLE */}
    <article className="lg:col-span-8">

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">

        {/* LEAD TEXT */}
        <div className="text-lg leading-relaxed text-gray-800 space-y-6">

          {article.content}

        </div>

      </div>

    </article>

        {/* SIDEBAR (optional structure for later ads/related widgets) */}
        <aside className="lg:col-span-4 space-y-6">

          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="font-semibold text-lg mb-3">
              Story Highlights
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Breaking coverage updated live</li>
              <li>• Verified sources included</li>
              <li>• Multimedia supported article</li>
            </ul>
          </div>

        </aside>

      </div>
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
      <div className="text-lg leading-relaxed text-gray-800 space-y-8">

  {relatedNews?.map((block: string, i: number) => (
    <p key={i} className="leading-8">
      {block}
    </p>
  ))}

</div>

      <Footer />
    </main>
  );
}