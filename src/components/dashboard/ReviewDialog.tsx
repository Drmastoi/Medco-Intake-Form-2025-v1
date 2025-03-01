
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { PDFReportViewer } from "@/components/report/PDFReportViewer";

interface ReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  report: any;
  onReviewComplete: () => void;
}

export function ReviewDialog({ isOpen, onOpenChange, report, onReviewComplete }: ReviewDialogProps) {
  const [status, setStatus] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Reset form when dialog opens with a new report
  useEffect(() => {
    if (report) {
      setStatus(report.status || 'pending_review');
      setComments(report.comments || '');
    }
  }, [report]);

  const handleSubmitReview = async () => {
    if (!report) return;
    
    setIsSubmitting(true);
    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('reports')
        .update({
          status,
          comments,
          reviewed_by: userData.user?.id,
        })
        .eq('id', report.id);

      if (error) throw error;
      
      toast({
        title: "Review Submitted",
        description: "The report has been successfully reviewed.",
      });
      
      onOpenChange(false);
      onReviewComplete();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Report</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="claimant">Claimant</Label>
              <div id="claimant" className="p-2 bg-muted rounded">
                {report.profiles?.full_name || "Unknown"}
              </div>
            </div>
            
            <div>
              <Label htmlFor="date">Submission Date</Label>
              <div id="date" className="p-2 bg-muted rounded">
                {new Date(report.created_at).toLocaleDateString()}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={status} 
                onValueChange={setStatus}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="needs_revision">Needs Revision</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add your comments or feedback about this report"
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <PDFReportViewer storagePath={report.storage_path} />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitReview}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
