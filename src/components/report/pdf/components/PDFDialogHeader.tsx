
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface PDFDialogHeaderProps {
  isPreview: boolean;
  loading: boolean;
  renderError: string | null;
}

const PDFDialogHeader = ({ isPreview, loading, renderError }: PDFDialogHeaderProps) => {
  const dialogTitle = isPreview ? "Preview Medical Report" : "Expert Medical Report";
  
  return (
    <DialogHeader>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogDescription>
        {loading ? "Preparing your report..." : renderError || "Your medical report is ready."}
      </DialogDescription>
    </DialogHeader>
  );
};

export default PDFDialogHeader;
