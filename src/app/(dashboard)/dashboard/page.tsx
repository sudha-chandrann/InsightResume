'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Download, 
  Edit, 
  Trash2, 
  Plus, 
  FileText, 
  BarChart3, 
  ArrowUp, 
  ArrowRight, 
  FilePenLine,
  FileCheck,
  Briefcase,
  Star
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';

type Resume = {
  id: string;
  name: string;
  version: number;
  lastUpdated: string;
  thumbnail: string;
  score: number;
};

const mockResumes: Resume[] = [
  {
    id: '1',
    name: 'Software Developer Resume',
    version: 3,
    lastUpdated: '2023-05-10',
    thumbnail: '/api/placeholder/400/240',
    score: 82
  },
  {
    id: '2',
    name: 'UX Designer CV',
    version: 1,
    lastUpdated: '2023-06-21',
    thumbnail: '/api/placeholder/400/240',
    score: 76
  },
  {
    id: '3',
    name: 'Marketing Position - Google',
    version: 2,
    lastUpdated: '2023-07-05',
    thumbnail: '/api/placeholder/400/240',
    score: 88
  }
];

const activityData = [
  { date: 'May 1', score: 65 },
  { date: 'May 15', score: 68 },
  { date: 'Jun 1', score: 72 },
  { date: 'Jun 15', score: 74 },
  { date: 'Jul 1', score: 78 },
  { date: 'Jul 15', score: 82 },
];

const keywordData = [
  { name: 'JavaScript', count: 12 },
  { name: 'React', count: 10 },
  { name: 'Node.js', count: 8 },
  { name: 'TypeScript', count: 5 },
  { name: 'CSS', count: 4 },
  { name: 'HTML', count: 3 },
];

const Dashboard = () => {
  const [resumes, setResumes] = useState<Resume[]>(mockResumes);
  const { toast } = useToast();

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter(resume => resume.id !== id));
    toast({
      title: "Resume Deleted",
      description: "The resume has been deleted successfully.",
    });
  };

  return (
    <div className="min-h-screen">
      <main className="py-8 relative z-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">My Dashboard</h1>
              <p className="text-gray-400">Manage your resumes and track your progress.</p>
            </div>
            <div className="flex gap-2">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                <Link href="/builder" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Resume
                </Link>
              </Button>
              <Button variant="outline" className="border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:text-white">
                <Link href="/review" className="flex items-center">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Review Resume
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-900/70 border-gray-800 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-purple-900/50 p-3 rounded-full mr-4">
                    <FileText className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Resumes</p>
                    <h3 className="text-2xl font-bold text-white">{resumes.length}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/70 border-gray-800 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-blue-900/50 p-3 rounded-full mr-4">
                    <BarChart3 className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Average Score</p>
                    <h3 className="text-2xl font-bold text-white">
                      {resumes.length > 0 
                        ? Math.round(resumes.reduce((sum, resume) => sum + resume.score, 0) / resumes.length) 
                        : 0}%
                    </h3>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center text-green-400 text-sm">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>12%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/70 border-gray-800 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="bg-indigo-900/50 p-3 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Job Applications</p>
                    <h3 className="text-2xl font-bold text-white">7</h3>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center text-indigo-400 text-sm cursor-pointer">
                      <span>View all</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="resumes" className="mb-8">
            <TabsList className="w-full grid grid-cols-2 mb-6 bg-gray-900 border border-gray-800">
              <TabsTrigger 
                value="resumes" 
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-purple-400 text-gray-400"
              >
                My Resumes
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-purple-400 text-gray-400"
              >
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="resumes" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <Card key={resume.id} className="overflow-hidden bg-gray-900/70 border-gray-800 transition-all duration-300 hover:shadow-purple-900/10 hover:shadow-lg">
                    <div 
                      className="h-40 bg-cover bg-center flex justify-end items-start p-3"
                      style={{ backgroundImage: `url(${resume.thumbnail})` }}
                    >
                      <div className="bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-white flex items-center shadow-sm">
                        <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
                        <span className="text-yellow-300">{resume.score}</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1 text-gray-100">{resume.name}</h3>
                      <div className="flex justify-between text-sm text-gray-400 mb-4">
                        <span>Version {resume.version}</span>
                        <span>Updated {resume.lastUpdated}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button asChild size="sm" variant="outline" className="flex-1 border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:text-white">
                          <Link href="/builder">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:text-white">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="px-2 border-gray-700 bg-gray-900/50 hover:bg-red-950/50 hover:border-red-800/50 transition-colors"
                          onClick={() => handleDeleteResume(resume.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-400 hover:text-red-300" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="flex items-center justify-center h-full min-h-[280px] border-dashed border-gray-700 bg-gray-900/30 hover:bg-gray-900/50 transition-all duration-300">
                  <div className="text-center p-6">
                    <div className="bg-gray-800 rounded-full p-3 inline-block mb-3">
                      <Plus className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-100">Create New Resume</h3>
                    <p className="text-sm text-gray-400 mb-4">Build a professional resume with our AI-powered tools.</p>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                      <Link href="/builder" className="flex items-center">
                        <Plus className="h-4 w-4 mr-1" />
                        Create Resume
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900/70 border-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-100">Resume Score Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={activityData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="date" stroke="#9CA3AF" />
                          <YAxis domain={[0, 100]} stroke="#9CA3AF" />
                          <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#E5E7EB' }} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#8B5CF6"
                            activeDot={{ r: 8, fill: '#A78BFA' }}
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900/70 border-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-100">Top Keywords</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={keywordData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis type="number" stroke="#9CA3AF" />
                          <YAxis dataKey="name" type="category" width={80} stroke="#9CA3AF" />
                          <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#E5E7EB' }} />
                          <Legend />
                          <Bar dataKey="count" fill="#4C1D95" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2 bg-gray-900/70 border-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-100">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { 
                          icon: <FilePenLine className="h-5 w-5 text-blue-400" />, 
                          text: "Updated 'Software Developer Resume'", 
                          date: "Today, 2:30 PM" 
                        },
                        { 
                          icon: <FileCheck className="h-5 w-5 text-green-400" />, 
                          text: "ATS Score improved by 12%", 
                          date: "Yesterday, 4:15 PM" 
                        },
                        { 
                          icon: <FileText className="h-5 w-5 text-purple-400" />, 
                          text: "Created 'UX Designer CV'", 
                          date: "Jun 21, 2023" 
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start bg-gray-800/40 p-3 rounded-lg hover:bg-gray-800/60 transition-colors">
                          <div className="bg-gray-800 p-2 rounded-full mr-3">
                            {item.icon}
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium text-gray-200">{item.text}</p>
                            <p className="text-sm text-gray-400">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;