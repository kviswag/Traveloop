export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      checklist_items: {
        Row: {
          category: string;
          created_at: string;
          id: string;
          is_checked: boolean;
          label: string;
          sort_order: number;
          trip_id: string;
          updated_at: string;
        };
        Insert: {
          category?: string;
          created_at?: string;
          id?: string;
          is_checked?: boolean;
          label: string;
          sort_order?: number;
          trip_id: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          id?: string;
          is_checked?: boolean;
          label?: string;
          sort_order?: number;
          trip_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            columns: ["trip_id"];
            foreignKeyName: "checklist_items_trip_id_fkey";
            isOneToOne: false;
            referencedColumns: ["id"];
            referencedRelation: "trips";
          },
        ];
      };
      itinerary_stops: {
        Row: {
          activities: Json;
          arrival_date: string | null;
          city: string;
          country: string | null;
          created_at: string;
          departure_date: string | null;
          id: string;
          narrative: string | null;
          stay_name: string | null;
          stop_order: number;
          trip_id: string;
          updated_at: string;
          weather_note: string | null;
        };
        Insert: {
          activities?: Json;
          arrival_date?: string | null;
          city: string;
          country?: string | null;
          created_at?: string;
          departure_date?: string | null;
          id?: string;
          narrative?: string | null;
          stay_name?: string | null;
          stop_order?: number;
          trip_id: string;
          updated_at?: string;
          weather_note?: string | null;
        };
        Update: {
          activities?: Json;
          arrival_date?: string | null;
          city?: string;
          country?: string | null;
          created_at?: string;
          departure_date?: string | null;
          id?: string;
          narrative?: string | null;
          stay_name?: string | null;
          stop_order?: number;
          trip_id?: string;
          updated_at?: string;
          weather_note?: string | null;
        };
        Relationships: [
          {
            columns: ["trip_id"];
            foreignKeyName: "itinerary_stops_trip_id_fkey";
            isOneToOne: false;
            referencedColumns: ["id"];
            referencedRelation: "trips";
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
        };
        Relationships: [
          {
            columns: ["id"];
            foreignKeyName: "profiles_id_fkey";
            isOneToOne: true;
            referencedColumns: ["id"];
            referencedRelation: "users";
          },
        ];
      };
      trip_notes: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          note_order: number;
          title: string | null;
          trip_id: string;
          updated_at: string;
        };
        Insert: {
          body?: string;
          created_at?: string;
          id?: string;
          note_order?: number;
          title?: string | null;
          trip_id: string;
          updated_at?: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          note_order?: number;
          title?: string | null;
          trip_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            columns: ["trip_id"];
            foreignKeyName: "trip_notes_trip_id_fkey";
            isOneToOne: false;
            referencedColumns: ["id"];
            referencedRelation: "trips";
          },
        ];
      };
      trips: {
        Row: {
          budget_breakdown: Json;
          budget_currency: string;
          budget_total: number;
          cover_image: string | null;
          created_at: string;
          end_date: string | null;
          id: string;
          is_public: boolean;
          route_cities: string[];
          share_slug: string;
          start_date: string | null;
          status: string;
          summary: string | null;
          title: string;
          traveler_count: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          budget_breakdown?: Json;
          budget_currency?: string;
          budget_total?: number;
          cover_image?: string | null;
          created_at?: string;
          end_date?: string | null;
          id?: string;
          is_public?: boolean;
          route_cities?: string[];
          share_slug?: string;
          start_date?: string | null;
          status?: string;
          summary?: string | null;
          title: string;
          traveler_count?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          budget_breakdown?: Json;
          budget_currency?: string;
          budget_total?: number;
          cover_image?: string | null;
          created_at?: string;
          end_date?: string | null;
          id?: string;
          is_public?: boolean;
          route_cities?: string[];
          share_slug?: string;
          start_date?: string | null;
          status?: string;
          summary?: string | null;
          title?: string;
          traveler_count?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            columns: ["user_id"];
            foreignKeyName: "trips_user_id_fkey";
            isOneToOne: false;
            referencedColumns: ["id"];
            referencedRelation: "profiles";
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
