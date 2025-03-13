
import * as Tabs from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntakeFormNavigationProps {
  currentSection: number;
  onTabChange: (value: string) => void;
  tabNames: string[];
  onGenerateReport: () => void;
  onPreviewReport: () => void;
}

export function IntakeFormNavigation({ 
  currentSection, 
  onTabChange, 
  tabNames,
  onGenerateReport,
  onPreviewReport
}: IntakeFormNavigationProps) {
  return (
    <div className="overflow-x-auto no-scrollbar -mx-3 px-3 mb-4">
      <div className="flex justify-between items-center">
        <Tabs.Root value={currentSection.toString()} onValueChange={onTabChange}>
          <Tabs.List className="inline-flex min-w-full space-x-1 border-b border-gray-200 pb-1 no-scrollbar">
            {tabNames.map((name, index) => (
              <Tabs.Trigger
                key={index}
                value={index.toString()}
                className={cn(
                  "px-2 py-1.5 text-xs font-bold whitespace-normal rounded-t-lg transition-colors",
                  "hover:bg-gray-100",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                )}
              >
                {name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
        
        <div className="flex space-x-2">
          <Button 
            onClick={onPreviewReport}
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
          >
            <Eye className="mr-1 h-4 w-4" />
            Preview
          </Button>
          
          <Button 
            onClick={onGenerateReport}
            variant="secondary"
            size="sm"
            className="text-white bg-black hover:bg-gray-800 whitespace-nowrap"
          >
            <FileText className="mr-1 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
}
