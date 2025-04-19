import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { FormValues } from "@/types/index"

interface PersonalInfoFormProps {
  formData: FormValues;
  updatePersonalInfo: (field: string, value: string) => void;
  generateAISuggestions: (section: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  updatePersonalInfo,
  generateAISuggestions,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="text-gray-300">
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          value={formData.personalInfo.fullName}
          onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
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
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
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
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
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
            onChange={(e) => updatePersonalInfo("location", e.target.value)}
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
            onChange={(e) => updatePersonalInfo("title", e.target.value)}
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
          onChange={(e) => updatePersonalInfo("summary", e.target.value)}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;