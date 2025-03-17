
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSending: boolean;
  defaultEmailValue: string;
  defaultSenderName: string;
  onSend: (emailSubject: string, senderName: string) => void;
}

export function ShareDialog({
  open,
  onOpenChange,
  isSending,
  defaultEmailValue,
  defaultSenderName,
  onSend
}: ShareDialogProps) {
  const [emailSubject, setEmailSubject] = useState("Your MEDCO Assessment Questionnaire");
  const [senderName, setSenderName] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              value={defaultEmailValue} 
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
              placeholder={defaultSenderName || "Medical Assessment Team"} 
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
            onClick={() => onSend(emailSubject, senderName)}
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
  );
}
