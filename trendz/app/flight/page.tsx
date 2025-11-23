// app/flights/page.tsx
'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plane, Calendar, Users, ArrowRight, Clock, MapPin, Search, Filter } from "lucide-react";
import Header from "../component/header";
import Footer from "../component/footer";


const flights = [
  {
    id: 1,
    from: "Lagos (LOS)",
    to: "London (LHR)",
    airline: "British Airways",
    price: 485900,
    duration: "6h 30m",
    stops: "Nonstop",
    departure: "22:45",
    arrival: "05:15 +1",
    class: "Business",
    featured: true,
  },
  {
    id: 2,
    from: "Abuja (ABV)",
    to: "Dubai (DXB)",
    airline: "Emirates",
    price: 620000,
    duration: "7h 10m",
    stops: "Nonstop",
    departure: "18:20",
    arrival: "04:30 +1",
    class: "Economy",
  },
  {
    id: 3,
    from: "Lagos (LOS)",
    to: "New York (JFK)",
    airline: "Delta Air Lines",
    price: 1250000,
    duration: "11h 45m",
    stops: "Nonstop",
    departure: "23:00",
    arrival: "05:45",
    class: "Business",
  },
  {
    id: 4,
    from: "Lagos (LOS)",
    to: "Accra (ACC)",
    airline: "Africa World Airlines",
    price: 185000,
    duration: "1h 10m",
    stops: "Nonstop",
    departure: "08:30",
    arrival: "08:40",
    class: "Economy",
  },
  {
    id: 5,
    from: "Port Harcourt (PHC)",
    to: "Johannesburg (JNB)",
    airline: "South African Airways",
    price: 720000,
    duration: "5h 55m",
    stops: "Nonstop",
    departure: "14:15",
    arrival: "21:10",
    class: "Economy",
  },
  {
    id: 6,
    from: "Lagos (LOS)",
    to: "Paris (CDG)",
    airline: "Air France",
    price: 680000,
    duration: "6h 40m",
    stops: "Nonstop",
    departure: "23:40",
    arrival: "06:20 +1",
    class: "Premium Economy",
  },
];

export default function FlightsPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1 Adult");

  return (
    <>
      <Header />

      {/* HERO + FLIGHT SEARCH */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/hero1.jpg"
          alt="Flying over clouds"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl">
            Fly Anywhere<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              In Style
            </span>
          </h1>
          <p className="text-2xl text-gray-200 mb-16 font-light">
            Best prices • Instant booking • Zero hidden fees
          </p>

          {/* GLASSMORPHIC SEARCH BAR */}
          <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-3xl">
            <div className="grid md:grid-cols-6 gap-6">
              <div className="md:col-span-2">
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <Plane className="inline w-4 h-4 mr-2" />
                  From
                </label>
                <input
                  type="text"
                  placeholder="Lagos (LOS)"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white/60 transition"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  To
                </label>
                <input
                  type="text"
                  placeholder="London, Dubai, New York..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white placeholder-white/60 focus:outline-none focus:border-white/60 transition"
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Depart
                </label>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/60 transition"
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Return (Optional)
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/60 transition"
                />
              </div>

              <div className="md:col-span-1">
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  <Users className="inline w-4 h-4 mr-2" />
                  Passengers
                </label>
                <select className="w-full bg-white/20 border border-white/30 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-white/60 transition">
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>1 Adult + 1 Child</option>
                </select>
              </div>

              <div className="md:col-span-6 flex justify-center mt-6 z-50">
                <button className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-xl px-20 py-7 rounded-3xl shadow-2xl hover:shadow-cyan-500/60 hover:scale-105 transition-all duration-500 flex items-center gap-5">
                  <Search className="w-8 h-8" />
                  Search Flights
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-4 transition" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLIGHT RESULTS */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                Best Deals Today
              </h2>
              <p className="text-xl text-gray-600 mt-4">Real-time prices • Instant confirmation</p>
            </div>
            <button className="flex items-center gap-3 text-blue-600 font-bold text-lg hover:gap-5 transition">
              <Filter className="w-6 h-6" />
              Sort & Filter
            </button>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {flights.map((flight, i) => (
              <Link
                href={`/flights/${flight.id}`}
                key={flight.id}
                className="group block bg-white rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-700 border border-gray-100 hover:border-blue-200"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-8 mb-6">
                      <div>
                        <p className="text-4xl font-black text-gray-900">{flight.departure}</p>
                        <p className="text-lg text-gray-600">{flight.from}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-px bg-gray-300 flex-1" />
                        <Plane className="w-10 h-10 text-blue-600 rotate-90 md:rotate-0" />
                        <div className="h-px bg-gray-300 flex-1" />
                      </div>
                      <div>
                        <p className="text-4xl font-black text-gray-900">{flight.arrival}</p>
                        <p className="text-lg text-gray-600">{flight.to}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {flight.duration}
                      </span>
                      <span>•</span>
                      <span className="text-green-600 font-bold">{flight.stops}</span>
                      <span>•</span>
                      <span>{flight.airline}</span>
                    </div>
                  </div>

                  <div className="text-center md:text-right">
                    <p className="text-5xl font-black text-gray-900">
                      ₦{flight.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600 mb-4">Round trip • {flight.class}</p>
                    {flight.featured && (
                      <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
                        BEST PRICE TODAY
                      </span>
                    )}
                    <div className="text-blue-600 font-black text-xl flex items-center justify-center md:justify-end gap-4 group-hover:gap-6 transition-all">
                      Book Now <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <button className="px-20 py-7 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-cyan-500/60 hover:scale-105 transition-all duration-500">
              Load More Flights
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}