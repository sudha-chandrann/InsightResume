'use client';

import Link from 'next/link';
import { FileText, Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">


        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">InsightResume</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered resume builder and review tool to help you land your dream job.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Features</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/builder" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/review" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  Resume Review
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/ats-checker" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  ATS Checker
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  Resume Templates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  Career Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  Job Search Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  Interview Guides
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} InsightResume. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;