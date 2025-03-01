
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ReportTable } from "@/components/dashboard/ReportTable";
import { ReviewDialog } from "@/components/dashboard/ReviewDialog";

interface Report {
  id: string;
  profiles?: { full_name: string | null } | null;
  created_at: string;
  status: string;
  storage_path: string;
}

export default function ExpertDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [comments, setComments] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data: reportsData, error } = await supabase
        .from('reports')
        .select(`
          id,
          created_at,
          status,
          storage_path,
          profiles!reports_patient_id_fkey (
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match the Report interface
      const transformedReports: Report[] = (reportsData || []).map(report => ({
        id: report.id,
        created_at: report.created_at,
        status: report.status,
        storage_path: report.storage_path,
        profiles: report.profiles
      }));

      setReports(transformedReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error",
        description: "Failed to fetch reports",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (status: 'approved' | 'rejected') => {
    if (!selectedReport) return;

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('reports')
        .update({
          status,
          reviewed_by: userData.user.id,
          comments: comments,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedReport.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Report ${status} successfully`,
      });

      setSelectedReport(null);
      setComments("");
      fetchReports();
    } catch (error) {
      console.error('Error updating report:', error);
      toast({
        title: "Error",
        description: "Failed to update report status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Medical Expert Dashboard</h1>

      <div className="bg-white rounded-lg shadow">
        <ReportTable
          reports={reports}
          onReviewReport={setSelectedReport}
          onRefetch={fetchReports}
        />
      </div>

      <ReviewDialog
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        onApprove={() => updateReportStatus('approved')}
        onReject={() => updateReportStatus('rejected')}
        comments={comments}
        onCommentsChange={setComments}
      />
    </div>
  );
}
