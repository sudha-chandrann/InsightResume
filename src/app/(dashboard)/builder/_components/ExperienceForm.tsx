import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Sparkles } from "lucide-react";
import { FormValues } from "@/types/index";

interface ExperienceFormProps {
  formData: FormValues;
  updateExperience: (id: string, field: string, value: string) => void;
  removeExperience: (id: string) => void;
  addExperience: () => void;
  addBulletPoint: (section: "experience", id: string) => void;
  updateBulletPoint: (section: "experience", id: string, index: number, value: string) => void;
  removeBulletPoint: (section: "experience", id: string, index: number) => void;
  generateAISuggestions: (section: string, id?: string, index?: number) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  formData,
  updateExperience,
  removeExperience,
  addExperience,
  addBulletPoint,
  updateBulletPoint,
  removeBulletPoint,
  generateAISuggestions,
}) => {
  return (
    <div className="space-y-6">
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
            <Label htmlFor={`company-${exp.id}`} className="text-gray-300">
              Company
            </Label>
            <Input
              id={`company-${exp.id}`}
              placeholder="Google Inc."
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>

          <div>
            <Label htmlFor={`position-${exp.id}`} className="text-gray-300">
              Position
            </Label>
            <Input
              id={`position-${exp.id}`}
              placeholder="Senior Software Engineer"
              value={exp.position}
              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`expStartDate-${exp.id}`} className="text-gray-300">
                Start Date
              </Label>
              <Input
                id={`expStartDate-${exp.id}`}
                placeholder="Jan 2020"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor={`expEndDate-${exp.id}`} className="text-gray-300">
                End Date
              </Label>
              <Input
                id={`expEndDate-${exp.id}`}
                placeholder="Present"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
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
                onClick={() => addBulletPoint("experience", exp.id)}
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
                    <span className="mr-2 text-gray-500">•</span>
                    <Input
                      value={point}
                      placeholder={`Bullet point ${i + 1}`}
                      onChange={(e) => updateBulletPoint("experience", exp.id, i, e.target.value)}
                      className="bg-gray-700 border-gray-600 text-gray-100"
                    />
                  </div>
                </div>
                <div className="flex ml-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                    onClick={() => generateAISuggestions("experience", exp.id, i)}
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                  {exp.bulletPoints.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 ml-1 bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
                      onClick={() => removeBulletPoint("experience", exp.id, i)}
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
    </div>
  );
};

export default ExperienceForm;