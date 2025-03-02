
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Report {
  id: string;
  profiles?: { full_name: string | null } | null;
  created_at: string;
  status: string;
  storage_path: string;
}

interface ReportTableProps {
  reports: Report[];
  onReviewReport: (report: Report) => void;
  onRefetch: () => void;
}

export function ReportTable({ reports, onReviewReport, onRefetch }: ReportTableProps) {
  const { toast } = useToast();

  const viewReport = async (report: Report) => {
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

  return (
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
        {reports.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
              No reports found
            </TableCell>
          </TableRow>
        ) : (
          reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.profiles?.full_name || 'Anonymous'}</TableCell>
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
                        onClick={() => onReviewReport(report)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => onReviewReport(report)}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
