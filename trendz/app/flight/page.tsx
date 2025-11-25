"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plane, Calendar, ArrowRight, MapPin, Search, Filter } from "lucide-react";
import Header from "../component/header";
import Footer from "../component/footer";

const server = process.env.NEXT_PUBLIC_API_URL;

interface Flight {
  id: number;
  origin: string;
  destination: string;
  departure_date: string;
  airline_name: string;
  airline_logo: string;
  flight_number: string;
  price: number | string;
  booking_link: string;
  created_at: string;
}

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchFlights = async (pageNumber: number) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`${server}/api/flight?page=${pageNumber}`);
      const data = await res.json();
      const list: Flight[] = data.flights || [];
      setFlights(prev => [...prev, ...list]);
      setPage(pageNumber);
      if (list.length < 10) setHasMore(false);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights(1);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loading &&
        hasMore
      ) {
        fetchFlights(page + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading, hasMore]);

  return (
    <>
      <Header />

      {/* Hero section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/hero2.jpg"
          alt="Flying over clouds"
          fill
          className="object-cover brightness-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl">
            Fly Anywhere <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              In Style
            </span>
          </h1>
        </div>
      </section>

      {/* Flights Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-5xl font-black text-gray-900">Best Deals Today</h2>
            <button className="flex items-center gap-3 text-blue-600 font-bold text-lg hover:gap-5 transition">
              <Filter className="w-6 h-6" /> Sort & Filter
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flights.map((flight) => (
              <Link
                key={flight.id}
                href={flight.booking_link || "#"}
                className="group block bg-white rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-700 border border-gray-100 hover:border-blue-200"
                target="_blank"
              >
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={"/trenz.jpg"}
                        width={60}
                        height={60}
                        alt={flight.airline_name}
                        className="rounded"
                      />
                      <div>
                        <p className="font-bold text-lg">{flight.airline_name}</p>
                        <p className="text-sm text-gray-500">{flight.flight_number}</p>
                      </div>
                    </div>
                    <p className="text-2xl font-black text-gray-900">
                      ${Number(flight.price).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">{flight.origin}</p>
                      <p className="text-gray-500 text-sm">{flight.departure_date}</p>
                    </div>
                    <Plane className="w-10 h-10 text-blue-600 rotate-90 md:rotate-0" />
                    <div>
                      <p className="font-bold">{flight.destination}</p>
                      <p className="text-gray-500 text-sm">{flight.departure_date}</p>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <span className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Book Now <ArrowRight className="inline w-4 h-4 ml-2" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {loading && (
            <div className="text-center mt-10 text-gray-600">Loading more flights...</div>
          )}
          {!hasMore && (
            <div className="text-center mt-10 text-gray-500 font-medium">
              ✅ You have reached the end.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
