import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Sparkles } from "lucide-react";
import { FormValues } from "@/types";

interface PositionsFormProps {
  formData: FormValues;
  updatePosition: (id: string, field: string, value: string) => void;
  removePosition: (id: string) => void;
  addPosition: () => void;
  addBulletPoint: (section: "positions", id: string) => void;
  updateBulletPoint: (section: "positions", id: string, index: number, value: string) => void;
  removeBulletPoint: (section: "positions", id: string, index: number) => void;
  generateAISuggestions: (section: string, id?: string, index?: number) => void;
}

const PositionsForm: React.FC<PositionsFormProps> = ({
  formData,
  updatePosition,
  removePosition,
  addPosition,
  addBulletPoint,
  updateBulletPoint,
  removeBulletPoint,
  generateAISuggestions,
}) => {
  return (
    <div className="space-y-6">
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
            <Label htmlFor={`posTitle-${pos.id}`} className="text-gray-300">
              Position Title
            </Label>
            <Input
              id={`posTitle-${pos.id}`}
              placeholder="Team Lead / Club President"
              value={pos.title}
              onChange={(e) => updatePosition(pos.id, "title", e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>

          <div>
            <Label htmlFor={`organization-${pos.id}`} className="text-gray-300">
              Organization
            </Label>
            <Input
              id={`organization-${pos.id}`}
              placeholder="Computer Science Club"
              value={pos.organization}
              onChange={(e) => updatePosition(pos.id, "organization", e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`posStartDate-${pos.id}`} className="text-gray-300">
                Start Date
              </Label>
              <Input
                id={`posStartDate-${pos.id}`}
                placeholder="Sep 2020"
                value={pos.startDate}
                onChange={(e) => updatePosition(pos.id, "startDate", e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor={`posEndDate-${pos.id}`} className="text-gray-300">
                End Date
              </Label>
              <Input
                id={`posEndDate-${pos.id}`}
                placeholder="Present"
                value={pos.endDate}
                onChange={(e) => updatePosition(pos.id, "endDate", e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor={`achievements-${pos.id}`} className="text-gray-300">
                Achievements & Responsibilities
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBulletPoint("positions", pos.id)}
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
                    <span className="mr-2 text-gray-500">•</span>
                    <Input
                      value={point}
                      placeholder={`Bullet point ${i + 1}`}
                      onChange={(e) => updateBulletPoint("positions", pos.id, i, e.target.value)}
                      className="bg-gray-700 border-gray-600 text-gray-100"
                    />
                  </div>
                </div>
                <div className="flex ml-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 bg-gray-700 hover:bg-gray-600 border-gray-600 text-blue-300"
                    onClick={() => generateAISuggestions("position", pos.id, i)}
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                  {pos.bulletPoints.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 ml-1 bg-gray-700 hover:bg-gray-600 border-gray-600 text-red-300"
                      onClick={() => removeBulletPoint("positions", pos.id, i)}
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
    </div>
  );
};

export default PositionsForm;
         