import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Download, AlertCircle, CheckCircle, Info, ExternalLink } from 'lucide-react';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { useReportEmailSubmission } from '@/hooks/useReportEmailSubmission';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const { isSubmitting, isSuccess, lastError, errorCode, lastResponse, submitReportViaEmail } = useReportEmailSubmission(reportData);
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
  
  // Format the lastResponse for better readability
  const formatLastResponse = (response: any) => {
    try {
      return JSON.stringify(response, null, 2);
    } catch (e) {
      return String(response);
    }
  };
  
  // Helper function to render error guidance
  const renderErrorGuidance = () => {
    if (errorCode === "DOMAIN_NOT_VERIFIED" || 
        lastError?.includes('domain') || 
        (lastResponse?.data?.error && lastResponse.data.error.includes('domain'))) {
      return (
        <div className="mt-2 text-xs">
          <p>This is normal when using the default Resend domain. Your email should still be delivered using:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Sending from: onboarding@resend.dev</li>
            <li>
              <a 
                href="https://resend.com/domains" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 flex items-center"
              >
                Learn about domain verification <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </li>
          </ul>
        </div>
      );
    }
    
    if (errorCode === "INVALID_API_KEY" || 
        lastError?.includes('API key') || 
        (lastResponse?.data?.error && lastResponse.data.error.includes('API key'))) {
      return (
        <div className="mt-2 text-xs">
          <p>This appears to be a Resend API key issue. Please check:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Your Resend API key is correctly set in Supabase secrets</li>
            <li>The API key is valid and has not expired</li>
            <li>
              <a 
                href="https://resend.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 flex items-center"
              >
                Check API keys on Resend <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </li>
          </ul>
        </div>
      );
    }
    
    if (errorCode === "PDF_TOO_LARGE" || lastError?.includes('too large')) {
      return (
        <div className="mt-2 text-xs">
          <p>The PDF file is too large to send via email. Please try:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Reducing the amount of content in the report</li>
            <li>Removing any large images</li>
            <li>Making the report less detailed</li>
          </ul>
        </div>
      );
    }
    
    if (lastError?.includes('Edge Function') || errorCode === "EDGE_FUNCTION_ERROR") {
      return (
        <div className="mt-2 text-xs">
          <p>There was an error calling the Supabase Edge Function. This might be due to:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Missing RESEND_API_KEY in Supabase project settings</li>
            <li>Network connectivity issues</li>
            <li>Supabase service disruption</li>
          </ul>
        </div>
      );
    }
    
    return null;
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
                    <AlertTitle>Error Sending Email</AlertTitle>
                    <AlertDescription>
                      {lastError}
                      {renderErrorGuidance()}
                    </AlertDescription>
                  </Alert>
                )}
                
                {isSuccess && (
                  <Alert className="my-2 border-green-500">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-500">
                      Report sent successfully to drawais@gmail.com!
                      <p className="text-xs mt-1">Please check both inbox and spam folders.</p>
                    </AlertDescription>
                  </Alert>
                )}
                
                {lastResponse && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="debug-info">
                      <AccordionTrigger className="text-sm text-gray-500">
                        <Info className="h-3 w-3 mr-1" /> Technical Details
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-48">
                          <pre>{formatLastResponse(lastResponse)}</pre>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
