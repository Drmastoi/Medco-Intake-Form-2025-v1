
export interface QuestionnaireTracking {
  id: string;
  recipient_email: string;
  recipient_name: string | null;
  sent_date: string;
  completed_date: string | null;
  completed: boolean;
  questionnaire_link: string;
  last_reminder_date: string | null;
  recipient_id: string | null;
  created_at: string;
  updated_at: string;
  profiles?: { full_name: string | null } | null;
}
