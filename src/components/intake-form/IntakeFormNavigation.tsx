
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface IntakeFormNavigationProps {
  currentSection: number;
  onTabChange: (value: string) => void;
  tabNames: string[];
  onGenerateReport: () => void;
}

export function IntakeFormNavigation({
  currentSection,
  onTabChange,
  tabNames,
  onGenerateReport
}: IntakeFormNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <Tabs
        defaultValue={currentSection.toString()}
        value={currentSection.toString()}
        onValueChange={onTabChange}
        className="overflow-x-auto w-full sm:w-auto"
      >
        <TabsList className="inline-flex w-full sm:w-auto">
          {tabNames.map((name, index) => (
            <TabsTrigger key={index} value={index.toString()} className="whitespace-nowrap">
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <Button 
        variant="default" 
        className="flex items-center gap-2 whitespace-nowrap" 
        onClick={onGenerateReport}
      >
        <FileText className="h-4 w-4" />
        Generate Report
      </Button>
    </div>
  );
}
