'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, ChevronRight, LayoutDashboard, FileEdit, FileCheck2 } from 'lucide-react';
import Link from 'next/link';

interface NavBarProps {
  currentPath: string;
}

const NavBar: React.FC<NavBarProps> = ({ currentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { path: '/builder', label: 'Resume Builder', icon: <FileEdit size={16} /> },
    { path: '/review', label: 'Resume Review', icon: <FileCheck2 size={16} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => currentPath === path;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-gray-950'
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
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 font-medium transition-colors relative group ${
                  isActive(item.path) 
                    ? 'text-purple-400' 
                    : 'text-gray-300 hover:text-purple-400'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-purple-500 transition-all duration-300 ${
                  isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 animate-slide-in">
            <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 shadow-xl shadow-black/20">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-4 py-3 rounded-lg flex justify-between items-center ${
                      isActive(item.path)
                        ? 'bg-purple-900/50 text-purple-300'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={18} className={isActive(item.path) ? "text-purple-400" : "text-gray-500"} />
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavBar;