
import { Database as OriginalDatabase } from '@/integrations/supabase/types';

// Extend the original database types with the new tables
export interface ExtendedDatabase extends OriginalDatabase {
  public: OriginalDatabase['public'] & {
    Tables: OriginalDatabase['public']['Tables'] & {
      questionnaire_submissions: {
        Row: {
          id: string;
          reference_number: string;
          expert_email: string;
          claimant_email: string;
          claimant_name: string | null;
          submission_date: string;
          status: string;
          completed_date: string | null;
          expert_report_url: string | null;
          claimant_report_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference_number: string;
          expert_email: string;
          claimant_email: string;
          claimant_name?: string | null;
          submission_date?: string;
          status?: string;
          completed_date?: string | null;
          expert_report_url?: string | null;
          claimant_report_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference_number?: string;
          expert_email?: string;
          claimant_email?: string;
          claimant_name?: string | null;
          submission_date?: string;
          status?: string;
          completed_date?: string | null;
          expert_report_url?: string | null;
          claimant_report_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      questionnaire_data: {
        Row: {
          id: string;
          submission_id: string;
          form_data: any;
          version: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          submission_id: string;
          form_data: any;
          version: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          submission_id?: string;
          form_data?: any;
          version?: string;
          created_at?: string;
        };
      };
    };
  };
}

// Create a type-safe client for the extended database
export type ExtendedClient = ReturnType<typeof createExtendedClient>;

// Function to create a typed client that includes the new tables
export function createExtendedClient(supabase: any) {
  return supabase as unknown as {
    from<T extends keyof ExtendedDatabase['public']['Tables']>(
      table: T
    ): any;
    // Add other methods as needed
  };
}
