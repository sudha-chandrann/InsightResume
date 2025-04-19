import React from "react";
import { Phone, Mail, MapPin} from "lucide-react";
import { ResumePreviewProps } from "@/types";



const ClassicTemplete: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalInfo, education, experience, positions, skills } = data;

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!skill.name) return acc;

    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);


 
    return (
      <div className="font-serif text-gray-800 text-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-lg mb-3">
            {personalInfo.title || "Your Profession"}
          </p>

          <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 text-sm">
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-2 text-center text-gray-800">
              Professional Summary
            </h2>
            <hr className="border-t-2 border-gray-300 mb-2" />
            <p>{personalInfo.summary}</p>
          </div>
        )}

       

        {/* Education */}
        {education.some((edu) => edu.school || edu.degree) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-2 text-center text-gray-800">
              Education
            </h2>
            <hr className="border-t-2 border-gray-300 mb-2" />
            <div className="space-y-4">
              {education.map((edu) =>
                edu.school || edu.degree ? (
                  <div key={edu.id} className="resume-item">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold">
                        {edu.school || "University"}
                      </h3>
                      <div className="flex flex-col gap-y-1 items-center">
                        {edu.startDate || "Start"} - {edu.endDate || "End"}
                        {edu.CGPA && (
                           <p className="text-gray-700 text-sm">{edu.CGPA}</p>
                        )}
                      </div>
                    </div>
                    <p className="italic mb-1">
                      {edu.degree}
                      {edu.degree && edu.fieldOfStudy ? ", " : ""}
                      {edu.fieldOfStudy}
                    </p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
         {/* Experience */}
        {experience.some((exp) => exp.company || exp.position) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-2 text-center text-gray-800">
              Work Experience
            </h2>
            <hr className="border-t-2 border-gray-300 mb-2" />
            <div className="space-y-4">
              {experience.map((exp) =>
                exp.company || exp.position ? (
                  <div key={exp.id} className="resume-item">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold">
                        {exp.position || "Position"}
                      </h3>
                      <span>
                        {exp.startDate || "Start"} - {exp.endDate || "End"}
                      </span>
                    </div>
                    <p className="italic mb-2">{exp.company || "Company"}</p>
                    {exp.bulletPoints &&
                    exp.bulletPoints.some((point) => point) ? (
                      <ul className="list-disc pl-5 text-sm">
                        {exp.bulletPoints.map((point, i) =>
                          point ? <li key={i}>{point}</li> : null
                        )}
                      </ul>
                    ) : exp.description ? (
                      <p className="text-sm">{exp.description}</p>
                    ) : null}
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}


        {data.projects.some((proj) => proj.title) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-2 text-center text-gray-800">
              Projects
            </h2>
            <hr className="border-t-2 border-gray-300 mb-2" />
            <div className="space-y-4">
              {data.projects.map((proj) =>
                proj.title ? (
                  <div key={proj.id} className="resume-item">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold">{proj.title}</h3>
                      {proj.liveLink && (
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm italic"
                        >
                          Live Preview
                        </a>
                      )}
                    </div>
                    {proj.bulletPoints &&
                      proj.bulletPoints.some((point) => point) && (
                        <ul className="list-disc pl-5 text-sm">
                          {proj.bulletPoints.map((point, i) =>
                            point ? <li key={i}>{point}</li> : null
                          )}
                        </ul>
                      )}
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
        {/* Positions & Activities */}
        {positions.some((pos) => pos.title || pos.organization) && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-2 text-center text-gray-800">
              Leadership & Activities
            </h2>
            <hr className="border-t-2 border-gray-300 mb-2" />
            <div className="space-y-4">
              {positions.map((pos) =>
                pos.title || pos.organization ? (
                  <div key={pos.id} className="resume-item">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold">{pos.title || "Position"}</h3>
                      <span>
                        {pos.startDate || "Start"} - {pos.endDate || "End"}
                      </span>
                    </div>
                    <p className="italic mb-1">
                      {pos.organization || "Organization"}
                    </p>
                    {pos.bulletPoints &&
                      pos.bulletPoints.some((point) => point) && (
                        <ul className="list-disc pl-5 text-sm">
                          {pos.bulletPoints.map((point, i) =>
                            point ? <li key={i}>{point}</li> : null
                          )}
                        </ul>
                      )}
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {Object.keys(groupedSkills).length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase mb-2 text-center text-gray-800">
              Skills
            </h2>
            <hr className="border-t-2 border-gray-300 mb-2" />
            <div className="space-y-2">
              {Object.entries(groupedSkills).map(
                ([category, categorySkills]) => (
                  <div key={category} className="mb-3">
                    <h3 className="font-medium mb-1">{category}:</h3>
                    <p className="text-gray-700">
                      {categorySkills.map((skill) => skill.name).join(", ")}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    );

};




export default ClassicTemplete
