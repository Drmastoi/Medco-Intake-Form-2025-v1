
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
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

interface SendToDoctorDialogProps {
  reportData: ReportData;
}

export const SendToDoctorDialog = ({ reportData }: SendToDoctorDialogProps) => {
  const [open, setOpen] = useState(false);
  const { sendEmail, isSending, isSuccess, error } = useEmailSender();
  
  const handleSendToDoctor = async () => {
    try {
      const success = await sendEmail(reportData, "drawais@gmail.com");
      
      if (success) {
        // Only close dialog if successful
        setTimeout(() => setOpen(false), 2000);
      }
    } catch (err: any) {
      console.error("Failed to send email:", err);
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
