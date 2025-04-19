export type FormValues = {
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
  
  export const defaultValues: FormValues = {
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

 export type ResumePreviewProps = {
    data: {
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
    template: string;
  };
  
  
  export const skillCategories = [
    "Programming Languages",
    "Frameworks & Libraries",
    "Tools & Technologies",
    "Soft Skills",
    "Languages",
    "Other",
  ];