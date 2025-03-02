
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QuestionnaireTracking } from "@/types/questionnaire";
import { format, formatDistanceToNow } from "date-fns";
import { ChevronDown, ChevronUp, RefreshCw, Send } from "lucide-react";
import { useState } from "react";

type SortField = 'recipient_name' | 'sent_date' | 'completed_date' | 'completed';
type SortDirection = 'asc' | 'desc';

interface QuestionnaireDashboardProps {
  questionnaires: QuestionnaireTracking[];
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
  const [sortField, setSortField] = useState<SortField>('sent_date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedQuestionnaires = () => {
    return [...questionnaires].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'recipient_name':
          comparison = (a.recipient_name || '').localeCompare(b.recipient_name || '');
          break;
        case 'sent_date':
          comparison = new Date(a.sent_date).getTime() - new Date(b.sent_date).getTime();
          break;
        case 'completed_date':
          // Handle null dates
          if (!a.completed_date && !b.completed_date) comparison = 0;
          else if (!a.completed_date) comparison = -1;
          else if (!b.completed_date) comparison = 1;
          else comparison = new Date(a.completed_date).getTime() - new Date(b.completed_date).getTime();
          break;
        case 'completed':
          comparison = Number(a.completed) - Number(b.completed);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sent Questionnaires</h2>
          <Button onClick={onRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading questionnaire data...</div>
        ) : questionnaires.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No questionnaires have been sent yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('recipient_name')}
                  >
                    Recipient {renderSortIndicator('recipient_name')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('sent_date')}
                  >
                    Sent Date {renderSortIndicator('sent_date')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('completed_date')}
                  >
                    Completed Date {renderSortIndicator('completed_date')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('completed')}
                  >
                    Status {renderSortIndicator('completed')}
                  </TableHead>
                  <TableHead>Last Reminder</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getSortedQuestionnaires().map((questionnaire) => (
                  <TableRow key={questionnaire.id}>
                    <TableCell className="font-medium">
                      {questionnaire.recipient_name || questionnaire.recipient_email}
                    </TableCell>
                    <TableCell>
                      {format(new Date(questionnaire.sent_date), 'dd MMM yyyy')}
                      <span className="text-xs text-muted-foreground block">
                        {formatDistanceToNow(new Date(questionnaire.sent_date), { addSuffix: true })}
                      </span>
                    </TableCell>
                    <TableCell>
                      {questionnaire.completed_date ? (
                        <>
                          {format(new Date(questionnaire.completed_date), 'dd MMM yyyy')}
                          <span className="text-xs text-muted-foreground block">
                            {formatDistanceToNow(new Date(questionnaire.completed_date), { addSuffix: true })}
                          </span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">Not completed</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          checked={questionnaire.completed} 
                          onCheckedChange={(checked) => 
                            onStatusChange(questionnaire.id, checked === true)
                          }
                          id={`status-${questionnaire.id}`}
                        />
                        <label 
                          htmlFor={`status-${questionnaire.id}`}
                          className={questionnaire.completed ? "text-green-600" : "text-amber-600"}
                        >
                          {questionnaire.completed ? "Completed" : "Pending"}
                        </label>
                      </div>
                    </TableCell>
                    <TableCell>
                      {questionnaire.last_reminder_date ? (
                        <>
                          {format(new Date(questionnaire.last_reminder_date), 'dd MMM yyyy')}
                          <span className="text-xs text-muted-foreground block">
                            {formatDistanceToNow(new Date(questionnaire.last_reminder_date), { addSuffix: true })}
                          </span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">No reminders sent</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => 
                          onSendReminder(
                            questionnaire.id, 
                            questionnaire.recipient_email,
                            questionnaire.recipient_name || '',
                            questionnaire.questionnaire_link
                          )
                        }
                        disabled={questionnaire.completed}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Reminder
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
