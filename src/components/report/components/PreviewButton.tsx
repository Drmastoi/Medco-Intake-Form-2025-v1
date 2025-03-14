
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface PreviewButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const PreviewButton = ({ onClick, isLoading }: PreviewButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      variant="outline"
      className="w-full"
      disabled={isLoading}
    >
      <Eye className="mr-2 h-4 w-4" />
      {isLoading ? "Loading Preview..." : "Preview Report"}
    </Button>
  );
};
