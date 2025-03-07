import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  comments: string;
  onCommentsChange: (value: string) => void;
}

export function ReviewDialog({
  isOpen,
  onClose,
  onApprove,
  onReject,
  comments,
  onCommentsChange,
}: ReviewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Report</DialogTitle>
          <DialogDescription>
            Add your comments and approve or reject the report.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Enter your comments here..."
            value={comments}
            onChange={(e) => onCommentsChange(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onApprove}
            className="flex-1"
          >
            Approve
          </Button>
          <Button
            variant="destructive"
            onClick={onReject}
            className="flex-1"
          >
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}