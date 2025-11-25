// app/hotels/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search, MapPin, Calendar, Users, Star, ArrowRight, Filter, Loader2
} from "lucide-react";
import Header from "../component/header";
import Footer from "../component/footer";
const server = process.env.NEXT_PUBLIC_API_URL;
// Types
interface Hotel {
  id: number;
  hotelbeds_code: string;
  name: string;
  city: string;
  country_code: string;
  images?: string[];
  wildcards?: string[];
  facilities?: string[];
  ranking?: number;
  price?: string;
  web_url:string;
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  // Search states (you can connect later)
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const PAGE_SIZE = 10;

  // Fetch hotels
  const fetchHotels = useCallback(async (pageNum: number, append = false) => {
    try {
      const res = await fetch(`${server}/api/hotels?page=${pageNum}&limit=${PAGE_SIZE}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const newHotels: Hotel[] = data.hotels || [];
      setHotels(prev => append ? [...prev, ...newHotels] : newHotels);
      setHasMore(newHotels.length === PAGE_SIZE);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchHotels(1);
  }, [fetchHotels]);

  // Infinite scroll observer
  const lastHotelRef = useCallback((node: HTMLDivElement | null) => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setLoadingMore(true);
        setPage(prev => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore]);

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchHotels(page, true);
    }
  }, [page, fetchHotels]);
const normalizeUrl = (url: string) => {
  if (!url) return "/";
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
};

  return (
    <>
      <Header />

      {/* HERO + SEARCH */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-purple-900">
        <Image
          src="/hero.jpg"
          alt="Luxury Hotel"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl">
            Stay in Luxury
          </h1>
          <p className="text-2xl text-gray-200 mb-16 font-light">
            Handpicked 5-star hotels in Nigeria & beyond
          </p>

          {/* Glassmorphic Search Bar */}
          <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <MapPin className="inline w-4 h-4 mr-2" /> Destination
                </label>
                <input
                  type="text"
                  placeholder="Lagos, Dubai, London..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white/60 transition"
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <Calendar className="inline w-4 h-4 mr-2" /> Check In
                </label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white" />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <Calendar className="inline w-4 h-4 mr-2" /> Check Out
                </label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white" />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <Users className="inline w-4 h-4 mr-2" /> Guests
                </label>
                <select className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white">
                  <option>2 Adults</option>
                  <option>2 Adults + 1 Child</option>
                  <option>4 Adults</option>
                </select>
              </div>

              <div className="md:col-span-5 flex justify-center mt-6">
                <button className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xl px-16 py-6 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 flex items-center gap-4">
                  <Search className="w-7 h-7" />
                  Search Hotels
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOTEL GRID */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                All Luxury Hotels
              </h2>
              <p className="text-xl text-gray-600 mt-4">
                {hotels.length}+ properties available
              </p>
            </div>
            <button className="flex items-center gap-3 text-blue-600 font-bold text-lg hover:gap-5 transition">
              <Filter className="w-6 h-6" /> Filters
            </button>
          </div>

          {loading ? (
            // Skeleton
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-xl animate-pulse">
                  <div className="h-80 bg-gray-300" />
                  <div className="p-8">
                    <div className="h-8 bg-gray-300 rounded w-3/4 mb-4" />
                    <div className="h-6 bg-gray-300 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {hotels.map((hotel, i) => (
                <Link
                  href={normalizeUrl(hotel.web_url)}
                    key={hotel.id}
                    target="_blank"
                    rel="noopener noreferrer"

                  className="group block transform transition-all duration-700 hover:-translate-y-6"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={hotel.images?.[0] || "/placeholder-hotel.jpg"}
                        alt={hotel.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      {hotel.ranking && (
                        <div className="absolute top-6 left-6 bg-yellow-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                          #{hotel.ranking} in {hotel.city}
                        </div>
                      )}
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition">
                        {hotel.name}
                      </h3>
                      <p className="text-gray-600 flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4" />
                        {hotel.city}, {hotel.country_code}
                      </p>

                      {hotel.facilities && (
                        <div className="flex flex-wrap gap-2 mt-6">
                          {hotel.facilities.slice(0, 3).map((amenity) => (
                            <span key={amenity} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-medium">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-8">
                        {hotel.price ? 
                      <div>
                          <p className="text-3xl font-black text-gray-900">
                            ₦{hotel.price || "285,000"}
                            <span className="text-lg font-normal text-gray-500"> / night</span>
                          </p>
                        </div>:
                        ""  
                      }
                        <span className="text-blue-600 font-bold text-lg flex items-center gap-3 group-hover:gap-5 transition">
                           <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Loading More Indicator */}
          {loadingMore && (
            <div className="text-center py-16">
              <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-600" />
              <p className="mt-4 text-gray-600">Loading more luxury hotels...</p>
            </div>
          )}

          {!hasMore && hotels.length > 0 && (
            <div className="text-center py-16 text-gray-500">
              You've reached the end. All hotels loaded!
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}