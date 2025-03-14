
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
  return (
    <div className="space-y-2">
      <Label htmlFor="submissionDate">Date</Label>
      <input
        type="date"
        id="submissionDate"
        value={submissionDate}
        onChange={(e) => setSubmissionDate(e.target.value)}
        className="w-full rounded-md border border-gray-300 p-2"
      />
    </div>
  );
};
