// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Zap, Users, Heart, Star, MapPin, Newspaper } from "lucide-react";
import Header from "../component/header";
import Footer from "../component/footer";

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* HERO – Proudly African */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-black to-purple-900">
        <Image
          src="/hero.jpg"
          alt="TrendZ Team"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl">
              We Are
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                TrendZ Africa
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed">
              The smartest travel & real-time news platform built in Abuja, for Africa, and the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center mt-16">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center">
                <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                <p className="text-5xl font-black text-white">54</p>
                <p className="text-gray-300 text-lg">Countries Covered</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center">
                <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-5xl font-black text-white">2.8M+</p>
                <p className="text-gray-300 text-lg">Monthly Users</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center">
                <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <p className="text-5xl font-black text-white">24/7</p>
                <p className="text-gray-300 text-lg">Real-Time Updates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
                Built in Abuja.
                <br />
                <span className="text-blue-600">Powered by Africa.</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                TrendZ was born in 2024 from a simple idea: Africans deserve a world-class platform that combines <strong>real-time news</strong> and <strong>luxury travel booking</strong> — all in one beautiful, fast, intelligent app.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                We saw millions of Nigerians and Africans searching across 10 different apps for flights, hotels, and news. We said: <em>“No more.”</em>
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                Today, TrendZ is the fastest-growing digital platform in Africa — trusted by millions from Abuja to London, Abuja to Atlanta.
              </p>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/founder.jpg"
                alt="TrendZ Team Working"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                <p className="text-white text-2xl font-bold">Meet the founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-20">
            What We Stand For
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { icon: Heart, title: "Truth First", desc: "Verified news. No rumors. No clickbait." },
              { icon: Star, title: "Luxury for All", desc: "5-star experiences at prices that make sense." },
              { icon: Globe, title: "Africa to the World", desc: "Proudly built in Nigeria, serving the globe." },
            ].map((value, i) => (
              <div key={i} className="group">
                <div className="bg-white rounded-3xl p-12 shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 border border-gray-100">
                  <value.icon className="w-20 h-20 mx-auto mb-8 text-blue-600 group-hover:scale-110 transition" />
                  <h3 className="text-3xl font-black text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-lg text-gray-600">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-20">
            Our vision coverage
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { name: "News", role: "CEO & Founder", loc: "Abuja, Nigeria", img: "/trenz.jpg" },
              { name: "Flight ", role: "Editor-in-Chief", loc: "Abuja, Nigeria", img: "/hero2.jpg" },
              { name: "Hotel reservation", role: "CTO", loc: "Abuja, Nigeria", img: "/hero.jpg" },
            ].map((person) => (
              <div key={person.name} className="group">
                <div className="relative overflow-hidden rounded-3xl">
                  <Image
                    src={person.img}
                    alt={person.name}
                    width={400}
                    height={500}
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition delay-100">
                    <p className="text-2xl font-black">{person.name}</p>
                    <p className="text-cyan-400 font-bold">{person.role}</p>
                    <p className="text-sm flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4" /> {person.loc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            Join The Movement
          </h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto">
            Be part of Africa’s smartest travel & news revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link
              href="/news"
              className="group bg-white text-blue-600 font-black text-xl px-16 py-7 rounded-3xl shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all flex items-center justify-center gap-4"
            >
              <Newspaper className="w-8 h-8" />
              Read Latest News
              <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition" />
            </Link>
            <Link
              href="/flights"
              className="group bg-transparent border-4 border-white text-white font-black text-xl px-16 py-7 rounded-3xl hover:bg-white/10 transition-all flex items-center justify-center gap-4"
            >
              Book Your Next Trip
              <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}