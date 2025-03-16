
import React from "react";
import { Label } from "@/components/ui/label";

interface DateFieldProps {
  submissionDate: string;
  setSubmissionDate: (date: string) => void;
}

export const DateField = ({ 
  submissionDate, 
  setSubmissionDate 
}: DateFieldProps) => {
  // Set default date to today if not provided
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="space-y-2">
      <Label htmlFor="submissionDate">Date</Label>
      <input
        type="date"
        id="submissionDate"
        value={submissionDate || today}
        onChange={(e) => setSubmissionDate(e.target.value)}
        className="w-full rounded-md border border-gray-300 p-2"
      />
    </div>
  );
};
