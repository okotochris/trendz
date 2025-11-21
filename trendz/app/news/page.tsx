// app/news/page.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Share2, Bookmark, Zap, Calendar } from "lucide-react";
import Header from "../component/header";
import Footer from "../component/footer";

const news = [
  {
    id: 1,
    title: "Dangote Refinery Begins Petrol Export to West Africa",
    excerpt: "The $20B mega-refinery has officially commenced PMS supply to Ghana, Togo, and Benin — a historic milestone for African energy.",
    category: "Business",
    timeAgo: "2 hours ago",
    readTime: "5 min",
    image: "/hero.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Lagos Launches 100 Electric Blue Buses",
    excerpt: "Governor Sanwo-Olu flags off eco-friendly fleet on major routes — reducing carbon emissions by 40% in the city.",
    category: "Technology",
    timeAgo: "6 hours ago",
    readTime: "4 min",
    image: "/hero1.jpg",
  },
  {
    id: 3,
    title: "Super Eagles Qualify for 2026 World Cup",
    excerpt: "Osimhen’s 94th-minute header sends Nigeria to the World Cup after dramatic victory over South Africa in Abuja.",
    category: "Sports",
    timeAgo: "LIVE",
    readTime: "3 min",
       image: "/hero2.jpg",
    live: true,
  },
  {
    id: 4,
    title: "Flutterwave Valued at $3B After Series E Round",
    excerpt: "Nigerian fintech giant raises $250M led by B Capital, becoming Africa’s most valuable startup.",
    category: "Startups",
    timeAgo: "1 day ago",
    readTime: "6 min",
       image: "/hero.jpg",
  },
  {
    id: 5,
    title: "Lagos-Calabar Coastal Highway Hits 60%",
    excerpt: "Federal Government confirms 700km superhighway is ahead of schedule — partial opening in 2026.",
    category: "Infrastructure",
    timeAgo: "2 days ago",
    readTime: "7 min",
        image: "/hero.jpg",
  },
  {
    id: 6,
    title: "Burna Boy Wins Grammy for Best Global Album",
    excerpt: "'Love, Damini' beats Beyoncé, Rosalia, and Bad Bunny to win at the 2025 Grammys in Los Angeles.",
    category: "Entertainment",
    timeAgo: "3 days ago",
    readTime: "4 min",
        image: "/hero.jpg",
  },
];

export default function NewsPage() {
  const featured = news.find(n => n.featured);

  return (
    <>
      <Header />
     
      {/* HERO FEATURED NEWS — Full Bleed + Parallax Feel */}
      {featured && (
        <section className="relative h-screen flex items-end pb-24 overflow-hidden">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            className="object-cover brightness-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

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
                {featured.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-8 text-white/80 mb-10">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {featured.readTime} read
                </span>
              </div>

              <Link
                href={`/news/${featured.id}`}
                className="inline-flex items-center gap-4 bg-white text-black font-black px-12 py-6 rounded-3xl text-xl shadow-2xl hover:scale-105 transition-all duration-500 group"
              >
                Read Full Story
                <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ALL NEWS — Animated Grid with Hover Lift */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Latest Stories
            </h2>
            <p className="text-xl text-gray-600">Curated. Real-time. Unfiltered.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {news.filter(n => !n.featured).map((article, i) => (
              <Link
                href={`/news/${article.id}`}
                key={article.id}
                className="group block transform transition-all duration-700 hover:-translate-y-4"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <article className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />

                    {article.live && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                        LIVE
                      </div>
                    )}

                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="font-medium text-gray-700">{article.timeAgo}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-2 mb-4">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-3 mb-6">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-bold text-lg flex items-center gap-3 group-hover:gap-5 transition-all">
                        See More <ArrowRight className="w-5 h-5" />
                      </span>

                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                          <Share2 className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                          <Bookmark className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <button className="px-16 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-500">
              Load More Stories
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}