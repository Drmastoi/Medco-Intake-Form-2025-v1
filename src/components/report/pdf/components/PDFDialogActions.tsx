
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Download, AlertCircle, CheckCircle } from 'lucide-react';
import PDFDownloadLink from './PDFDownloadLink';
import { ReportData } from '@/types/reportTypes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { useReportEmailSubmission } from '@/hooks/useReportEmailSubmission';

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
  const [sendToDoctor, setSendToDoctor] = useState(false);
  const { toast } = useToast();
  const { isSubmitting, isSuccess, lastError, submitReportViaEmail } = useReportEmailSubmission(reportData);
  const closeButtonText = isPreview ? "Close Preview" : "Close";
  
  const handleSendToDoctor = async () => {
    try {
      // Show loading toast
      toast({
        title: "Sending report",
        description: "Sending report to Dr. Awais...",
      });
      
      // Use the email submission hook to send to the doctor
      const success = await submitReportViaEmail("drawais@gmail.com", "Dr. Awais");
      
      // Only close the dialog if successful
      if (success) {
        setSendToDoctor(false);
      }
      
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
    <div className="flex flex-col w-full gap-2">
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
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Send Report to Doctor</DialogTitle>
                  <DialogDescription>
                    This will send the report to Dr. Awais (drawais@gmail.com).
                  </DialogDescription>
                </DialogHeader>
                
                {lastError && (
                  <Alert variant="destructive" className="my-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Error: {lastError}
                    </AlertDescription>
                  </Alert>
                )}
                
                {isSuccess && (
                  <Alert className="my-2 border-green-500">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-500">
                      Report sent successfully to drawais@gmail.com!
                    </AlertDescription>
                  </Alert>
                )}
                
                <DialogFooter className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setSendToDoctor(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSendToDoctor} 
                    disabled={isSubmitting}
                    className={isSubmitting ? "opacity-70" : ""}
                  >
                    {isSubmitting ? "Sending..." : "Send Report"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
        <Button variant="outline" onClick={onClose}>{closeButtonText}</Button>
      </div>
    </div>
  );
};

export default PDFDialogActions;
