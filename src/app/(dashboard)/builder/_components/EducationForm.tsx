import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { FormValues } from "@/types/index";

interface EducationFormProps {
  formData: FormValues;
  updateEducation: (id: string, field: string, value: string) => void;
  removeEducation: (id: string) => void;
  addEducation: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
  formData,
  updateEducation,
  removeEducation,
  addEducation,
}) => {
  return (
    <div className="space-y-6">
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
            <Label htmlFor={`school-${edu.id}`} className="text-gray-300">
              School/University
            </Label>
            <Input
              id={`school-${edu.id}`}
              placeholder="Harvard University"
              value={edu.school}
              onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`degree-${edu.id}`} className="text-gray-300">
                Degree
              </Label>
              <Input
                id={`degree-${edu.id}`}
                placeholder="Bachelor of Science"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor={`field-${edu.id}`} className="text-gray-300">
                Field of Study
              </Label>
              <Input
                id={`field-${edu.id}`}
                placeholder="Computer Science"
                value={edu.fieldOfStudy}
                onChange={(e) => updateEducation(edu.id, "fieldOfStudy", e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`eduStartDate-${edu.id}`} className="text-gray-300">
                Start Date
              </Label>
              <Input
                id={`eduStartDate-${edu.id}`}
                placeholder="Sep 2018"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor={`eduEndDate-${edu.id}`} className="text-gray-300">
                End Date
              </Label>
              <Input
                id={`eduEndDate-${edu.id}`}
                placeholder="May 2022 (or Present)"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor={`eduCGPA-${edu.id}`} className="text-gray-300">
                CGPA
              </Label>
            </div>
            <Input
              id={`eduCGPA-${edu.id}`}
              placeholder="CGPA"
              className="bg-gray-700 border-gray-600 text-gray-100"
              value={edu.CGPA}
              onChange={(e) => updateEducation(edu.id, "CGPA", e.target.value)}
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
    </div>
  );
};

export default EducationForm;