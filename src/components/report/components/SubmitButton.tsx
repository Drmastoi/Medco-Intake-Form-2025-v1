
import React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSending: boolean;
}

export const SubmitButton = ({ 
  onClick, 
  disabled, 
  isSending 
}: SubmitButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      disabled={disabled}
      className="w-full"
    >
      <Send className="mr-2 h-4 w-4" />
      {isSending ? "Sending Report..." : "Submit Report to Medical Expert"}
    </Button>
  );
};
