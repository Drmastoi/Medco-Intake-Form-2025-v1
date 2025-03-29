
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
import { FormSchema } from '@/schemas/intakeFormSchema';
import { useReportEmailSubmission } from '@/hooks/useReportEmailSubmission';
import { FileText, Mail, Loader2 } from 'lucide-react';
import { convertFormDataToReportData } from '@/utils/pdfReportUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ReportSubmissionTabProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormSchema;
}

export const ReportSubmissionTab = ({ isOpen, onClose, formData }: ReportSubmissionTabProps) => {
  const [sendToEmail, setSendToEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  // Convert form data to report data structure
  const reportData = convertFormDataToReportData(formData);
  
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

  const handleOpenPDFPreview = () => {
    setPreviewOpen(true);
  };

  const handleClosePDFPreview = () => {
    setPreviewOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Report Generation</h2>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Preview Report</CardTitle>
              <CardDescription>
                Preview the generated medical report based on your assessment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={handleOpenPDFPreview}
              >
                <FileText className="h-4 w-4" />
                View Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send Report</CardTitle>
              <CardDescription>
                Send the medical report to yourself or your doctor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Send via Email
                  </Button>
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
              {isSuccess && <p className="text-green-500 text-sm mt-2">Report sent successfully!</p>}
            </CardContent>
          </Card>
        </div>
        
        {previewOpen && (
          <PDFReport 
            reportData={reportData} 
            isOpen={previewOpen} 
            onClose={handleClosePDFPreview} 
            isPreview={false} 
          />
        )}
      </div>
    </div>
  );
};
