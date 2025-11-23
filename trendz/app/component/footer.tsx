'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Globe, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/90 border-t border-cyan-900/30 ">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-around ">
          {/* Brand + Description */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-3xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Trend
                </span>
                <span className="text-white">Z</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your gateway to global news, luxury stays, and seamless flights — all powered by real-time intelligence.
            </p>

            <div className="flex gap-4 mt-8">
              <a href="https://x.com/okotochris" target="_blank" className="text-gray-500 hover:text-cyan-400 transition">
                <Twitter size={20} />
              </a>
              {/* <a href="#" className="text-gray-500 hover:text-cyan-400 transition">
                <Instagram size={20} />
              </a> */}
              <a href="https://facebook.com/trendzbykate" target="_blank" className="text-gray-500 hover:text-cyan-400 transition">
                <Facebook size={20} />
              </a>
             
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">Explore</h3>
            <ul className="space-y-3">
              {['Home', 'News', 'Hotels', 'Flights', 'Destinations', 'About Us'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-cyan-400 text-sm transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-5">Stay Connected</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-cyan-400" />
                 info@trendz.ng 
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-cyan-400" />
                +234 707 747 6027
              </p>
              <p className="flex items-center gap-3">
                <Globe size={16} className="text-cyan-400" />
                Abuja • London • New York
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs text-gray-500 mb-3">Subscribe for exclusive updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/5 border border-cyan-900/50 rounded-l-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 w-full"
                />
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 rounded-r-lg text-sm font-medium transition">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-cyan-900/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2020 TrendZ. All rights reserved.</p>
          <p>Made with <span className="text-cyan-400">▲</span> in Abuja, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}