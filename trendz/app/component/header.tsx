'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'News', href: '/news' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Flights', href: '/flight' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="border-b border-cyan-900/30 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-5">
       
        <Link href="/" className="group">
          <h1 className=" flex items-center justify-center text-2xl font-black tracking-tight">
             <img src="/logo.jpg" height="30px" width="50px" />
            <span className="pl-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-500">
              Trend
            </span>
            <span className="text-white">Z</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  relative text-sm font-medium transition-all duration-300
                  ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}
                `}
              >
                {item.name}

                {/* Active indicator */}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full" />
                )}

                {/* Hover underline */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400/50 rounded-full transition-all duration-500 hover:w-full" />
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white transition"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cyan-900/30 bg-black/90 backdrop-blur-xl">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-all duration-300 ${
                    isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && <span className="ml-3 text-cyan-400">●</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;