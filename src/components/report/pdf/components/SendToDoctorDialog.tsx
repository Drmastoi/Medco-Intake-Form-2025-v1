
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle, Info, Loader2 } from 'lucide-react';
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
import { ReportData } from '@/types/reportTypes';
import { useEmailSender } from '@/hooks/useEmailSender';
import { generatePdfAsBase64, formatFileName } from '@/utils/pdfGenerator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SendToDoctorDialogProps {
  reportData: ReportData;
}

export const SendToDoctorDialog = ({ reportData }: SendToDoctorDialogProps) => {
  const [open, setOpen] = useState(false);
  const { sendEmail, isSending, isSuccess, error } = useEmailSender();
  const [errorDetails, setErrorDetails] = useState<any>(null);
  
  const handleSendToDoctor = async () => {
    try {
      // Generate PDF as base64
      const pdfBase64 = await generatePdfAsBase64(reportData);
      
      // Format filename
      const fileName = formatFileName(reportData);
      
      // Send email to Dr. Awais
      const success = await sendEmail({
        pdfBase64,
        recipientEmail: "drawais@gmail.com",
        recipientName: "Dr. Awais",
        subject: `Medical Report: ${reportData.personal?.fullName || 'Patient'}`,
        fileName
      });
      
      if (success) {
        // Only close dialog if successful
        setTimeout(() => setOpen(false), 2000);
      }
    } catch (err: any) {
      console.error("Failed to send email:", err);
      setErrorDetails({
        message: err.message,
        stack: err.stack
      });
    }
  };
  
  // Format technical details for display
  const formatTechnicalDetails = () => {
    try {
      if (errorDetails) {
        return JSON.stringify(errorDetails, null, 2);
      }
      return "No error details available";
    } catch (e) {
      return String(errorDetails || error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        
        {error && !isSuccess && (
          <Alert className="my-2 border-red-500 bg-red-50">
            <AlertDescription className="text-red-500">
              Failed to send email: {error}
            </AlertDescription>
          </Alert>
        )}
        
        {isSuccess && (
          <Alert className="my-2 border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-500">
              Report sent successfully to drawais@gmail.com!
              <p className="text-xs mt-1">Please check both inbox and spam folders.</p>
            </AlertDescription>
          </Alert>
        )}
        
        {(error || errorDetails) && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="debug-info">
              <AccordionTrigger className="text-sm text-gray-500">
                <Info className="h-3 w-3 mr-1" /> Technical Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-48">
                  <pre>{formatTechnicalDetails()}</pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        
        <DialogFooter className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendToDoctor} 
            disabled={isSending}
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Sending...
              </>
            ) : 'Send Report'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
