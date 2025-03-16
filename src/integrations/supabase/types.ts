export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      claimant_signatures: {
        Row: {
          claimant_name: string
          confirmed: boolean | null
          id: string
          report_id: string | null
          signature_date: string | null
        }
        Insert: {
          claimant_name: string
          confirmed?: boolean | null
          id?: string
          report_id?: string | null
          signature_date?: string | null
        }
        Update: {
          claimant_name?: string
          confirmed?: boolean | null
          id?: string
          report_id?: string | null
          signature_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claimant_signatures_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      diseases: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          risk_factors: string[] | null
          symptoms: string[] | null
          treatments: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          risk_factors?: string[] | null
          symptoms?: string[] | null
          treatments?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          risk_factors?: string[] | null
          symptoms?: string[] | null
          treatments?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          accident_date: string | null
          accident_time: string | null
          accompanied_by: string | null
          additional_info: string | null
          address: string | null
          back_location: string | null
          back_pain: string | null
          back_pain_current_severity: string | null
          back_pain_initial_severity: string | null
          back_pain_resolve_days: number | null
          back_pain_start: string | null
          children_count: number | null
          created_at: string
          date_of_birth: string | null
          email_id: string | null
          examination_location: string | null
          full_name: string | null
          headache: string | null
          headache_current_severity: string | null
          headache_initial_severity: string | null
          headache_past_history: string | null
          headache_resolve_days: number | null
          headache_start: string | null
          id: string
          id_type: string | null
          instructing_party_name: string | null
          instructing_party_reference: string | null
          living_with: string | null
          medco_reference: string | null
          mobile_number: string | null
          neck_pain: string | null
          occupation: string | null
          shoulder_pain: string | null
          shoulder_pain_current_severity: string | null
          shoulder_pain_initial_severity: string | null
          shoulder_pain_resolve_days: number | null
          shoulder_pain_start: string | null
          shoulder_side: string | null
          solicitor_name: string | null
          solicitor_reference: string | null
          updated_at: string
          user_id: string | null
          vehicle_position: string | null
          work_type: string | null
        }
        Insert: {
          accident_date?: string | null
          accident_time?: string | null
          accompanied_by?: string | null
          additional_info?: string | null
          address?: string | null
          back_location?: string | null
          back_pain?: string | null
          back_pain_current_severity?: string | null
          back_pain_initial_severity?: string | null
          back_pain_resolve_days?: number | null
          back_pain_start?: string | null
          children_count?: number | null
          created_at?: string
          date_of_birth?: string | null
          email_id?: string | null
          examination_location?: string | null
          full_name?: string | null
          headache?: string | null
          headache_current_severity?: string | null
          headache_initial_severity?: string | null
          headache_past_history?: string | null
          headache_resolve_days?: number | null
          headache_start?: string | null
          id?: string
          id_type?: string | null
          instructing_party_name?: string | null
          instructing_party_reference?: string | null
          living_with?: string | null
          medco_reference?: string | null
          mobile_number?: string | null
          neck_pain?: string | null
          occupation?: string | null
          shoulder_pain?: string | null
          shoulder_pain_current_severity?: string | null
          shoulder_pain_initial_severity?: string | null
          shoulder_pain_resolve_days?: number | null
          shoulder_pain_start?: string | null
          shoulder_side?: string | null
          solicitor_name?: string | null
          solicitor_reference?: string | null
          updated_at?: string
          user_id?: string | null
          vehicle_position?: string | null
          work_type?: string | null
        }
        Update: {
          accident_date?: string | null
          accident_time?: string | null
          accompanied_by?: string | null
          additional_info?: string | null
          address?: string | null
          back_location?: string | null
          back_pain?: string | null
          back_pain_current_severity?: string | null
          back_pain_initial_severity?: string | null
          back_pain_resolve_days?: number | null
          back_pain_start?: string | null
          children_count?: number | null
          created_at?: string
          date_of_birth?: string | null
          email_id?: string | null
          examination_location?: string | null
          full_name?: string | null
          headache?: string | null
          headache_current_severity?: string | null
          headache_initial_severity?: string | null
          headache_past_history?: string | null
          headache_resolve_days?: number | null
          headache_start?: string | null
          id?: string
          id_type?: string | null
          instructing_party_name?: string | null
          instructing_party_reference?: string | null
          living_with?: string | null
          medco_reference?: string | null
          mobile_number?: string | null
          neck_pain?: string | null
          occupation?: string | null
          shoulder_pain?: string | null
          shoulder_pain_current_severity?: string | null
          shoulder_pain_initial_severity?: string | null
          shoulder_pain_resolve_days?: number | null
          shoulder_pain_start?: string | null
          shoulder_side?: string | null
          solicitor_name?: string | null
          solicitor_reference?: string | null
          updated_at?: string
          user_id?: string | null
          vehicle_position?: string | null
          work_type?: string | null
        }
        Relationships: []
      }
      medical_notes: {
        Row: {
          acute_problem: string
          assessment: string | null
          created_at: string
          diagnosis: string | null
          follow_up: string | null
          history: string | null
          id: string
          investigation: string | null
          safety_netting: string | null
          treatment: string | null
          updated_at: string
        }
        Insert: {
          acute_problem: string
          assessment?: string | null
          created_at?: string
          diagnosis?: string | null
          follow_up?: string | null
          history?: string | null
          id?: string
          investigation?: string | null
          safety_netting?: string | null
          treatment?: string | null
          updated_at?: string
        }
        Update: {
          acute_problem?: string
          assessment?: string | null
          created_at?: string
          diagnosis?: string | null
          follow_up?: string | null
          history?: string | null
          id?: string
          investigation?: string | null
          safety_netting?: string | null
          treatment?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
      questionnaire_data: {
        Row: {
          created_at: string | null
          form_data: Json
          id: string
          submission_id: string | null
          version: string
        }
        Insert: {
          created_at?: string | null
          form_data: Json
          id?: string
          submission_id?: string | null
          version: string
        }
        Update: {
          created_at?: string | null
          form_data?: Json
          id?: string
          submission_id?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "questionnaire_data_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "questionnaire_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      questionnaire_submissions: {
        Row: {
          claimant_email: string
          claimant_name: string | null
          claimant_report_url: string | null
          completed_date: string | null
          created_at: string | null
          expert_email: string
          expert_report_url: string | null
          id: string
          reference_number: string
          status: string
          submission_date: string | null
          updated_at: string | null
        }
        Insert: {
          claimant_email: string
          claimant_name?: string | null
          claimant_report_url?: string | null
          completed_date?: string | null
          created_at?: string | null
          expert_email: string
          expert_report_url?: string | null
          id?: string
          reference_number: string
          status?: string
          submission_date?: string | null
          updated_at?: string | null
        }
        Update: {
          claimant_email?: string
          claimant_name?: string | null
          claimant_report_url?: string | null
          completed_date?: string | null
          created_at?: string | null
          expert_email?: string
          expert_report_url?: string | null
          id?: string
          reference_number?: string
          status?: string
          submission_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      questionnaire_tracking: {
        Row: {
          completed: boolean
          completed_date: string | null
          created_at: string
          id: string
          last_reminder_date: string | null
          questionnaire_link: string
          recipient_email: string
          recipient_id: string | null
          recipient_name: string | null
          sent_date: string
          updated_at: string
        }
        Insert: {
          completed?: boolean
          completed_date?: string | null
          created_at?: string
          id?: string
          last_reminder_date?: string | null
          questionnaire_link: string
          recipient_email: string
          recipient_id?: string | null
          recipient_name?: string | null
          sent_date?: string
          updated_at?: string
        }
        Update: {
          completed?: boolean
          completed_date?: string | null
          created_at?: string
          id?: string
          last_reminder_date?: string | null
          questionnaire_link?: string
          recipient_email?: string
          recipient_id?: string | null
          recipient_name?: string | null
          sent_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "questionnaire_tracking_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          claimant_email: string | null
          comments: string | null
          created_at: string
          id: string
          original_filename: string
          patient_id: string | null
          reviewed_by: string | null
          signature_status: string | null
          status: string | null
          storage_path: string
          updated_at: string
          version: number | null
        }
        Insert: {
          claimant_email?: string | null
          comments?: string | null
          created_at?: string
          id?: string
          original_filename: string
          patient_id?: string | null
          reviewed_by?: string | null
          signature_status?: string | null
          status?: string | null
          storage_path: string
          updated_at?: string
          version?: number | null
        }
        Update: {
          claimant_email?: string | null
          comments?: string | null
          created_at?: string
          id?: string
          original_filename?: string
          patient_id?: string | null
          reviewed_by?: string | null
          signature_status?: string | null
          status?: string | null
          storage_path?: string
          updated_at?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_report: {
        Args: {
          report_row: unknown
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "medical_expert" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
