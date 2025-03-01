
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowUpDown, 
  Mail, 
  CalendarIcon, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import { Input } from "@/components/ui/input";

interface QuestionnaireRecord {
  id: string;
  recipient_email: string;
  recipient_name: string;
  sent_date: string;
  completed_date: string | null;
  completed: boolean;
  questionnaire_link: string;
  last_reminder_date: string | null;
  profiles?: { full_name: string | null } | null;
}

interface QuestionnaireDashboardProps {
  questionnaires: QuestionnaireRecord[];
  isLoading: boolean;
  onStatusChange: (id: string, completed: boolean) => void;
  onSendReminder: (id: string, email: string, name: string, link: string) => void;
  onRefresh: () => void;
}

export function QuestionnaireDashboard({ 
  questionnaires, 
  isLoading, 
  onStatusChange, 
  onSendReminder,
  onRefresh
}: QuestionnaireDashboardProps) {
  const [sortField, setSortField] = useState<string>("sent_date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedQuestionnaires = [...questionnaires]
    .filter(q => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        (q.recipient_name?.toLowerCase().includes(searchLower)) ||
        (q.profiles?.full_name?.toLowerCase().includes(searchLower)) ||
        q.recipient_email.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      // Handle special cases for name that might be in two places
      if (sortField === "recipient_name") {
        const nameA = a.profiles?.full_name || a.recipient_name || "";
        const nameB = b.profiles?.full_name || b.recipient_name || "";
        return sortDirection === "asc" 
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      
      // Handle dates
      if (["sent_date", "completed_date", "last_reminder_date"].includes(sortField)) {
        const dateA = a[sortField as keyof QuestionnaireRecord] as string || "0";
        const dateB = b[sortField as keyof QuestionnaireRecord] as string || "0";
        return sortDirection === "asc"
          ? dateA.localeCompare(dateB)
          : dateB.localeCompare(dateA);
      }
      
      // Handle boolean completed status
      if (sortField === "completed") {
        return sortDirection === "asc"
          ? (a.completed === b.completed ? 0 : a.completed ? 1 : -1)
          : (a.completed === b.completed ? 0 : a.completed ? -1 : 1);
      }
      
      // Default string comparison
      const valA = String(a[sortField as keyof QuestionnaireRecord] || "");
      const valB = String(b[sortField as keyof QuestionnaireRecord] || "");
      return sortDirection === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <Input
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button onClick={onRefresh} variant="outline" size="sm">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Refresh
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("recipient_name")}>
                  Recipient
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("sent_date")}>
                  Sent Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("completed_date")}>
                  Completed Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("completed")}>
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("last_reminder_date")}>
                  Last Reminder
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                  <p className="mt-2 text-sm text-gray-500">Loading questionnaire data...</p>
                </TableCell>
              </TableRow>
            ) : sortedQuestionnaires.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <p className="text-sm text-gray-500">No questionnaires have been sent yet.</p>
                </TableCell>
              </TableRow>
            ) : (
              sortedQuestionnaires.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.profiles?.full_name || item.recipient_name || 'Anonymous'}</div>
                    <div className="text-sm text-gray-500">{item.recipient_email}</div>
                  </TableCell>
                  <TableCell>{formatDate(item.sent_date)}</TableCell>
                  <TableCell>{item.completed_date ? formatDate(item.completed_date) : 'Not completed'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={item.completed} 
                        onCheckedChange={(checked) => {
                          if (typeof checked === 'boolean') {
                            onStatusChange(item.id, checked);
                          }
                        }}
                      />
                      {item.completed ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span>Pending</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.last_reminder_date ? formatDate(item.last_reminder_date) : 'No reminder sent'}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onSendReminder(
                        item.id, 
                        item.recipient_email, 
                        item.profiles?.full_name || item.recipient_name || "",
                        item.questionnaire_link
                      )}
                      disabled={item.completed}
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Send Reminder
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
