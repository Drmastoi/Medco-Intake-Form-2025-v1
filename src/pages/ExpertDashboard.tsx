
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
  // Add other fields as needed
  claimant_email?: string | null;
  comments?: string | null;
  original_filename: string;
  patient_id?: string | null;
  reviewed_by?: string | null;
  signature_status?: string | null;
  updated_at?: string;
  version?: number | null;
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
      // Specify which relation to use with profiles (using patient_id relationship)
      const { data, error } = await supabase
        .from('reports')
        .select('*, profiles!reports_patient_id_fkey(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      console.log("Fetched reports:", data);
      setReports(data as Report[] || []);
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
          <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-lg text-muted-foreground">No reports found</p>
            <p className="text-sm text-muted-foreground mt-2">Reports will appear here once they are submitted</p>
          </div>
        ) : (
          <ReportTable 
            reports={reports} 
            onReviewReport={handleReviewReport}
            onRefetch={fetchReports}
          />
        )}

        <ReviewDialog 
          isOpen={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
          report={selectedReport}
          onReviewComplete={fetchReports}
        />
      </div>
    </>
  );
}
