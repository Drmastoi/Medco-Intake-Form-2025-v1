import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { useState } from "react";
import { ShareDialog } from "./ShareDialog";
import { useShareLink } from "@/hooks/useShareLink";

interface ShareLinkButtonProps {
  form: any;
}

export function ShareLinkButton({ form }: ShareLinkButtonProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const { isSending, generateAndSendLink } = useShareLink();

  const handleOpenDialog = () => {
    setShareDialogOpen(true);
  };

  // Custom dialog close handler with strict prevention during sending
  const handleCloseDialog = (open: boolean) => {
    // If trying to close (open === false) while sending is in progress, prevent it
    if (!open && isSending) {
      console.log("Preventing dialog close while sending email");
      return; // Don't update state, effectively preventing close
    }
    
    // Otherwise allow the dialog state to change
    setShareDialogOpen(open);
  };

  const handleSendEmail = async (emailSubject: string, senderName: string) => {
    const formData = form.getValues();
    const result = await generateAndSendLink(formData, emailSubject, senderName);
    
    // Only close dialog if sending was successful
    if (result.success) {
      setShareDialogOpen(false);
    }
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
      
      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={handleCloseDialog}
        isSending={isSending}
        defaultEmailValue={form.getValues().emailId || ""}
        defaultSenderName={form.getValues().solicitorName || "Medical Assessment Team"}
        onSend={handleSendEmail}
      />
    </>
  );
}
