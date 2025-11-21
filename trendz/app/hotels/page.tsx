// app/hotels/page.tsx
'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Calendar, Users, Star, ArrowRight, Filter } from "lucide-react";
import Header from "../component/header";
import Footer from "../component/footer";


const hotels = [
  {
    id: 1,
    name: "Eko Signature Hotel",
    location: "Victoria Island, Lagos",
    price: 285000,
    rating: 4.9,
    reviews: 1240,
    image: "/hero.jpg",
    amenities: ["Spa", "Infinity Pool", "Ocean View", "5-Star Dining"],
    featured: true,
  },
  {
    id: 2,
    name: "The Delborough Lagos",
    location: "Ikoyi, Lagos",
    price: 450000,
    rating: 5.0,
    reviews: 892,
    image: "/hero.jpg",
  },
  {
    id: 3,
    name: "Transcorp Hilton Abuja",
    location: "Maitama, Abuja",
    price: 320000,
    rating: 4.8,
    reviews: 2150,
    image: "/hero.jpg",
  },
  {
    id: 4,
    name: "Radisson Blu Anchorage",
    location: "Victoria Island, Lagos",
    price: 298000,
    rating: 4.7,
    reviews: 1890,
    image: "/hero.jpg",
  },
  {
    id: 5,
    name: "Fraser Suites Abuja",
    location: "Central Business District",
    price: 260000,
    rating: 4.6,
    reviews: 980,
    image: "/hero2.jpg",
  },
  {
    id: 6,
    name: "Oriental Hotel Lagos",
    location: "Lekki Phase 1",
    price: 275000,
    rating: 4.8,
    reviews: 1670,
    image: "/hero.jpg",
  },
];

export default function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults");

  return (
    <>
      <Header />

      {/* HERO + SEARCH BAR */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-black to-purple-900">
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

          {/* GLASSMORPHIC SEARCH BAR */}
          <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Lagos, Abuja, Dubai..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white/60 transition"
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Check In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/60 transition"
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/60 transition"
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <Users className="inline w-4 h-4 mr-2" />
                  Guests
                </label>
                <select className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/60 transition">
                  <option>2 Adults</option>
                  <option>2 Adults + 1 Child</option>
                  <option>4 Adults</option>
                </select>
              </div>

              <div className="md:col-span-5 flex justify-center mt-6">
                <button className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xl px-16 py-6 rounded-3xl shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-500 flex items-center gap-4">
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
                Featured Hotels
              </h2>
              <p className="text-xl text-gray-600 mt-4">Luxury stays. Unforgettable experiences.</p>
            </div>
            <button className="flex items-center gap-3 text-blue-600 font-bold text-lg hover:gap-5 transition">
              <Filter className="w-6 h-6" />
              Filters
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {hotels.map((hotel, i) => (
              <Link
                href={`/hotels/${hotel.id}`}
                key={hotel.id}
                className="group block transform transition-all duration-700 hover:-translate-y-6"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    {hotel.featured && (
                      <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                        FEATURED
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition">
                          {hotel.name}
                        </h3>
                        <p className="text-gray-600 flex items-center gap-2 mt-2">
                          <MapPin className="w-4 h-4" />
                          {hotel.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="font-bold text-lg">{hotel.rating}</span>
                        </div>
                        <p className="text-sm text-gray-500">{hotel.reviews} reviews</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {hotel.amenities?.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-medium">
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-3xl font-black text-gray-900">
                          ₦{hotel.price.toLocaleString()}
                          <span className="text-lg font-normal text-gray-500"> / night</span>
                        </p>
                      </div>
                      <span className="text-blue-600 font-bold text-lg flex items-center gap-3 group-hover:gap-5 transition">
                        View Details <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <button className="px-16 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-500">
              Load More Hotels
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}