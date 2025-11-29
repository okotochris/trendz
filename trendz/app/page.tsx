// app/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Hotel, Plane, Newspaper, Zap, MapPin } from "lucide-react";
import Header from "./component/header";
import Footer from "./component/footer";
import { useEffect, useState } from "react";
import HotelGrid from "./component/hotels";
const server = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [flights, setFlights] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const res = await fetch(`${server}/api/home`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setHotels(data.hotel || []);
        setFlights(data.flight || []);  // Your real flights
        setNews(data.news || []);  
       
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob" />
          <div className="absolute -top-20 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-200/50">
            <Zap className="w-5 h-5" />
            Africa's Smartest Travel & News Platform
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
            Stay Ahead.<br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
              Travel Better.
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Real-time news • Instant flights • Luxury hotels • Made in Nigeria
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/news" className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/50 flex items-center gap-3">
              <Newspaper className="w-6 h-6" /> Latest News <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/flight" className="px-10 py-5 bg-white border border-gray-200 rounded-2xl font-bold hover:shadow-2xl flex items-center gap-3">
              <Plane className="w-6 h-6 text-blue-600" /> Book Flight
            </Link>
          </div>
        </div>
      </section>

      {/* BREAKING NEWS — Real Data */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Breaking News</h2>
          <p className="text-xl text-gray-600 mb-16">Live • Verified • Global</p>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {loading
              ? [...Array(3)].map((_, i) => <div key={i} className="h-96 bg-gray-200 rounded-3xl animate-pulse" />)
              : news.slice(0, 3).map((article: any, i: number) => (
                  <a
                    href={`/news/${article.id}`}
                    key={i}
                    className="group block relative h-96 rounded-3xl overflow-hidden shadow-2xl"
                  >
                        {article.urltoimage ? (
                          <img
                            src={article.urltoimage[0]}
                            alt={article.title}
                            className="w-full h-full object-cover rounded-3xl"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-3xl" />
                        )}


                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <h3 className="text-2xl font-bold line-clamp-3">{article.title}</h3>
                      <p className="mt-4 text-cyan-400 flex items-center gap-2">
                        Read more <ArrowRight className="w-5 group-hover:translate-x-2 transition" />
                      </p>
                    </div>
                  </a>
                ))}
          </div>
          <Link href="/news" className="mt-20 inline-block px-16 py-6 bg-blue-600 text-white text-black text-2xl font-bold rounded-3xl hover:bg-blue-700 transition">
            View more news
          </Link>
        </div>
      </section>

      {/* FLIGHT DEALS — From Your DB */}
      <section className="py-32 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8">Hot Flight Deals Today</h2>
          <p className="text-2xl opacity-90 mb-16">Book instantly • Best prices guaranteed</p>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {loading
              ? [...Array(3)].map((_, i) => <div key={i} className="h-64 bg-white/10 rounded-3xl animate-pulse" />)
              : flights.slice(0, 3).map((flight: any, i: number) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center justify-center gap-4 mb-6">
                      {flight.airline_logo && (
                        <img src={'/logo.png'} alt={flight.airline_name} className="h-10" />
                      )}
                      <span className="text-lg font-bold">{flight.airline_name}</span>
                    </div>

                    <p className="text-3xl font-black">
                      {flight.origin} → {flight.destination}
                    </p>
                    <p className="text-xl mt-2 opacity-80">{flight.flight_number}</p>

                    <div className="my-6 text-5xl font-black">
                      ${flight.price}
                    </div>

                    <a
                      href={flight.booking_link}
                      target="_blank"
                      className="block w-full bg-white text-blue-600 font-bold py-4 rounded-2xl hover:bg-gray-100 transition"
                    >
                      Book Now →
                    </a>

                    <p className="text-sm mt-4 opacity-75">
                      {new Date(flight.departure_date).toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                ))}
          </div>

          <Link href="/flight" className="mt-20 inline-block px-16 py-6 bg-white text-blue-600 text-black text-2xl font-bold rounded-3xl hover:bg-blue-700 transition">
            See All Flights
          </Link>
        </div>
      </section>

<HotelGrid
  hotels={hotels}
  title="Featured Luxury Hotels"
  subtitle="Curated collection of the finest stays in Africa"
  maxItems={8}
  showViewAll={true}
/>
      <Footer />
    </>
  );
}