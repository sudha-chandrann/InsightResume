import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Sparkles, Link as LinkIcon } from "lucide-react";
import { FormValues } from "@/types/index";

interface ProjectsFormProps {
  formData: FormValues;
  updateProject: (id: string, field: string, value: string) => void;
  removeProject: (id: string) => void;
  addProject: () => void;
  addBulletPoint: (section: "projects", id: string) => void;
  updateBulletPoint: (section: "projects", id: string, index: number, value: string) => void;
  removeBulletPoint: (section: "projects", id: string, index: number) => void;
  generateAISuggestions: (section: string, id?: string, index?: number) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({
  formData,
  updateProject,
  removeProject,
  addProject,
  addBulletPoint,
  updateBulletPoint,
  removeBulletPoint,
  generateAISuggestions,
}) => {
  return (
    <div className="space-y-6">
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
            <Label htmlFor={`project-title-${proj.id}`} className="text-gray-300">
              Project Title
            </Label>
            <Input
              id={`project-title-${proj.id}`}
              placeholder="E-commerce Dashboard"
              value={proj.title}
              onChange={(e) => updateProject(proj.id, "title", e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>

          <div>
            <Label htmlFor={`project-link-${proj.id}`} className="text-gray-300">
              Live Preview Link
            </Label>
            <div className="flex">
              <Input
                id={`project-link-${proj.id}`}
                placeholder="https://yourproject.com"
                value={proj.liveLink}
                onChange={(e) => updateProject(proj.id, "liveLink", e.target.value)}
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
                onClick={() => addBulletPoint("projects", proj.id)}
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
                    <span className="mr-2 text-gray-500">•</span>
                    <Input
                      value={point}
                      placeholder={`Bullet point ${i + 1}`}
                      onChange={(e) => updateBulletPoint("projects", proj.id, i, e.target.value)}
                      className="bg-gray-700 border-gray-600 text-gray-100"
                    />
                  </div>
                </div>
                <div className="flex ml-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                    onClick={() => generateAISuggestions("project", proj.id, i)}
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                  {proj.bulletPoints.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 ml-1 bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
                      onClick={() => removeBulletPoint("projects", proj.id, i)}
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
    </div>
  );
};

export default ProjectsForm;