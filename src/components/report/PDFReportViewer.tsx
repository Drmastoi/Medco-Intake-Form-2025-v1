
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, FileText } from "lucide-react";

interface PDFReportViewerProps {
  storagePath: string;
}

export function PDFReportViewer({ storagePath }: PDFReportViewerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const handleViewPDF = async () => {
    if (url) {
      window.open(url, '_blank');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await supabase
        .storage
        .from('medical_reports')
        .getPublicUrl(storagePath);

      if (data?.publicUrl) {
        setUrl(data.publicUrl);
        window.open(data.publicUrl, '_blank');
      }
    } catch (error) {
      console.error('Error retrieving PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
      <FileText className="h-16 w-16 text-gray-400 mb-4" />
      <p className="text-sm text-gray-500 mb-4">PDF Report</p>
      <Button 
        onClick={handleViewPDF} 
        disabled={isLoading}
        className="flex items-center"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          <>View PDF Report</>
        )}
      </Button>
    </div>
  );
}
