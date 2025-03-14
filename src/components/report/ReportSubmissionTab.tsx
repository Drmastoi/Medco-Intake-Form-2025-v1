
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSchema } from "@/schemas/intakeFormSchema";
import { Eye, FileSignature, Send } from "lucide-react";
import { SignatureField } from "@/components/SignatureField";
import { Label } from "@/components/ui/label";
import { convertFormDataToReportData } from "@/utils/pdfReportUtils";
import { RatingDialog } from "@/components/RatingDialog";
import PDFReport from "@/components/report/pdf/PDFReport";
import { useReportSubmission } from "@/hooks/useReportSubmission";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  
  const reportData = convertFormDataToReportData(formData);
  
  // Use the report submission hook
  const { isSubmitting, handleSubmit } = useReportSubmission(() => {
    onClose();
    setShowThankYou(true);
  });

  const handlePreviewReport = () => {
    setShowPdfPreview(true);
  };
  
  const handleClosePreview = () => {
    setShowPdfPreview(false);
  };
  
  const handleSubmitReport = () => {
    if (!signature) {
      toast({
        title: "Signature Required",
        description: "Please sign the form before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Generate final PDFs
      const claimantPdfUrl = "YOUR_PDF_URL"; // In a real app, we'd generate this
      const fullPdfUrl = "YOUR_PDF_URL"; // In a real app, we'd generate this
      
      handleSubmit(signature, formData, claimantPdfUrl, fullPdfUrl);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit the report. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleRatingSubmit = () => {
    console.log("User rating:", rating);
    setShowThankYou(false);
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
              <Button 
                onClick={handlePreviewReport}
                variant="outline"
                className="w-full"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview Report
              </Button>
            </div>
            
            {/* Disclaimer Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Disclaimer</h3>
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={hasAcceptedTerms}
                  onCheckedChange={(checked) => setHasAcceptedTerms(checked === true)}
                  className="mt-1"
                />
                <Label 
                  htmlFor="terms" 
                  className="text-sm text-gray-600"
                >
                  I agree that I have mentioned all injuries and effects for the purpose of this report. 
                  I understand that this report will be submitted to a medical expert for review.
                </Label>
              </div>
            </div>
            
            {/* Signature Field */}
            <SignatureField value={signature} onChange={setSignature} />
            
            {/* Date Field */}
            <div className="space-y-2">
              <Label htmlFor="submissionDate">Date</Label>
              <input
                type="date"
                id="submissionDate"
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            
            {/* Submit Button */}
            <Button 
              onClick={handleSubmitReport}
              disabled={!hasAcceptedTerms || isSubmitting}
              className="w-full"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Report to Medical Expert
              {isSubmitting && "..."}
            </Button>
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
