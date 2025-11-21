// app/page.tsx
import Link from "next/link";
import { ArrowRight, Hotel, Plane, Newspaper, Zap, MapPin } from "lucide-react";
import Header from "./component/header";
import Footer from "./component/footer";

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO — 2025 Elite Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Animated Gradient Orbs */}
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

          <h1 className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
            Stay Ahead.<br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
              Travel Better.
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            Real-time global news • Instant flight booking • Luxury hotels • Built in Lagos
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/news"
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-cyan-500/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
            >
              <Newspaper className="w-6 h-6" />
              Latest News
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 opacity-0 group-hover:opacity-100 blur-xl transition duration-500 -z-10" />
            </Link>

            <Link
              href="/flights"
              className="px-10 py-5 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl font-bold text-lg hover:bg-white hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
            >
              <Plane className="w-6 h-6 text-blue-600" />
              Book a Flight
            </Link>
          </div>

          {/* Floating price card */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-2xl border border-white/50 rounded-3xl px-10 py-6 shadow-2xl">
            <p className="text-gray-800 font-bold text-lg">Lagos → Dubai • ₦485,000 • Today</p>
          </div>
        </div>
      </section>

      {/* NEWS SECTION — Glassmorphic Cards */}
      <section className="py-32 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900">Breaking News</h2>
            <p className="mt-6 text-xl text-gray-600">Real-time • Verified • From Africa to the World</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              { title: "Dangote Refinery Begins Petrol Export", tag: "Business" },
              { title: "Lagos Launches 100 Electric Buses", tag: "Technology" },
              { title: "Super Eagles Qualify for World Cup", tag: "Sports", live: true },
            ].map((item, i) => (
              <Link
                href="/news"
                key={i}
                className="group block relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl hover:shadow-3xl transition-all duration-700 border border-gray-800"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />

                <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
                  <span className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-white text-sm font-semibold border border-white/20">
                    {item.tag}
                  </span>
                  {item.live && (
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold animate-pulse">
                      LIVE
                    </span>
                  )}
                </div>

                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-cyan-400 font-semibold flex items-center gap-3">
                    Read Now <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition" />
                  </p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-1000 -rotate-12 translate-x-full group-hover:translate-x-0" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/news" className="text-xl font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-3">
              View All Stories <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOTELS — Floating Luxury Cards */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900">Stay in Luxury</h2>
            <p className="mt-6 text-xl text-gray-600">Handpicked 5-star hotels in Nigeria & beyond</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {["Eko Signature", "The Delborough", "Transcorp Hilton", "Radisson Blu Anchorage"].map((hotel, i) => (
              <div key={i} className="group relative">
                <div className="h-96 rounded-3xl bg-gradient-to-br from-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center transition-all duration-500 hover:border-transparent hover:shadow-2xl">
                  <Hotel className="w-20 h-20 text-gray-400 mb-6 group-hover:text-blue-600 transition" />
                  <h3 className="text-2xl font-bold text-gray-800">{hotel}</h3>
                  <p className="text-gray-500 mt-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Lagos, Nigeria
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 flex items-end p-8">
                  <div>
                    <p className="text-white text-3xl font-bold">₦285,000+</p>
                    <p className="text-cyan-300 text-sm mt-2">per night • Deluxe Suite</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              href="/hotels"
              className="px-12 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 inline-block"
            >
              Explore All Hotels
            </Link>
          </div>
        </div>
      </section>

      {/* FLIGHTS — Full Bleed Premium */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-cyan-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8">Fly Anywhere in Style</h2>
          <p className="text-2xl text-blue-100 mb-16">Best prices • Instant booking • Zero stress</p>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              { route: "Lagos → London", price: "₦485,900" },
              { route: "Abuja → Dubai", price: "₦620,000" },
              { route: "Lagos → New York", price: "₦1.25M" },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500"
              >
                <Plane className="w-16 h-16 mx-auto mb-6 text-cyan-300" />
                <p className="text-2xl font-bold">{f.route}</p>
                <p className="text-5xl font-black mt-6">{f.price}</p>
                <p className="text-blue-200 mt-3">Round Trip • Business Class</p>
                <button className="mt-8 w-full bg-white text-blue-600 font-bold py-5 rounded-2xl hover:bg-gray-100 transition text-lg">
                  Book Now
                </button>
              </div>
            ))}
          </div>

          <Link
            href="/flights"
            className="mt-20 inline-block px-16 py-7 bg-white text-blue-600 font-black text-2xl rounded-3xl shadow-2xl hover:scale-110 transition-all"
          >
            Search All Flights
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}