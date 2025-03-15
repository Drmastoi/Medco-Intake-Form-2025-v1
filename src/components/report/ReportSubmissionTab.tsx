
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PDFReport from './pdf/PDFReport';
import { ReportData } from '@/types/reportTypes';
import { useReportEmailSubmission } from '@/hooks/useReportEmailSubmission';
import { Loader2 } from 'lucide-react';

interface ReportSubmissionTabProps {
  reportData: ReportData;
}

const ReportSubmissionTab = ({ reportData }: ReportSubmissionTabProps) => {
  const [sendToEmail, setSendToEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  
  // Use report email submission hook
  const { isSubmitting, isSuccess, submitReportViaEmail } = useReportEmailSubmission(reportData);
  
  // Custom validation for email
  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email";
    return null;
  };
  
  // Email validation state
  const [emailError, setEmailError] = useState<string | null>(null);
  
  const handleSendEmail = () => {
    // Validate email before sending
    const validationError = validateEmail(sendToEmail);
    if (validationError) {
      setEmailError(validationError);
      return;
    }
    
    // Clear any previous errors
    setEmailError(null);
    
    // Send the report
    submitReportViaEmail(sendToEmail, recipientName);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="rounded-md border p-4">
        <h2 className="text-lg font-semibold mb-2">Download Report</h2>
        <p className="text-sm text-gray-500">
          Download the report as a PDF file.
        </p>
        <PDFReport 
          reportData={reportData} 
          isOpen={true} 
          onClose={() => {}} 
          isPreview={true} 
        />
      </div>

      <div className="rounded-md border p-4">
        <h2 className="text-lg font-semibold mb-2">Send Report via Email</h2>
          <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Send via Email</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Send Report via Email</DialogTitle>
                <DialogDescription>
                  Enter the recipient's email address and name to send the report.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input 
                    type="email" 
                    id="email" 
                    value={sendToEmail}
                    onChange={(e) => {
                      setSendToEmail(e.target.value);
                      setEmailError(null); // Clear error on input change
                    }}
                    className="col-span-3" 
                  />
                </div>
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Recipient Name
                  </Label>
                  <Input 
                    type="text" 
                    id="name" 
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="col-span-3" 
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  onClick={handleSendEmail}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Sending...
                    </>
                  ) : 'Send Email'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        {isSuccess && <p className="text-green-500 text-sm">Report sent successfully!</p>}
      </div>
    </div>
  );
};

export default ReportSubmissionTab;
