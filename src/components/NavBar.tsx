'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import Link from 'next/link';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/10' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gray-900 rounded-full p-2">
                <FileText className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>
            </div>
            <span className="font-bold text-xl text-white">InsightResume</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/register"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-5 py-2 rounded-lg shadow-md shadow-purple-900/20 font-medium transition-all"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="border border-purple-500/50 hover:border-purple-400 text-white px-5 py-2 rounded-lg hover:bg-purple-500/10 font-medium transition-all"
            >
              Sign In
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-slide-in">
            <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 shadow-xl shadow-black/20">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg text-center font-medium transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="border border-purple-500/50 hover:border-purple-400 text-white px-4 py-3 rounded-lg text-center hover:bg-purple-500/10 font-medium transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;