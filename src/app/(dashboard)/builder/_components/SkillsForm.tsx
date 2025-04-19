import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { FormValues, skillCategories } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillsFormProps {
  formData: FormValues;
  updateSkill: (id: string, field: string, value: string) => void;
  removeSkill: (id: string) => void;
  addSkill: () => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({
  formData,
  updateSkill,
  removeSkill,
  addSkill,
}) => {
  return (
    <div className="space-y-6">
      {formData.skills.map((skill, index) => (
        <div
          key={skill.id}
          className="space-y-4 pb-6 border-b border-gray-700 last:border-0"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-blue-300">
              Skill #{index + 1}
            </h3>
            {formData.skills.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeSkill(skill.id)}
                className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`skillCategory-${skill.id}`} className="text-gray-300">
                Category
              </Label>
              <Select
                value={skill.category}
                onValueChange={(value) => updateSkill(skill.id, "category", value)}
              >
                <SelectTrigger 
                  id={`skillCategory-${skill.id}`}
                  className="bg-gray-700 border-gray-600 text-gray-100"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                  {skillCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor={`skillName-${skill.id}`} className="text-gray-300">
                Skill Name
              </Label>
              <Input
                id={`skillName-${skill.id}`}
                placeholder="JavaScript, React, etc."
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
          </div>
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
    </div>
  );
};

export default SkillsForm;