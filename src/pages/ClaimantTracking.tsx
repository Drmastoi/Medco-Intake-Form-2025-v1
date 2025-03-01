
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MailIcon, CheckIcon, RotateCw } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

interface Claimant {
  id: string;
  recipient_name: string;
  recipient_email: string;
  sent_date: string;
  last_reminder_date: string | null;
  completed: boolean;
  completed_date: string | null;
  questionnaire_link: string;
}

export default function ClaimantTracking() {
  const [claimants, setClaimants] = useState<Claimant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sendingReminder, setSendingReminder] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchClaimants = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('questionnaire_tracking')
        .select('*')
        .order('sent_date', { ascending: false });
        
      if (error) throw error;
      
      setClaimants(data || []);
    } catch (error) {
      console.error('Error fetching claimant data:', error);
      toast({
        title: "Error",
        description: "Could not retrieve the claimant list. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaimants();
  }, []);

  const sendReminder = async (claimantId: string, email: string, name: string, link: string) => {
    setSendingReminder(claimantId);
    try {
      const { error } = await supabase.functions.invoke('send-reminder', {
        body: {
          claimantId,
          email,
          name: name || "Claimant",
          link
        }
      });

      if (error) throw error;

      // Update the last reminder date locally
      setClaimants(prev => 
        prev.map(c => 
          c.id === claimantId 
            ? { ...c, last_reminder_date: new Date().toISOString() } 
            : c
        )
      );

      toast({
        title: "Reminder Sent",
        description: `Questionnaire reminder has been sent to ${email}.`,
      });
    } catch (error) {
      console.error('Error sending reminder:', error);
      toast({
        title: "Error",
        description: "Failed to send the reminder. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSendingReminder(null);
    }
  };

  const filteredClaimants = claimants.filter(
    (claimant) =>
      claimant.recipient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claimant.recipient_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return format(new Date(dateString), "dd/MM/yyyy HH:mm");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Claimant Questionnaire Tracking</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
          <Button variant="outline" onClick={fetchClaimants}>
            <RotateCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Loading claimant data...</p>
        </div>
      ) : filteredClaimants.length === 0 ? (
        <div className="text-center py-12 border rounded-md">
          <p className="text-muted-foreground">
            {searchTerm
              ? "No claimants match your search."
              : "No claimants have been sent questionnaires yet."}
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableCaption>List of claimants who have been sent questionnaires</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Last Reminder</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaimants.map((claimant) => (
                <TableRow key={claimant.id}>
                  <TableCell className="font-medium">
                    {claimant.recipient_name || "Anonymous"}
                  </TableCell>
                  <TableCell>{claimant.recipient_email}</TableCell>
                  <TableCell>{formatDate(claimant.sent_date)}</TableCell>
                  <TableCell>{formatDate(claimant.last_reminder_date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {claimant.completed ? (
                        <>
                          <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-600">
                            Completed {claimant.completed_date && `(${formatDate(claimant.completed_date)})`}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-amber-600">Pending</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendReminder(
                        claimant.id,
                        claimant.recipient_email,
                        claimant.recipient_name || "",
                        claimant.questionnaire_link
                      )}
                      disabled={claimant.completed || sendingReminder === claimant.id}
                    >
                      {sendingReminder === claimant.id ? (
                        "Sending..."
                      ) : (
                        <>
                          <MailIcon className="h-4 w-4 mr-1" /> Send Reminder
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
