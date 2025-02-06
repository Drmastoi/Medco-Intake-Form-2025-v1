import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export default function ExpertDashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [comments, setComments] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data: reports, error } = await supabase
        .from('reports')
        .select(`
          *,
          profiles:patient_id (
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(reports || []);
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

  const viewReport = async (report: any) => {
    try {
      const { data } = await supabase
        .storage
        .from('medical_reports')
        .getPublicUrl(report.storage_path);

      if (data?.publicUrl) {
        window.open(data.publicUrl, '_blank');
      } else {
        throw new Error('Failed to get public URL');
      }
    } catch (error) {
      console.error('Error viewing report:', error);
      toast({
        title: "Error",
        description: "Failed to open report",
        variant: "destructive",
      });
    }
  };

  const updateReportStatus = async (report: any, status: 'approved' | 'rejected') => {
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
        .eq('id', report.id);

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.profiles?.full_name || 'Unknown'}</TableCell>
                <TableCell>
                  {new Date(report.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    report.status === 'approved' ? 'bg-green-100 text-green-800' :
                    report.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewReport(report)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {report.status === 'pending_review' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600"
                          onClick={() => setSelectedReport(report)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => setSelectedReport(report)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Report</DialogTitle>
            <DialogDescription>
              Add your comments and approve or reject the report.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter your comments here..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => updateReportStatus(selectedReport, 'approved')}
              className="flex-1"
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              onClick={() => updateReportStatus(selectedReport, 'rejected')}
              className="flex-1"
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}