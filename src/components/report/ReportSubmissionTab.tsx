import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useForm, UseFormReturn } from "react-hook-form"; // Added UseFormReturn import
import { FormSchema } from "@/schemas/intakeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { generatePdfAsBase64 } from '@/utils/pdfGenerationUtils';
import { convertFormDataToReportData } from '@/utils/pdfReportUtils';
import { useReportSubmission } from '@/hooks/useReportSubmission';
import { useReportEmailSubmission } from '@/hooks/useReportEmailSubmission';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import SignatureCanvas from 'react-signature-canvas'
import { supabase } from "@/integrations/supabase/client";
import { ReportData } from '@/types/reportTypes';
import PDFDocumentContent from '../report/pdf/components/PDFDocumentContent';
import { useSearchParams } from 'next/navigation';

interface ReportSubmissionTabProps {
  form: UseFormReturn<FormSchema>;
  referenceNumber: string | null;
}

const ReportSubmissionTab: React.FC<ReportSubmissionTabProps> = ({ form, referenceNumber }) => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<"claimant" | "expert">("expert");
  const [signature, setSignature] = useState<string | null>(null);
  const [claimantPdfUrl, setClaimantPdfUrl] = useState<string | null>(null);
  const [fullPdfUrl, setFullPdfUrl] = useState<string | null>(null);
  const [finalPdfUrl, setFinalPdfUrl] = useState<string | null>(null);
  const [isFinalReport, setIsFinalReport] = useState(false);
  const [claimantEmail, setClaimantEmail] = useState<string | null>(null);
  const [claimantName, setClaimantName] = useState<string | null>(null);
  const [isMedcoReport, setIsMedcoReport] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [isSignatureConfirmed, setIsSignatureConfirmed] = useState(false);
  const [isSignatureLoading, setIsSignatureLoading] = useState(false);
  const [isSignatureError, setIsSignatureError] = useState(false);
  const [signaturePad, setSignaturePad] = useState<SignatureCanvas | null>(null);

  const { handleSubmit: onFinalSubmit } = useReportSubmission(() => {
    // Reset state and refetch reports on successful submission
    setReportData(null);
    setSignature(null);
    setClaimantPdfUrl(null);
    setFullPdfUrl(null);
    setFinalPdfUrl(null);
    setIsFinalReport(false);
    setIsMedcoReport(false);
    setIsSignatureConfirmed(false);
  });

  const { isSubmitting: isEmailSubmitting, isSuccess: isEmailSuccess, submitReportViaEmail } = useReportEmailSubmission(reportData);

  useEffect(() => {
    if (referenceNumber) {
      fetchSubmission();
    }
  }, [referenceNumber]);

  useEffect(() => {
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    if (email) {
      setClaimantEmail(email);
    }

    if (name) {
      setClaimantName(name);
    }
  }, [searchParams]);

  const fetchSubmission = async () => {
    if (!referenceNumber) return;
    
    try {
      setLoading(true);
      
      // Fetch the submission data using fetch API
      const submissionResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questionnaire_submissions?reference_number=eq.${referenceNumber}&select=*`,
        {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!submissionResponse.ok) {
        throw new Error('Failed to fetch questionnaire submission');
      }
      
      const submissions = await submissionResponse.json();
      
      if (submissions.length === 0) {
        toast({
          title: "Error",
          description: "Submission not found",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      const submissionId = submissions[0].id;
      
      // Now fetch the form data
      const formDataResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/questionnaire_data?submission_id=eq.${submissionId}&select=*`,
        {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!formDataResponse.ok) {
        throw new Error('Failed to fetch form data');
      }
      
      const formDataRecords = await formDataResponse.json();
      
      if (formDataRecords.length > 0) {
        const formData = formDataRecords[0].form_data;
        const reportData = convertFormDataToReportData(formData);
        
        // Add meta information 
        reportData.meta = {
          referenceNumber,
          reportType: selectedReportType,
          submissionDate: new Date().toISOString().split('T')[0],
          status: "pending_approval",
        };
        
        setReportData(reportData);
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
      toast({
        title: "Error",
        description: "Failed to load report data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReportTypeChange = (value: "claimant" | "expert") => {
    setSelectedReportType(value);
    if (reportData) {
      setReportData(prev => {
        if (prev) {
          return { 
            ...prev, 
            meta: { 
              ...prev.meta, 
              reportType: value as "claimant" | "expert" 
            } 
          };
        }
        return prev;
      });
    }
  };

  const handleGenerateReport = async () => {
    if (!reportData) {
      toast({
        title: "Error",
        description: "No report data available. Please load a submission first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Generate claimant copy with proper typing
      const claimantReportData = { 
        ...reportData, 
        meta: { 
          ...reportData.meta, 
          reportType: "claimant" as "claimant" | "expert"
        } 
      };
      const claimantPdfBase64 = await generatePdfAsBase64(claimantReportData);
      setClaimantPdfUrl(`data:application/pdf;base64,${claimantPdfBase64}`);

      // Generate full expert copy with proper typing
      const expertReportData = { 
        ...reportData, 
        meta: { 
          ...reportData.meta, 
          reportType: "expert" as "claimant" | "expert"
        } 
      };
      const fullPdfBase64 = await generatePdfAsBase64(expertReportData);
      setFullPdfUrl(`data:application/pdf;base64,${fullPdfBase64}`);

      toast({
        title: "Report Generated",
        description: "The medical report has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "There was a problem generating your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateFinalReport = async () => {
    if (!reportData) {
      toast({
        title: "Error",
        description: "No report data available. Please load a submission first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Generate final medco copy with proper typing
      setIsMedcoReport(true);
      const finalReportData = { 
        ...reportData, 
        meta: { 
          ...reportData.meta, 
          reportType: "expert" as "claimant" | "expert"
        } 
      };
      const finalPdfBase64 = await generatePdfAsBase64(finalReportData);
      setFinalPdfUrl(`data:application/pdf;base64,${finalPdfBase64}`);

      toast({
        title: "Final Report Generated",
        description: "The final medical report has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "There was a problem generating your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    if (signaturePad) {
      signaturePad.clear();
      setSignature(null);
    }
  };

  const handleConfirmSignature = () => {
    if (signaturePad) {
      const dataUrl = signaturePad.getTrimmedCanvas().toDataURL('image/png');
      setSignature(dataUrl);
      setIsSignatureConfirmed(true);
      setIsSignatureModalOpen(false);
    }
  };

  const handleOpenEmailModal = () => {
    setIsEmailModalOpen(true);
    setRecipientEmail(claimantEmail);
    setRecipientName(claimantName);
  };

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
  };

  const handleSendEmail = async () => {
    if (!recipientEmail) {
      toast({
        title: "Error",
        description: "Please enter a recipient email address.",
        variant: "destructive",
      });
      return;
    }

    setIsEmailSending(true);

    try {
      await submitReportViaEmail(recipientEmail, recipientName);
      setIsEmailSent(true);
      toast({
        title: "Email Sent",
        description: "The email has been sent successfully.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "There was a problem sending the email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEmailSending(false);
      setIsEmailModalOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Submission</CardTitle>
        <CardDescription>
          Generate and submit the medical report for review.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading submission...</p>
        ) : reportData ? (
          <>
            <div className="mb-4">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={selectedReportType} onValueChange={handleReportTypeChange}>
                <SelectTrigger id="reportType">
                  <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="claimant">Claimant Copy</SelectItem>
                  <SelectItem value="expert">Expert Copy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 mb-4">
              <Button onClick={handleGenerateReport} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>

              <Button onClick={handleGenerateFinalReport} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Final Report"}
              </Button>
            </div>

            {claimantPdfUrl && fullPdfUrl && (
              <>
                <Tabs defaultValue="claimant" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="claimant">Claimant Copy</TabsTrigger>
                    <TabsTrigger value="expert">Expert Copy</TabsTrigger>
                    {isMedcoReport && <TabsTrigger value="final">Final MedCo Copy</TabsTrigger>}
                  </TabsList>
                  <TabsContent value="claimant">
                    <object data={claimantPdfUrl} type="application/pdf" width="400" height="600">
                      <p>Unable to display PDF. <a href={claimantPdfUrl}>Download the PDF</a></p>
                    </object>
                  </TabsContent>
                  <TabsContent value="expert">
                    <object data={fullPdfUrl} type="application/pdf" width="400" height="600">
                      <p>Unable to display PDF. <a href={fullPdfUrl}>Download the PDF</a></p>
                    </object>
                  </TabsContent>
                  {isMedcoReport && (
                    <TabsContent value="final">
                      <object data={finalPdfUrl} type="application/pdf" width="400" height="600">
                        <p>Unable to display PDF. <a href={finalPdfUrl}>Download the PDF</a></p>
                      </object>
                    </TabsContent>
                  )}
                </Tabs>

                <div className="flex gap-4 mt-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        {isSignatureConfirmed ? "Signature Confirmed" : "Confirm Signature"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Signature Confirmation</AlertDialogTitle>
                        <AlertDialogDescription>
                          Please confirm your signature to submit the report.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => setIsSignatureModalOpen(true)}>Confirm</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button variant="outline" onClick={handleOpenEmailModal} disabled={isEmailSubmitting}>
                    {isEmailSubmitting ? "Sending Email..." : "Send via Email"}
                  </Button>

                  <Button
                    type="submit"
                    onClick={() => onFinalSubmit(signature, form.getValues(), claimantPdfUrl, fullPdfUrl, finalPdfUrl)}
                    disabled={!isSignatureConfirmed || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <p>No submission loaded. Please enter a reference number to load a submission.</p>
        )}
      </CardContent>

      <AlertDialog open={isSignatureModalOpen} onOpenChange={setIsSignatureModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Signature</AlertDialogTitle>
            <AlertDialogDescription>
              Please add your signature to the report.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col items-center justify-center">
            <SignatureCanvas
              penColor='black'
              backgroundColor='white'
              canvasProps={{ width: 500, height: 200, className: 'border border-gray-300' }}
              ref={setSignaturePad}
            />
            <div className="flex gap-2 mt-2">
              <Button type="button" variant="secondary" size="sm" onClick={handleClear}>
                Clear
              </Button>
              <Button type="button" size="sm" onClick={handleConfirmSignature}>
                Confirm Signature
              </Button>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isEmailModalOpen} onOpenChange={handleCloseEmailModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Report via Email</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the recipient's email address to send the report.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" value={recipientEmail || ""} className="col-span-3" onChange={(e) => setRecipientEmail(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={recipientName || ""} className="col-span-3" onChange={(e) => setRecipientName(e.target.value)} />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSendEmail} disabled={isEmailSending}>
              {isEmailSending ? "Sending..." : "Send"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ReportSubmissionTab;
