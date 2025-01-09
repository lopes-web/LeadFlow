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
      leads: {
        Row: {
          id: string
          nome: string
          whatsapp: string
          instagram: string
          website: string
          origem: string
          tipoProjeto: string
          orcamento: number
          status: 'primeiro_contato' | 'proposta_enviada' | 'em_negociacao' | 'fechado' | 'perdido'
          ultimoContato: string
          anotacoes: string | null
          necessidades: string | null
          observacoes: string | null
          ideias: string | null
          tags: string[]
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          nome: string
          whatsapp: string
          instagram: string
          website: string
          origem: string
          tipoProjeto: string
          orcamento: number
          status: 'primeiro_contato' | 'proposta_enviada' | 'em_negociacao' | 'fechado' | 'perdido'
          ultimoContato: string
          anotacoes?: string | null
          necessidades?: string | null
          observacoes?: string | null
          ideias?: string | null
          tags?: string[]
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          nome?: string
          whatsapp?: string
          instagram?: string
          website?: string
          origem?: string
          tipoProjeto?: string
          orcamento?: number
          status?: 'primeiro_contato' | 'proposta_enviada' | 'em_negociacao' | 'fechado' | 'perdido'
          ultimoContato?: string
          anotacoes?: string | null
          necessidades?: string | null
          observacoes?: string | null
          ideias?: string | null
          tags?: string[]
          updatedAt?: string
        }
      }
      time_tracking: {
        Row: {
          id: string
          activity_type: string
          start_time: string
          end_time: string | null
          duration: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          activity_type: string
          start_time: string
          end_time?: string | null
          duration?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          activity_type?: string
          start_time?: string
          end_time?: string | null
          duration?: number | null
          notes?: string | null
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 