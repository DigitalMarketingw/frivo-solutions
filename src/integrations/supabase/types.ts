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
      application_timeline: {
        Row: {
          application_id: string
          created_at: string | null
          created_by: string | null
          id: string
          message: string | null
          status: string
        }
        Insert: {
          application_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          message?: string | null
          status: string
        }
        Update: {
          application_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          message?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_timeline_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "application_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_timeline_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          applied_at: string | null
          assignment_completed: boolean | null
          assignment_status: string | null
          enrollment_id: string
          hackerrank_link: string | null
          id: string
          job_id: string
          payment_amount: number | null
          payment_due_date: string | null
          payment_required: boolean | null
          payment_status: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          test_results: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          applied_at?: string | null
          assignment_completed?: boolean | null
          assignment_status?: string | null
          enrollment_id: string
          hackerrank_link?: string | null
          id?: string
          job_id: string
          payment_amount?: number | null
          payment_due_date?: string | null
          payment_required?: boolean | null
          payment_status?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          test_results?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          applied_at?: string | null
          assignment_completed?: boolean | null
          assignment_status?: string | null
          enrollment_id?: string
          hackerrank_link?: string | null
          id?: string
          job_id?: string
          payment_amount?: number | null
          payment_due_date?: string | null
          payment_required?: boolean | null
          payment_status?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          test_results?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_applications_enrollment_id"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_applications_job_id"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          enrolled_at: string | null
          enrollment_status:
            | Database["public"]["Enums"]["enrollment_status"]
            | null
          id: string
          job_id: string
          paid: boolean | null
          payment_date: string | null
          payment_id: string | null
          user_id: string
        }
        Insert: {
          enrolled_at?: string | null
          enrollment_status?:
            | Database["public"]["Enums"]["enrollment_status"]
            | null
          id?: string
          job_id: string
          paid?: boolean | null
          payment_date?: string | null
          payment_id?: string | null
          user_id: string
        }
        Update: {
          enrolled_at?: string | null
          enrollment_status?:
            | Database["public"]["Enums"]["enrollment_status"]
            | null
          id?: string
          job_id?: string
          paid?: boolean | null
          payment_date?: string | null
          payment_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_enrollments_job_id"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company: string
          created_at: string | null
          deleted_at: string | null
          description: string
          field: string
          id: string
          location: string
          posted_by: string | null
          posted_date: string | null
          requirements: Json | null
          status: Database["public"]["Enums"]["job_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          deleted_at?: string | null
          description: string
          field: string
          id?: string
          location: string
          posted_by?: string | null
          posted_date?: string | null
          requirements?: Json | null
          status?: Database["public"]["Enums"]["job_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          deleted_at?: string | null
          description?: string
          field?: string
          id?: string
          location?: string
          posted_by?: string | null
          posted_date?: string | null
          requirements?: Json | null
          status?: Database["public"]["Enums"]["job_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          enrollment_id: string
          id: string
          status: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_id: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          enrollment_id: string
          id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          enrollment_id?: string
          id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_payments_enrollment_id"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          employment_history: Json | null
          full_name: string | null
          id: string
          phone: string | null
          resume_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          skills: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          employment_history?: Json | null
          full_name?: string | null
          id: string
          phone?: string | null
          resume_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          employment_history?: Json | null
          full_name?: string | null
          id?: string
          phone?: string | null
          resume_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          paid_at: string | null
          plan_type: string
          status: string | null
          stripe_payment_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          paid_at?: string | null
          plan_type: string
          status?: string | null
          stripe_payment_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          paid_at?: string | null
          plan_type?: string
          status?: string | null
          stripe_payment_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      application_analytics: {
        Row: {
          applicant_name: string | null
          application_date: string | null
          application_month: string | null
          application_week: string | null
          applied_at: string | null
          assignment_completed: boolean | null
          company: string | null
          field: string | null
          id: string | null
          job_id: string | null
          job_title: string | null
          location: string | null
          payment_required: boolean | null
          payment_status: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_applications_job_id"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_job: {
        Args: {
          job_title: string
          job_description: string
          job_company: string
          job_location: string
          job_field: string
          job_requirements?: Json
          job_tags?: string[]
        }
        Returns: string
      }
      duplicate_job: {
        Args: { job_id: string }
        Returns: string
      }
      get_admin_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_application_stats: {
        Args: { start_date?: string; end_date?: string; job_field?: string }
        Returns: Json
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_demo_application_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_payment_status: {
        Args: { user_uuid: string }
        Returns: {
          has_paid: boolean
          plan_type: string
          paid_at: string
        }[]
      }
      get_user_performance_metrics: {
        Args: { user_uuid: string }
        Returns: Json
      }
      soft_delete_job: {
        Args: { job_id: string }
        Returns: boolean
      }
      update_job: {
        Args: {
          job_id: string
          job_title: string
          job_description: string
          job_company: string
          job_location: string
          job_field: string
          job_requirements?: Json
          job_tags?: string[]
          job_status?: Database["public"]["Enums"]["job_status"]
        }
        Returns: boolean
      }
      user_has_paid: {
        Args: { user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      application_status:
        | "applied"
        | "under_review"
        | "test_assigned"
        | "test_completed"
        | "approved"
        | "rejected"
      enrollment_status: "pending" | "enrolled" | "cancelled"
      job_status: "open" | "closed" | "under_review" | "filled"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: [
        "applied",
        "under_review",
        "test_assigned",
        "test_completed",
        "approved",
        "rejected",
      ],
      enrollment_status: ["pending", "enrolled", "cancelled"],
      job_status: ["open", "closed", "under_review", "filled"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      user_role: ["user", "admin"],
    },
  },
} as const
