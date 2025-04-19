"use client";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserRound,
  GraduationCap,
  Briefcase,
  Code,
  Code2,
  Download,
  Trophy,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ResumePreview from "../_components/ResumePreview";
import { defaultValues, FormValues } from "@/types";
import PersonalInfoForm from "./_components/PersonalInfoForm";
import EducationForm from "./_components/EducationForm";
import ExperienceForm from "./_components/ExperienceForm";
import ProjectsForm from "./_components/ProjectsForm";
import PositionsForm from "./_components/PositionsForm";
import SkillsForm from "./_components/SkillsForm";



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
    <main className="flex-grow py-8  text-gray-100 min-h-screen">
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
                    <PersonalInfoForm
                formData={formData}
                updatePersonalInfo={updatePersonalInfo}
                generateAISuggestions={generateAISuggestions}
              />
                    </TabsContent>

                    <TabsContent value="education" className="space-y-6 mt-0">
                    <EducationForm
                       formData={formData}
                       updateEducation={updateEducation}
                       removeEducation={removeEducation}
                        addEducation={addEducation}
                       />
                     </TabsContent>

                    <TabsContent value="experience" className="space-y-6 mt-0">
                    <ExperienceForm
                formData={formData}
                updateExperience={updateExperience}
                removeExperience={removeExperience}
                addExperience={addExperience}
                addBulletPoint={addBulletPoint}
                updateBulletPoint={updateBulletPoint}
                removeBulletPoint={removeBulletPoint}
                generateAISuggestions={generateAISuggestions}
              />
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-6 mt-0">
                    <ProjectsForm
                formData={formData}
                updateProject={updateProject}
                removeProject={removeProject}
                addProject={addProject}
                addBulletPoint={addBulletPoint}
                updateBulletPoint={updateBulletPoint}
                removeBulletPoint={removeBulletPoint}
                generateAISuggestions={generateAISuggestions}
              />
                    </TabsContent>

                    <TabsContent value="positions" className="space-y-6 mt-0">
                    <PositionsForm
                formData={formData}
                updatePosition={updatePosition}
                removePosition={removePosition}
                addPosition={addPosition}
                addBulletPoint={addBulletPoint}
                updateBulletPoint={updateBulletPoint}
                removeBulletPoint={removeBulletPoint}
                generateAISuggestions={generateAISuggestions}
              />
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-6 mt-0">
                    <SkillsForm
                formData={formData}
                updateSkill={updateSkill}
                removeSkill={removeSkill}
                addSkill={addSkill}
              />
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
