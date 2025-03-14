
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { SignatureField } from "@/components/SignatureField";
import { convertFormDataToReportData } from "@/utils/pdfReportUtils";
import { RatingDialog } from "@/components/RatingDialog";
import PDFReport from "@/components/report/pdf/PDFReport";
import { useReportSubmission } from "@/hooks/useReportSubmission";
import { useToast } from "@/components/ui/use-toast";
import { useReportEmailSubmission } from "@/hooks/useReportEmailSubmission";
import { DisclaimerSection } from "./components/DisclaimerSection";
import { DateField } from "./components/DateField";
import { PreviewButton } from "./components/PreviewButton";
import { SubmitButton } from "./components/SubmitButton";

interface ReportSubmissionTabProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormSchema;
}

export function ReportSubmissionTab({ 
  isOpen, 
  onClose,
  formData 
}: ReportSubmissionTabProps) {
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [signature, setSignature] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [submissionDate, setSubmissionDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [showThankYou, setShowThankYou] = useState(false);
  const [rating, setRating] = useState(0);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const { toast } = useToast();
  
  const reportData = convertFormDataToReportData(formData);
  
  // Use the report submission hook
  const { isSubmitting, handleSubmit } = useReportSubmission(() => {
    onClose();
    setShowThankYou(true);
  });

  // Use the email submission hook
  const { isSendingEmail, sendReportEmail } = useReportEmailSubmission();

  const handlePreviewReport = () => {
    setIsPdfLoading(true);
    setShowPdfPreview(true);
  };
  
  const handleClosePreview = () => {
    setShowPdfPreview(false);
    setIsPdfLoading(false);
  };
  
  const handleSubmitReport = async () => {
    if (!hasAcceptedTerms) {
      toast({
        title: "Terms Not Accepted",
        description: "Please accept the terms before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    await sendReportEmail(
      signature,
      formData,
      submissionDate,
      handleSubmit
    );
  };
  
  const handleRatingSubmit = () => {
    console.log("User rating:", rating);
    setShowThankYou(false);
    
    // Show a thank you toast
    toast({
      title: "Thank You",
      description: `Thanks for rating our service with ${rating} stars! We appreciate your feedback.`,
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle>Report Submission</DialogTitle>
          <DialogDescription>
            Review and submit your medical report
          </DialogDescription>
          
          <div className="space-y-6 py-2">
            {/* Preview Report Option */}
            <div>
              <PreviewButton 
                onClick={handlePreviewReport}
                isLoading={isPdfLoading}
              />
            </div>
            
            {/* Disclaimer Section */}
            <DisclaimerSection 
              hasAcceptedTerms={hasAcceptedTerms}
              setHasAcceptedTerms={setHasAcceptedTerms}
            />
            
            {/* Signature Field */}
            <SignatureField value={signature} onChange={setSignature} />
            
            {/* Date Field */}
            <DateField 
              submissionDate={submissionDate}
              setSubmissionDate={setSubmissionDate}
            />
            
            {/* Submit Button */}
            <SubmitButton 
              onClick={handleSubmitReport}
              disabled={!hasAcceptedTerms || isSubmitting || isSendingEmail}
              isSending={isSendingEmail}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      {/* PDF Preview Dialog - Only render when needed */}
      {showPdfPreview && (
        <PDFReport 
          reportData={reportData}
          isOpen={showPdfPreview}
          onClose={handleClosePreview}
          isPreview={true}
        />
      )}
      
      {/* Thank you and Rating Dialog */}
      <RatingDialog
        open={showThankYou}
        onOpenChange={setShowThankYou}
        rating={rating}
        setRating={setRating}
        onSubmit={handleRatingSubmit}
      />
    </>
  );
}
