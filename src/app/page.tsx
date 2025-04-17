'use client';

import React from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileCheck, FileEdit, Sparkles, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <NavBar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="space-y-6 lg:w-1/2">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-950/30 text-purple-400 border border-purple-800/50 mb-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">AI-Powered Resume Enhancement</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400">
                  Craft the Perfect Resume with AI
                </h1>
                <p className="text-xl text-gray-300 max-w-[600px]">
                  Our AI-powered tools analyze your resume, provide personalized feedback, and help you build a professional resume that stands out in today&#39;s competitive job market.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg shadow-purple-600/20 px-6">
                    <Link href="/builder">
                      Build Resume <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-950/50 rounded-lg hover:text-white">
                    <Link href="/review">
                      Review My Resume <FileCheck className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-xl blur-xl"></div>
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-30"></div>
                  <div className="relative overflow-hidden rounded-xl border border-gray-800">
                    <Image 
                      src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop" 
                      alt="Resume Builder" 
                      className="rounded-xl max-w-full h-auto hover:scale-105 transition-transform duration-700" 
                      width={600}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gray-900/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-purple-400">10,000+</p>
                <p className="text-gray-400">Resumes Created</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-teal-400">85%</p>
                <p className="text-gray-400">Interview Success</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-blue-400">200+</p>
                <p className="text-gray-400">Industries Covered</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-pink-400">98%</p>
                <p className="text-gray-400">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 inline-block mb-4">How Our AI Helps You</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Leverage the power of AI to transform your job application process</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-900/20">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-3 rounded-lg mb-6 inline-flex group-hover:scale-110 transition-transform duration-300">
                  <FileEdit className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">AI Resume Builder</h3>
                <p className="text-gray-400">Build a professional resume with our AI-guided templates and smart content suggestions tailored to your industry.</p>
              </div>
              <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-900/20">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-lg mb-6 inline-flex group-hover:scale-110 transition-transform duration-300">
                  <FileCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Resume Analysis</h3>
                <p className="text-gray-400">Get instant feedback on your resume with detailed suggestions for improvement and industry-specific recommendations.</p>
              </div>
              <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-teal-900/20">
                <div className="bg-gradient-to-br from-teal-500 to-teal-700 p-3 rounded-lg mb-6 inline-flex group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">ATS Optimization</h3>
                <p className="text-gray-400">Ensure your resume passes Applicant Tracking Systems with our AI optimization tools that highlight key keywords and skills.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-950">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Simple 3-Step Process</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Getting your perfect resume has never been easier</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-purple-800/20 flex items-center justify-center border border-purple-600 z-10">
                  <span className="text-xl font-bold text-purple-400">1</span>
                </div>
                <div className="pl-16 mt-2">
                  <h3 className="text-xl font-semibold text-white mb-2">Upload or Create</h3>
                  <p className="text-gray-400">Upload your existing resume or start fresh with our templates</p>
                </div>
                <div className="absolute h-full w-0.5 bg-gradient-to-b from-purple-600 to-transparent left-6 top-12 md:block hidden"></div>
              </div>
              <div className="relative mt-6 md:mt-0">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-blue-800/20 flex items-center justify-center border border-blue-600 z-10">
                  <span className="text-xl font-bold text-blue-400">2</span>
                </div>
                <div className="pl-16 mt-2">
                  <h3 className="text-xl font-semibold text-white mb-2">AI Analysis</h3>
                  <p className="text-gray-400">Our AI reviews your resume and provides actionable feedback</p>
                </div>
                <div className="absolute h-full w-0.5 bg-gradient-to-b from-blue-600 to-transparent left-6 top-12 md:block hidden"></div>
              </div>
              <div className="relative mt-6 md:mt-0">
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-teal-800/20 flex items-center justify-center border border-teal-600 z-10">
                  <span className="text-xl font-bold text-teal-400">3</span>
                </div>
                <div className="pl-16 mt-2">
                  <h3 className="text-xl font-semibold text-white mb-2">Download & Apply</h3>
                  <p className="text-gray-400">Export your optimized resume in multiple formats</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-white">Success Stories</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">See how our AI-powered resume tools have helped job seekers land their dream positions</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "The AI feedback transformed my resume. I got three interview calls within a week of updating it!",
                  author: "Michael T.",
                  role: "Software Developer",
                  color: "purple"
                },
                {
                  quote: "I was struggling with how to present my career gap. The AI suggestions helped me frame it positively.",
                  author: "Sarah L.",
                  role: "Marketing Manager",
                  color: "blue"
                },
                {
                  quote: "As a recent graduate, I had no idea how to build a resume. This tool made it incredibly simple.",
                  author: "James K.",
                  role: "Computer Science Graduate",
                  color: "teal"
                }
              ].map((testimonial, index) => (
                <div key={index} className={`bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-${testimonial.color}-500/50 transition-all duration-300 relative group`}>
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-${testimonial.color}-600/0 to-${testimonial.color}-600/0 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <svg className="h-10 w-10 text-gray-600 mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8c-2.2 0-4 1.8-4 4v10c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4v-10c0-2.2-1.8-4-4-4h-10zM10.5 12h3c0.3 0 0.5 0.2 0.5 0.5v3c0 0.3-0.2 0.5-0.5 0.5h-3c-0.3 0-0.5-0.2-0.5-0.5v-3c0-0.3 0.2-0.5 0.5-0.5zM16.5 12h3c0.3 0 0.5 0.2 0.5 0.5v3c0 0.3-0.2 0.5-0.5 0.5h-3c-0.3 0-0.5-0.2-0.5-0.5v-3c0-0.3 0.2-0.5 0.5-0.5zM10.5 18h3c0.3 0 0.5 0.2 0.5 0.5v3c0 0.3-0.2 0.5-0.5 0.5h-3c-0.3 0-0.5-0.2-0.5-0.5v-3c0-0.3 0.2-0.5 0.5-0.5zM16.5 18h3c0.3 0 0.5 0.2 0.5 0.5v3c0 0.3-0.2 0.5-0.5 0.5h-3c-0.3 0-0.5-0.2-0.5-0.5v-3c0-0.3 0.2-0.5 0.5-0.5z"></path>
                    </svg>
                    <p className="italic text-gray-300 mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full bg-${testimonial.color}-900 flex items-center justify-center text-${testimonial.color}-400 font-bold text-xl mr-4`}>
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.author}</p>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mx-auto max-w-4xl relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-30 blur-lg"></div>
              <div className="relative bg-gray-800 rounded-xl p-8 md:p-12 border border-gray-700">
                <div className="absolute right-4 top-4 w-20 h-20 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-2xl"></div>
                <div className="absolute left-4 bottom-4 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-teal-500/20 rounded-full blur-2xl"></div>
                <div className="text-center relative">
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Resume?</h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                    Join thousands of job seekers who have improved their chances with our AI-powered resume tools.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-lg shadow-purple-600/20 px-8 py-6 text-lg">
                      <Link href="/builder">Build a New Resume</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white/20 text-black hover:text-white hover:bg-gray-700/50 rounded-lg px-8 py-6 text-lg">
                      <Link href="/review">Review My Current Resume</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;