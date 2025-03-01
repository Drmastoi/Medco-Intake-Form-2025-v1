
import React, { useState, useEffect } from "react";
import { ReviewDialog } from "@/components/dashboard/ReviewDialog";
import { ReportTable } from "@/components/dashboard/ReportTable";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MainNavigation } from "@/components/layout/MainNavigation";

interface Report {
  id: string;
  profiles?: { full_name: string | null } | null;
  created_at: string;
  status: string;
  storage_path: string;
}

export default function ExpertDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error",
        description: "Failed to load reports",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleReviewReport = (report: Report) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  return (
    <>
      <MainNavigation />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-8">Medical Expert Dashboard</h1>
        
        {isLoading ? (
          <div className="text-center">Loading reports...</div>
        ) : (
          <ReportTable 
            reports={reports} 
            onReviewReport={handleReviewReport}
            onRefetch={fetchReports}
          />
        )}

        <ReviewDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
          report={selectedReport}
          onReviewComplete={fetchReports}
        />
      </div>
    </>
  );
}
