'use client';
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Sparkles, 
  Download
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const ResumeReview = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileContent, setFileContent] = useState<string | null>(null);
  const { toast } = useToast();

  const [feedback, setFeedback] = useState<{
    overallScore: number;
    sections: {
      content: {
        score: number;
        feedback: string[];
        improvements: string[];
      };
      format: {
        score: number;
        feedback: string[];
        improvements: string[];
      };
      ats: {
        score: number;
        feedback: string[];
        improvements: string[];
      };
    };
    keywords: string[];
    missingKeywords: string[];
  }>({
    overallScore: 0,
    sections: {
      content: {
        score: 0,
        feedback: [],
        improvements: [],
      },
      format: {
        score: 0,
        feedback: [],
        improvements: [],
      },
      ats: {
        score: 0,
        feedback: [],
        improvements: [],
      },
    },
    keywords: [],
    missingKeywords: [],
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      
      // Read file content for PDF or DOCX
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setFileContent(e.target.result);
        }
      };
      reader.readAsText(files[0]);
      
      toast({
        title: "File Uploaded",
        description: `${files[0].name} has been uploaded successfully.`,
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      
      // Read file content for PDF or DOCX
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setFileContent(e.target.result);
        }
      };
      reader.readAsText(files[0]);
      
      toast({
        title: "File Uploaded",
        description: `${files[0].name} has been uploaded successfully.`,
      });
    }
  };

  const removeFile = () => {
    setFile(null);
    setFileContent(null);
    setAnalysisComplete(false);
  };

  const analyzeResume = () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please upload a resume to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Mock analysis process
    setTimeout(() => {
      // This would be replaced with a real API call to an AI service
      
      // Mock AI analysis results
      const mockFeedback = {
        overallScore: 72,
        sections: {
          content: {
            score: 68,
            feedback: [
              "Your professional summary could be more impactful.",
              "Work experience lacks quantifiable achievements.",
              "Education section is well-structured."
            ],
            improvements: [
              "Add metrics to demonstrate your impact (e.g., 'Increased sales by 25%').",
              "Use stronger action verbs at the beginning of each bullet point.",
              "Include more specific technical skills relevant to your target role."
            ]
          },
          format: {
            score: 85,
            feedback: [
              "Resume layout is clean and professional.",
              "Font sizes and spacing are appropriate.",
              "Section headings should be more prominent for better scannability."
            ],
            improvements: [
              "Consider using a single-column format for better ATS compatibility.",
              "Add more white space between sections for improved readability.",
              "Ensure consistent formatting of dates and locations."
            ]
          },
          ats: {
            score: 64,
            feedback: [
              "Missing several keywords relevant to your target job.",
              "Some formatting may cause issues with ATS parsing.",
              "Contact information is clearly presented."
            ],
            improvements: [
              "Include these keywords: JavaScript, React, Node.js, TypeScript, API.",
              "Remove tables, headers, footers, and graphic elements.",
              "Use standard section headings like 'Experience' and 'Education'."
            ]
          }
        },
        keywords: ["software", "development", "communication", "team", "project"],
        missingKeywords: ["JavaScript", "React", "Node.js", "TypeScript", "API"]
      };
      
      setFeedback(mockFeedback);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully.",
      });
    }, 3000);
  };

  const downloadImprovedResume = () => {
    toast({
      title: "Generating Improved Resume",
      description: "Your improved resume is being prepared...",
    });
    
    setTimeout(() => {
      toast({
        title: "Resume Ready",
        description: "Your improved resume has been downloaded.",
      });
    }, 2000);
  };

  return (

      <main className="flex-grow py-8">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-resume-secondary mb-2">Resume Review</h1>
            <p className="text-gray-600">Get AI-powered feedback on your existing resume.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
            {/* Upload Section */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div 
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        file ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-resume-primary'
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {file ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center">
                            <FileText className="h-10 w-10 text-green-500" />
                          </div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                            onClick={removeFile}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center">
                            <Upload className="h-10 w-10 text-gray-400" />
                          </div>
                          <p className="text-sm font-medium">Drag and drop your resume here</p>
                          <p className="text-xs text-gray-500">Supports PDF, DOCX, or TXT files (max 5MB)</p>
                          <div className="mt-4">
                            <label 
                              htmlFor="file-upload" 
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Browse Files
                              <input 
                                id="file-upload" 
                                type="file" 
                                className="sr-only" 
                                accept=".pdf,.docx,.doc,.txt" 
                                onChange={handleFileUpload}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-resume-primary hover:bg-resume-secondary "
                      disabled={!file || isAnalyzing}
                      onClick={analyzeResume}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                    </Button>
                    
                    {isAnalyzing && (
                      <div className="space-y-2">
                        <p className="text-sm text-center">Analyzing your resume with AI...</p>
                        <Progress value={45} className="h-2" />
                      </div>
                    )}
                    
                    {analysisComplete && (
                      <div className="bg-resume-accent rounded-lg p-4">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          Analysis Complete
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Your resume&lsquo;s overall score is {feedback.overallScore}/100.
                        </p>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={downloadImprovedResume}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Improved Resume
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Results Section */}
            <div className="lg:col-span-2">
              {analysisComplete ? (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-resume-secondary mb-4">Resume Feedback</h2>
                    
                    <div className="mb-6">
                      <div className="flex items-end mb-2">
                        <h3 className="font-semibold">Overall Score: {feedback.overallScore}/100</h3>
                        <span className="text-sm text-gray-500 ml-2">
                          ({feedback.overallScore < 60 ? 'Needs Improvement' : 
                            feedback.overallScore < 80 ? 'Good' : 'Excellent'})
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            feedback.overallScore < 60 ? 'bg-red-500' : 
                            feedback.overallScore < 80 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${feedback.overallScore}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <Tabs defaultValue="content">
                      <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="format">Format</TabsTrigger>
                        <TabsTrigger value="ats">ATS Compatibility</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="content">
                        <div className="space-y-4 py-2">
                          <div>
                            <div className="flex items-end mb-2">
                              <h3 className="font-semibold">Content Score: {feedback.sections.content.score}/100</h3>
                              <span className="text-sm text-gray-500 ml-2">
                                ({feedback.sections.content.score < 60 ? 'Needs Improvement' : 
                                  feedback.sections.content.score < 80 ? 'Good' : 'Excellent'})
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                              <div 
                                className={`h-2 rounded-full ${
                                  feedback.sections.content.score < 60 ? 'bg-red-500' : 
                                  feedback.sections.content.score < 80 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${feedback.sections.content.score}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Feedback:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {feedback.sections.content.feedback.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Suggested Improvements:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {feedback.sections.content.improvements.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="format">
                        <div className="space-y-4 py-2">
                          <div>
                            <div className="flex items-end mb-2">
                              <h3 className="font-semibold">Format Score: {feedback.sections.format.score}/100</h3>
                              <span className="text-sm text-gray-500 ml-2">
                                ({feedback.sections.format.score < 60 ? 'Needs Improvement' : 
                                  feedback.sections.format.score < 80 ? 'Good' : 'Excellent'})
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                              <div 
                                className={`h-2 rounded-full ${
                                  feedback.sections.format.score < 60 ? 'bg-red-500' : 
                                  feedback.sections.format.score < 80 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${feedback.sections.format.score}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Feedback:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {feedback.sections.format.feedback.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Suggested Improvements:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {feedback.sections.format.improvements.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="ats">
                        <div className="space-y-4 py-2">
                          <div>
                            <div className="flex items-end mb-2">
                              <h3 className="font-semibold">ATS Compatibility: {feedback.sections.ats.score}/100</h3>
                              <span className="text-sm text-gray-500 ml-2">
                                ({feedback.sections.ats.score < 60 ? 'Needs Improvement' : 
                                  feedback.sections.ats.score < 80 ? 'Good' : 'Excellent'})
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                              <div 
                                className={`h-2 rounded-full ${
                                  feedback.sections.ats.score < 60 ? 'bg-red-500' : 
                                  feedback.sections.ats.score < 80 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${feedback.sections.ats.score}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Feedback:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {feedback.sections.ats.feedback.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Suggested Improvements:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {feedback.sections.ats.improvements.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-resume-accent p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              <h4 className="font-medium">Keywords Found</h4>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {feedback.keywords.map((keyword, index) => (
                                <span 
                                  key={index} 
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center mb-2">
                              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                              <h4 className="font-medium">Missing Keywords</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {feedback.missingKeywords.map((keyword, index) => (
                                <span 
                                  key={index} 
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg p-8 border border-dashed border-gray-300">
                  <div className="text-center max-w-md">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-black/60 mb-2">Upload Your Resume to Get Started</h3>
                    <p className="text-gray-600 mb-6">
                      Our AI will analyze your resume for content quality, formatting, and ATS compatibility. 
                      You&apos;ll receive personalized feedback and improvement suggestions.
                    </p>
                    <div className="space-y-4 text-black/60">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-resume-primary rounded-full p-1 text-white">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <p className="ml-3 text-sm text-left">Detailed scoring of your resume content</p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-resume-primary rounded-full p-1 text-white">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <p className="ml-3 text-sm text-left">ATS compatibility check</p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-resume-primary rounded-full p-1 text-white">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <p className="ml-3 text-sm text-left">Keyword optimization suggestions</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

  );
};

export default ResumeReview;
