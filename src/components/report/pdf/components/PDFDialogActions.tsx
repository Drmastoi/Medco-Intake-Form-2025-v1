
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Download } from 'lucide-react';
import PDFDownloadLink from './PDFDownloadLink';
import { ReportData } from '@/types/reportTypes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';

interface PDFDialogActionsProps {
  isPreview: boolean;
  viewerReady: boolean;
  loading: boolean;
  renderError: string | null;
  reportData: ReportData;
  onClose: () => void;
}

const PDFDialogActions = ({
  isPreview,
  viewerReady,
  loading,
  renderError,
  reportData,
  onClose
}: PDFDialogActionsProps) => {
  const [sendToDoctor, setSendToDoctor] = React.useState(false);
  const { toast } = useToast();
  const closeButtonText = isPreview ? "Close Preview" : "Close";
  
  const handleSendToDoctor = async () => {
    try {
      // Close the dialog
      setSendToDoctor(false);
      
      // Show loading toast
      toast({
        title: "Sending report",
        description: "Sending report to doctor...",
      });
      
      // Call the Supabase function to send the email
      const response = await fetch('https://your-project.supabase.co/functions/v1/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'drawais@gmail.com',
          pdfBase64: '', // This will be generated on the server side
          patientName: reportData.personal?.fullName || 'Patient',
          referenceNumber: reportData.prefilled?.medcoReference || 'Unknown',
          isClaimantCopy: false
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      toast({
        title: "Success",
        description: "Report sent to doctor successfully",
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send report to doctor",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="flex justify-end w-full space-x-2">
      {viewerReady && !loading && !renderError && (
        <>
          <PDFDownloadLink reportData={reportData} isLoading={loading} />
          
          <Dialog open={sendToDoctor} onOpenChange={setSendToDoctor}>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <Mail className="h-4 w-4 mr-2" />
                Send to Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Send Report to Doctor</DialogTitle>
                <DialogDescription>
                  This will send the report to Dr. Awais (drawais@gmail.com).
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setSendToDoctor(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendToDoctor}>
                  Send Report
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
      <Button variant="outline" onClick={onClose}>{closeButtonText}</Button>
    </div>
  );
};

export default PDFDialogActions;
