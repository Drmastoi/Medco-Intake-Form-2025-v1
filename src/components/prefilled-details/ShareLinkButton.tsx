
import { Button } from "@/components/ui/button";
import { Share, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface ShareLinkButtonProps {
  form: any;
}

export function ShareLinkButton({ form }: ShareLinkButtonProps) {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("Your MEDCO Assessment Questionnaire");
  const [senderName, setSenderName] = useState("");

  const generateAndShareLink = async () => {
    const formData = form.getValues();
    
    if (!formData.emailId) {
      toast({
        title: "Missing Email",
        description: "Please enter the claimant's email address before sharing.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    const preFillData = {
      solicitorName: formData.solicitorName || '',
      solicitorReference: formData.solicitorReference || '',
      instructingPartyName: formData.instructingPartyName || '',
      instructingPartyReference: formData.instructingPartyReference || '',
      examinationLocation: formData.examinationLocation || '',
      medcoReference: formData.medcoReference || '',
      dateOfExamination: formData.dateOfExamination || '',
      dateOfReport: formData.dateOfReport || '',
      emailId: formData.emailId || '',
      timeSpentWithClaimant: formData.timeSpentWithClaimant || '15',
      accompaniedBy: formData.accompaniedBy || '',
      mobileNumber: formData.mobileNumber || '',
    };
    
    const queryParams = new URLSearchParams();
    Object.entries(preFillData).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value.toString());
      }
    });
    
    const shareableLink = `${window.location.origin}?${queryParams.toString()}`;
    
    console.log("Shareable link generated:", shareableLink);
    console.log("Email will be sent to:", formData.emailId);
    
    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-claimant-link', {
        body: {
          recipientEmail: formData.emailId,
          recipientName: formData.fullName || "Valued Client",
          shareableLink: shareableLink,
          senderName: senderName || formData.solicitorName || "Medical Assessment Team",
          medcoReference: formData.medcoReference
        }
      });
      
      if (error) throw error;
      
      console.log('Email response:', data);

      // Save the link to the database for tracking
      try {
        await supabase
          .from('questionnaire_tracking')
          .insert({
            questionnaire_link: shareableLink,
            recipient_email: formData.emailId,
            recipient_name: formData.fullName || null,
            sent_date: new Date().toISOString(),
            completed: false
          });
      } catch (dbError) {
        console.error('Failed to save link to tracking database:', dbError);
        // Continue with success toast even if tracking fails
      }

      toast({
        title: "Link Shared",
        description: "The questionnaire link has been sent to the provided email address.",
      });
      
      setShareDialogOpen(false);
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: "Error",
        description: "Failed to send the email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Handle dialog open separately to prevent accidental closing
  const handleOpenDialog = () => {
    setShareDialogOpen(true);
  };

  // Handle dialog close with confirmation if sending is in progress
  const handleCloseDialog = () => {
    if (isSending) {
      // Prevent closing while sending
      return;
    }
    setShareDialogOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Share className="w-4 h-4" />
        Share with Claimant
      </Button>
      
      <Dialog open={shareDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share Questionnaire with Claimant</DialogTitle>
            <DialogDescription>
              Send a personalized email with a link to the pre-filled questionnaire.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipient-email" className="text-right">
                Recipient
              </Label>
              <Input 
                id="recipient-email" 
                value={form.getValues().emailId || ""} 
                readOnly
                className="col-span-3 bg-muted"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sender-name" className="text-right">
                Your Name
              </Label>
              <Input 
                id="sender-name" 
                value={senderName} 
                onChange={(e) => setSenderName(e.target.value)}
                placeholder={form.getValues().solicitorName || "Medical Assessment Team"} 
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email-subject" className="text-right">
                Subject
              </Label>
              <Input 
                id="email-subject" 
                value={emailSubject} 
                onChange={(e) => setEmailSubject(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="button" 
              onClick={generateAndShareLink}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Sending...
                </>
              ) : 'Send Email'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
