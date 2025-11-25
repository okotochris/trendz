// components/HotelGrid.tsx
import Link from "next/link";
import { MapPin } from "lucide-react";
import parseRoomWildcards from './wildcard'
// Parse Hotelbeds wildcards → clean tags (same logic you love)

interface Hotel {
  id: number;
  hotelbeds_code: string;
  name: string;
  city: string;
  country_code: string;
  images?: string[];
  wildcards?: string[];
  price?: string;
  ranking?: number;
  web_url:string
}

interface HotelGridProps {
  hotels: Hotel[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  maxItems?: number; // Optional limit (default 8 on home)
}

export default function HotelGrid({
  hotels,
  title = "Stay in Luxury",
  subtitle = "Handpicked 5-star hotels across Africa & beyond",
  showViewAll = true,
  maxItems = 8,
}: HotelGridProps) {
  const displayedHotels = hotels.slice(0, maxItems);

  if (hotels.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500">No hotels found at the moment.</p>
        </div>
      </section>
    );
  }
const normalizeUrl = (url: string) => {
  if (!url) return "/";
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
};
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">{title}</h2>
        <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">{subtitle}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {displayedHotels.map((hotel) => {
            const tags = parseRoomWildcards(hotel.wildcards);

            return (
              <div
                key={hotel.id}
                className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="aspect-[4/3] relative">
                  <img
                    src={hotel.images?.[0] || "/placeholder-hotel.jpg"}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Ranking Badge */}
                  {hotel.ranking && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                      #{hotel.ranking} in {hotel.city}
                    </div>
                  )}

                  {/* Clean Tags */}
                  {tags.length > 0 && (
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full shadow-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{hotel.name}</h3>
                  <p className="text-gray-600 flex items-center gap-2 mt-2 text-sm">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {hotel.city}, {hotel.country_code}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-white">
                    
                    <Link
                      href={normalizeUrl(hotel.web_url)}
                      key={hotel.id}
                      target="_blank"
                      className="mt-4 inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        {showViewAll && hotels.length > maxItems && (
          <div className="mt-20">
            <Link
              href="/hotels"
              className="inline-block px-12 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Explore All Hotels →
            </Link>
          </div>
        )}
         <Link href="/hotels" className="mt-20 inline-block px-16 py-6 bg-blue-600 text-white text-black text-2xl font-bold rounded-3xl hover:bg-blue-700 transition">
            View more
          </Link>
      </div>
      
    </section>
  );
}