"use client";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  UserRound,
  GraduationCap,
  Briefcase,
  Code,
  Code2,
  Download,
  Trash2,
  PlusCircle,
  Sparkles,
  Trophy,
  Link as LinkIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import ResumePreview from "../_components/ResumePreview";

type FormValues = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
  };
  education: Array<{
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    CGPA: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    bulletPoints: string[];
  }>;
  projects: Array<{
    id: string;
    title: string;
    liveLink: string;
    bulletPoints: string[];
  }>;
  positions: Array<{
    id: string;
    title: string;
    organization: string;
    startDate: string;
    endDate: string;
    bulletPoints: string[];
  }>;
  skills: Array<{
    id: string;
    category: string;
    name: string;
  }>;
};

const defaultValues: FormValues = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: "",
  },
  education: [
    {
      id: "1",
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      CGPA: "",
    },
  ],
  experience: [
    {
      id: "1",
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      bulletPoints: [""], 
    },
  ],
  projects: [
    {
      id: "1",
      title: "",
      liveLink: "",
      bulletPoints: [""],
    },
  ],
  positions: [
    {
      id: "1",
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      bulletPoints: [""],
    },
  ],
  skills: [
    {
      id: "1",
      category: "Programming Languages",
      name: "",
    },
  ],
};

const skillCategories = [
  "Programming Languages",
  "Frameworks & Libraries",
  "Tools & Technologies",
  "Soft Skills",
  "Languages",
  "Other",
];

const ResumeBuilder = () => {
  const [formData, setFormData] = useState<FormValues>(defaultValues);
  const [activeTab, setActiveTab] = useState("personal");
  const [resumeTemplate, setResumeTemplate] = useState("modern");
  const { toast } = useToast();

  const updatePersonalInfo = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Math.random().toString(36).substr(2, 9),
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          CGPA: "",
        },
      ],
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Math.random().toString(36).substr(2, 9),
          title: "",
          liveLink: "",
          bulletPoints: [""],
        },
      ],
    }));
  };

  const updateProject = (
    id: string,
    field: string,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const removeProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  const addBulletPoint = (section: "projects" | "experience" |"positions", id: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id
          ? {
              ...item,
              bulletPoints: [...item.bulletPoints, ""],
            }
          : item
      ),
    }));
  };

  const updateBulletPoint = (
    section: "projects" | "experience"|"positions",
    id: string,
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id
          ? {
              ...item,
              bulletPoints: item.bulletPoints.map((point, i) =>
                i === index ? value : point
              ),
            }
          : item
      ),
    }));
  };

  const removeBulletPoint = (
    section: "projects" | "experience" | "positions",
    id: string,
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id
          ? {
              ...item,
              bulletPoints:
                item.bulletPoints.length > 1
                  ? item.bulletPoints.filter((_, i) => i !== index)
                  : [""], // Keep at least one bullet point
            }
          : item
      ),
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Math.random().toString(36).substr(2, 9),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          bulletPoints: [""], // Add the bulletPoints property with an empty array
        },
      ],
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addPosition = () => {
    setFormData((prev) => ({
      ...prev,
      positions: [
        ...prev.positions,
        {
          id: Math.random().toString(36).substr(2, 9),
          title: "",
          organization: "",
          startDate: "",
          endDate: "",
          bulletPoints: [""], 
        },
      ],
    }));
  };

  const updatePosition = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      positions: prev.positions.map((pos) =>
        pos.id === id ? { ...pos, [field]: value } : pos
      ),
    }));
  };

  const removePosition = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      positions: prev.positions.filter((pos) => pos.id !== id),
    }));
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: Math.random().toString(36).substr(2, 9),
          category: "Programming Languages",
          name: "",
          level: "Intermediate",
        },
      ],
    }));
  };

  const updateSkill = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const generateAISuggestions = (
    section: string,
    id?: string,
    index?: number
  ) => {
    toast({
      title: "AI Assistant",
      description: "Generating suggestions for your resume...",
    });

    setTimeout(() => {
      if (section === "summary") {
        const suggestions =
          "Results-driven software engineer with over 5 years of experience developing robust applications in JavaScript and React. Passionate about creating clean, efficient code and optimizing user experiences.";
        updatePersonalInfo("summary", suggestions);
      } else if (section === "position" && id) {
        const suggestions =
          "Led a team of 5 developers in implementing the company's new e-commerce platform. Reduced page load time by 40% and increased conversion rates by 25%. Organized weekly code reviews and mentored 2 junior developers.";
        updatePosition(id, "achievements", suggestions);
      } else if (section === "experience" && id && index !== undefined) {
        // For bullet points in experience
        const suggestions = [
          "Developed and maintained multiple web applications using React and TypeScript",
          "Implemented responsive design principles and improved application performance by 35%",
          "Collaborated with UX designers to create intuitive user interfaces",
          "Optimized database queries resulting in 50% faster load times",
          "Implemented CI/CD pipelines using GitHub Actions",
        ];
        const randomSuggestions = suggestions[index % suggestions.length];
        updateBulletPoint("experience", id, index, randomSuggestions);
      } else if (section === "experience" && id) {
        // For description in experience (legacy support)
        const suggestions =
          "Developed and maintained multiple web applications using React and TypeScript. Implemented responsive design principles and improved application performance by 35%. Collaborated with UX designers to create intuitive user interfaces.";
        updateExperience(id, "description", suggestions);
      } else if (section === "education" && id) {
        const suggestions =
          "Graduated with honors. Key coursework included: Data Structures, Algorithms, Web Development, and Database Management. Active member of Computer Science Society and participated in annual hackathon events.";
        updateEducation(id, "description", suggestions);
      } else if (section === "project" && id && index !== undefined) {
        // For bullet points in projects
        const suggestions = [
          "Built a responsive web application using React, Redux, and TypeScript",
          "Implemented user authentication using JWT tokens and Firebase",
          "Created a custom CMS with a drag-and-drop interface for content management",
          "Integrated third-party APIs for payment processing and user analytics",
          "Achieved 95% test coverage with Jest and React Testing Library",
        ];
        const randomSuggestion = suggestions[index % suggestions.length];
        updateBulletPoint("projects", id, index, randomSuggestion);
      }

      toast({
        title: "AI Suggestions Ready",
        description: "Your resume has been updated with AI recommendations.",
      });
    }, 1500);
  };

  const exportResume = () => {
    toast({
      title: "Resume Export",
      description: "Your resume is being prepared for download...",
    });

    setTimeout(() => {
      toast({
        title: "Resume Ready",
        description: "Your resume has been downloaded successfully.",
      });
    }, 1500);
  };

  return (
    <main className="flex-grow py-8 bg-gray-900 text-gray-100 min-h-screen">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">
            Resume Builder
          </h1>
          <p className="text-gray-400">
            Create a professional resume with our AI-powered builder.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 ">
          {/* Form Section */}
          <div className="lg:w-1/2 mx-auto">
            <Tabs
              defaultValue="personal"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-6 bg-gray-800">
                <TabsTrigger
                  value="personal"
                  className="flex items-center gap-1 data-[state=active]:bg-gray-700"
                >
                  <UserRound className="h-4 w-4" />
                  <span className="hidden sm:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="flex items-center gap-1 data-[state=active]:bg-gray-700"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="flex items-center gap-1 data-[state=active]:bg-gray-700"
                >
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="flex items-center gap-1 data-[state=active]:bg-gray-700"
                >
                  <Code2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Projects</span>
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="flex items-center gap-1 data-[state=active]:bg-gray-700"
                >
                  <Code className="h-4 w-4" />
                  <span className="hidden sm:inline">Skills</span>
                </TabsTrigger>
                <TabsTrigger
                  value="positions"
                  className="flex items-center gap-1 data-[state=active]:bg-gray-700"
                >
                  <Trophy className="h-4 w-4" />
                  <span className="hidden sm:inline">Leadership</span>
                </TabsTrigger>
              </TabsList>

              <Card className="mt-4 border-t-0 rounded-t-none bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <ScrollArea className="h-[calc(100vh-350px)]">
                    
                    <TabsContent value="personal" className="space-y-4 mt-0">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="fullName" className="text-gray-300">
                            Full Name
                          </Label>
                          <Input
                            id="fullName"
                            placeholder="John Doe"
                            value={formData.personalInfo.fullName}
                            onChange={(e) =>
                              updatePersonalInfo("fullName", e.target.value)
                            }
                            className="bg-gray-700 border-gray-600 text-gray-100"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email" className="text-gray-300">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              value={formData.personalInfo.email}
                              onChange={(e) =>
                                updatePersonalInfo("email", e.target.value)
                              }
                              className="bg-gray-700 border-gray-600 text-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-gray-300">
                              Phone
                            </Label>
                            <Input
                              id="phone"
                              placeholder="(123) 456-7890"
                              value={formData.personalInfo.phone}
                              onChange={(e) =>
                                updatePersonalInfo("phone", e.target.value)
                              }
                              className="bg-gray-700 border-gray-600 text-gray-100"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="location" className="text-gray-300">
                              Location
                            </Label>
                            <Input
                              id="location"
                              placeholder="New York, NY"
                              value={formData.personalInfo.location}
                              onChange={(e) =>
                                updatePersonalInfo("location", e.target.value)
                              }
                              className="bg-gray-700 border-gray-600 text-gray-100"
                            />
                          </div>
                          <div>
                            <Label htmlFor="title" className="text-gray-300">
                              Job Title
                            </Label>
                            <Input
                              id="title"
                              placeholder="Software Developer"
                              value={formData.personalInfo.title}
                              onChange={(e) =>
                                updatePersonalInfo("title", e.target.value)
                              }
                              className="bg-gray-700 border-gray-600 text-gray-100"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label htmlFor="summary" className="text-gray-300">
                              Professional Summary
                            </Label>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                              onClick={() => generateAISuggestions("summary")}
                            >
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI Suggestion
                            </Button>
                          </div>
                          <Textarea
                            id="summary"
                            placeholder="A brief summary of your professional background and goals..."
                            className="min-h-[120px] bg-gray-700 border-gray-600 text-gray-100"
                            value={formData.personalInfo.summary}
                            onChange={(e) =>
                              updatePersonalInfo("summary", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="education" className="space-y-6 mt-0">
                      {formData.education.map((edu, index) => (
                        <div
                          key={edu.id}
                          className="space-y-4 pb-6 border-b border-gray-700 last:border-0"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-blue-300">
                              Education #{index + 1}
                            </h3>
                            {formData.education.length > 1 && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeEducation(edu.id)}
                                className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div>
                            <Label
                              htmlFor={`school-${edu.id}`}
                              className="text-gray-300"
                            >
                              School/University
                            </Label>
                            <Input
                              id={`school-${edu.id}`}
                              placeholder="Harvard University"
                              value={edu.school}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "school",
                                  e.target.value
                                )
                              }
                              className="bg-gray-700 border-gray-600 text-gray-100"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor={`degree-${edu.id}`}
                                className="text-gray-300"
                              >
                                Degree
                              </Label>
                              <Input
                                id={`degree-${edu.id}`}
                                placeholder="Bachelor of Science"
                                value={edu.degree}
                                onChange={(e) =>
                                  updateEducation(
                                    edu.id,
                                    "degree",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-700 border-gray-600 text-gray-100"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor={`field-${edu.id}`}
                                className="text-gray-300"
                              >
                                Field of Study
                              </Label>
                              <Input
                                id={`field-${edu.id}`}
                                placeholder="Computer Science"
                                value={edu.fieldOfStudy}
                                onChange={(e) =>
                                  updateEducation(
                                    edu.id,
                                    "fieldOfStudy",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-700 border-gray-600 text-gray-100"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor={`eduStartDate-${edu.id}`}
                                className="text-gray-300"
                              >
                                Start Date
                              </Label>
                              <Input
                                id={`eduStartDate-${edu.id}`}
                                placeholder="Sep 2018"
                                value={edu.startDate}
                                onChange={(e) =>
                                  updateEducation(
                                    edu.id,
                                    "startDate",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-700 border-gray-600 text-gray-100"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor={`eduEndDate-${edu.id}`}
                                className="text-gray-300"
                              >
                                End Date
                              </Label>
                              <Input
                                id={`eduEndDate-${edu.id}`}
                                placeholder="May 2022 (or Present)"
                                value={edu.endDate}
                                onChange={(e) =>
                                  updateEducation(
                                    edu.id,
                                    "endDate",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-700 border-gray-600 text-gray-100"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2 ">
                              <Label
                                htmlFor={`eduCGPA-${edu.id}`}
                                className="text-gray-300"
                              >
                                CGPA
                              </Label>
                            </div>
                            <Input
                              id={`eduDescription-${edu.id}`}
                              placeholder="CGPA"
                              className="bg-gray-700 border-gray-600 text-gray-100"
                              value={edu.CGPA}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "CGPA",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        onClick={addEducation}
                        className="w-full bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </TabsContent>

                    <TabsContent value="experience" className="space-y-6 mt-0">
                      {formData.experience.map((exp, index) => (
                        <div
                          key={exp.id}
                          className="space-y-4 pb-6 border-b border-gray-700 last:border-0"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-blue-300">
                              Experience #{index + 1}
                            </h3>
                            {formData.experience.length > 1 && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeExperience(exp.id)}
                                className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div>
                            <Label
                              htmlFor={`company-${exp.id}`}
                              className="text-gray-300"
                            >
                              Company
                            </Label>
                            <Input
                              id={`company-${exp.id}`}
                              placeholder="Google Inc."
                              value={exp.company}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "company",
                                  e.target.value
                                )
                              }
                              className="bg-gray-700 border-gray-600 text-gray-100"
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor={`position-${exp.id}`}
                              className="text-gray-300"
                            >
                              Position
                            </Label>
                            <Input
                              id={`position-${exp.id}`}
                              placeholder="Senior Software Engineer"
                              value={exp.position}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "position",
                                  e.target.value
                                )
                              }
                              className="bg-gray-700 border-gray-600 text-gray-100"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor={`expStartDate-${exp.id}`}
                                className="text-gray-300"
                              >
                                Start Date
                              </Label>
                              <Input
                                id={`expStartDate-${exp.id}`}
                                placeholder="Jan 2020"
                                value={exp.startDate}
                                onChange={(e) =>
                                  updateExperience(
                                    exp.id,
                                    "startDate",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-700 border-gray-600 text-gray-100"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor={`expEndDate-${exp.id}`}
                                className="text-gray-300"
                              >
                                End Date
                              </Label>
                              <Input
                                id={`expEndDate-${exp.id}`}
                                placeholder="Present"
                                value={exp.endDate}
                                onChange={(e) =>
                                  updateExperience(
                                    exp.id,
                                    "endDate",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-700 border-gray-600 text-gray-100"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-gray-300">
                                Key Responsibilities & Achievements
                              </Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  addBulletPoint("experience", exp.id)
                                }
                                className="h-8 text-xs bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                              >
                                <PlusCircle className="h-3 w-3 mr-1" />
                                Add Point
                              </Button>
                            </div>

                            {exp.bulletPoints.map((point, i) => (
                              <div key={i} className="flex items-start mb-2">
                                <div className="flex-grow">
                                  <div className="flex items-center">
                                    <span className="mr-2 text-gray-500">
                                      •
                                    </span>
                                    <Input
                                      value={point}
                                      placeholder={`Bullet point ${i + 1}`}
                                      onChange={(e) =>
                                        updateBulletPoint(
                                          "experience",
                                          exp.id,
                                          i,
                                          e.target.value
                                        )
                                      }
                                      className="bg-gray-700 border-gray-600 text-gray-100"
                                    />
                                  </div>
                                </div>
                                <div className="flex ml-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                                    onClick={() =>
                                      generateAISuggestions(
                                        "experience",
                                        exp.id,
                                        i
                                      )
                                    }
                                  >
                                    <Sparkles className="h-4 w-4" />
                                  </Button>
                                  {exp.bulletPoints.length > 1 && (
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-10 w-10 ml-1 bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
                                      onClick={() =>
                                        removeBulletPoint(
                                          "experience",
                                          exp.id,
                                          i
                                        )
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        onClick={addExperience}
                        className="w-full bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-6 mt-0">
                      {formData.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="space-y-4 flex items-center gap-4"
                        >
                          <div className="flex-grow">
                            <Label
                              htmlFor={`skillCategory-${skill.id}`}
                              className="text-gray-300"
                            >
                              Category
                            </Label>
                            <select
                              id={`skillCategory-${skill.id}`}
                              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={skill.category}
                              onChange={(e) =>
                                updateSkill(
                                  skill.id,
                                  "category",
                                  e.target.value
                                )
                              }
                            >
                              {skillCategories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex-grow">
                            <Label
                              htmlFor={`skill-${skill.id}`}
                              className="text-gray-300"
                            >
                              Skill
                            </Label>
                            <Input
                              id={`skill-${skill.id}`}
                              placeholder="JavaScript"
                              value={skill.name}
                              onChange={(e) =>
                                updateSkill(skill.id, "name", e.target.value)
                              }
                              className="bg-gray-700 border-gray-600 text-gray-100"
                            />
                          </div>

                          {formData.skills.length > 1 && (
                            <Button
                              variant="outline"
                              size="icon"
                              className="mt-8 bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
                              onClick={() => removeSkill(skill.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        onClick={addSkill}
                        className="w-full bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </TabsContent>

                    <TabsContent value="positions" className="space-y-6 mt-0">
                      {formData.positions.map((pos, index) => (
                        <div
                          key={pos.id}
                          className="space-y-4 pb-6 border-b border-gray-700 last:border-0"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-blue-300">
                              Position #{index + 1}
                            </h3>
                            {formData.positions.length > 1 && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removePosition(pos.id)}
                                className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div>
                            <Label
                              htmlFor={`posTitle-${pos.id}`}
                              className="text-gray-300"
                            >
                              Position Title
                            </Label>
                            <Input
                              id={`posTitle-${pos.id}`}
                              placeholder="Team Lead / Club President"
                              value={pos.title}
                              onChange={(e) =>
                                updatePosition(pos.id, "title", e.target.value)
                              }
                              className="bg-gray-700 border-gray-600 text-gray-100"
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor={`organization-${pos.id}`}
                              className="text-gray-300"
                            >
                              Organization
                            </Label>
                            <Input
                              id={`organization-${pos.id}`}
                              placeholder="Computer Science Club"
                              value={pos.organization}
                              onChange={(e) =>
                                updatePosition(
                                  pos.id,
                                  "organization",
                                  e.target.value
                                )
                              }
                              className="bg-gray-700 border-gray-600 text-gray-100"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor={`posStartDate-${pos.id}`}
                                className="text-gray-300"
                              >
                                Start Date
                              </Label>
                              <Input
                                id={`posStartDate-${pos.id}`}
                                placeholder="Sep 2020"
                                value={pos.startDate}
                                onChange={(e) =>
                                  updatePosition(
                                    pos.id,
                                    "startDate",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-700 border-gray-600 text-gray-100"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor={`posEndDate-${pos.id}`}
                                className="text-gray-300"
                              >
                                End Date
                              </Label>
                              <Input
                                id={`posEndDate-${pos.id}`}
                                placeholder="Present"
                                value={pos.endDate}
                                onChange={(e) =>
                                  updatePosition(
                                    pos.id,
                                    "endDate",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-700 border-gray-600 text-gray-100"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label
                                htmlFor={`achievements-${pos.id}`}
                                className="text-gray-300"
                              >
                                Achievements & Responsibilities
                              </Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  addBulletPoint("positions", pos.id)
                                }
                                className="h-8 text-xs bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                              >
                                <PlusCircle className="h-3 w-3 mr-1" />
                                Add Point
                              </Button>
                            </div>
                            {pos.bulletPoints.map((point, i) => (
                              <div key={i} className="flex items-start mb-2">
                                <div className="flex-grow">
                                  <div className="flex items-center">
                                    <span className="mr-2 text-gray-500">
                                      •
                                    </span>
                                    <Input
                                      value={point}
                                      placeholder={`Bullet point ${i + 1}`}
                                      onChange={(e) =>
                                        updateBulletPoint(
                                          "positions",
                                          pos.id,
                                          i,
                                          e.target.value
                                        )
                                      }
                                      className="bg-gray-700 border-gray-600 text-gray-100"
                                    />
                                  </div>
                                </div>
                                <div className="flex ml-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                                    onClick={() =>
                                      generateAISuggestions(
                                        "positions",
                                        pos.id,
                                        i
                                      )
                                    }
                                  >
                                    <Sparkles className="h-4 w-4" />
                                  </Button>
                                  {pos.bulletPoints.length > 1 && (
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-10 w-10 ml-1 bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
                                      onClick={() =>
                                        removeBulletPoint(
                                          "projects",
                                          pos.id,
                                          i
                                        )
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}

                          </div>
                        </div>
                      ))}

                    

                      <Button
                        variant="outline"
                        onClick={addPosition}
                        className="w-full bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Position
                      </Button>
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-6 mt-0">
                      {formData.projects.map((proj, index) => (
                        <div
                          key={proj.id}
                          className="space-y-4 pb-6 border-b border-gray-700 last:border-0"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-blue-300">
                              Project #{index + 1}
                            </h3>
                            {formData.projects.length > 1 && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeProject(proj.id)}
                                className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div>
                            <Label
                              htmlFor={`project-title-${proj.id}`}
                              className="text-gray-300"
                            >
                              Project Title
                            </Label>
                            <Input
                              id={`project-title-${proj.id}`}
                              placeholder="E-commerce Dashboard"
                              value={proj.title}
                              onChange={(e) =>
                                updateProject(proj.id, "title", e.target.value)
                              }
                              className="bg-gray-700 border-gray-600 text-gray-100"
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor={`project-link-${proj.id}`}
                              className="text-gray-300"
                            >
                              Live Preview Link
                            </Label>
                            <div className="flex">
                              <Input
                                id={`project-link-${proj.id}`}
                                placeholder="https://yourproject.com"
                                value={proj.liveLink}
                                onChange={(e) =>
                                  updateProject(
                                    proj.id,
                                    "liveLink",
                                    e.target.value
                                  )
                                }
                                className="bg-gray-700 border-gray-600 text-gray-100"
                              />
                              {proj.liveLink && (
                                <a
                                  href={proj.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 inline-flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 hover:bg-blue-700"
                                >
                                  <LinkIcon className="h-4 w-4 text-white" />
                                </a>
                              )}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-gray-300">
                                Description (Bullet Points)
                              </Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  addBulletPoint("projects", proj.id)
                                }
                                className="h-8 text-xs bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                              >
                                <PlusCircle className="h-3 w-3 mr-1" />
                                Add Point
                              </Button>
                            </div>

                            {proj.bulletPoints.map((point, i) => (
                              <div key={i} className="flex items-start mb-2">
                                <div className="flex-grow">
                                  <div className="flex items-center">
                                    <span className="mr-2 text-gray-500">
                                      •
                                    </span>
                                    <Input
                                      value={point}
                                      placeholder={`Bullet point ${i + 1}`}
                                      onChange={(e) =>
                                        updateBulletPoint(
                                          "projects",
                                          proj.id,
                                          i,
                                          e.target.value
                                        )
                                      }
                                      className="bg-gray-700 border-gray-600 text-gray-100"
                                    />
                                  </div>
                                </div>
                                <div className="flex ml-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                                    onClick={() =>
                                      generateAISuggestions(
                                        "project",
                                        proj.id,
                                        i
                                      )
                                    }
                                  >
                                    <Sparkles className="h-4 w-4" />
                                  </Button>
                                  {proj.bulletPoints.length > 1 && (
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-10 w-10 ml-1 bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
                                      onClick={() =>
                                        removeBulletPoint(
                                          "projects",
                                          proj.id,
                                          i
                                        )
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        onClick={addProject}
                        className="w-full bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </TabsContent>


                  </ScrollArea>
                </CardContent>
              </Card>
            </Tabs>

            <div className="mt-6 flex justify-between">
            <Button
                variant="outline"
                className="text-black"
                onClick={() =>
                  setActiveTab(
                    activeTab === "personal"
                      ? "personal"
                      : activeTab === "education"
                      ? "personal"
                      : activeTab === "experience"
                      ? "education"
                      : activeTab === "projects"
                      ? "experience"
                      : activeTab === "skills"
                      ? "projects"
                      : "skills"
                  )
                }
                disabled={activeTab === "personal"}
              >
                Previous
              </Button>
             
              <Button
                variant="outline"
                className="text-black"
                onClick={() =>
                  setActiveTab(
                    activeTab === "personal"
                      ? "education"
                      : activeTab === "education"
                      ? "experience"
                      : activeTab === "experience"
                      ? "projects"
                      : activeTab === "projects"
                      ? "skills"
                      : activeTab === "skills"
                      ? "positions"
                      : "positions"
                  )
                }
                disabled={activeTab === "positions"}
              >
                Next
              </Button>

              
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 mx-auto">
            <div className="sticky top-20">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-resume-secondary">
                  Resume Preview
                </h2>
                <div className="flex gap-2">
                  <select
                    className="px-3 py-1 border rounded-md text-sm text-black"
                    value={resumeTemplate}
                    onChange={(e) => setResumeTemplate(e.target.value)}
                  >
                    <option value="modern">Modern Template</option>
                    <option value="classic">Classic Template</option>
                  </select>
                  <Button onClick={exportResume}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg border shadow-sm p-8 min-h-[600px]">
                <ResumePreview data={formData} template={resumeTemplate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilder;
