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
