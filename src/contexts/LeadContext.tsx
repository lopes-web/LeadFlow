import { createContext, useContext, useEffect, useState } from "react";
import { Lead } from "@/types/lead";
import { supabase } from "@/lib/supabase";

interface LeadContextType {
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id">) => Promise<void>;
  updateLead: (id: string, lead: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("createdat", { ascending: false });

      if (error) {
        console.error("Erro ao buscar leads:", error);
        return;
      }

      const formattedLeads = (data || []).map(lead => ({
        ...lead,
        created_at: lead.createdat,
        updated_at: lead.updatedat,
        tipo_projeto: lead.tipoprojeto,
        ultimo_contato: lead.ultimocontato,
      }));

      setLeads(formattedLeads);
    } catch (error) {
      console.error("Erro ao buscar leads:", error);
    }
  }

  async function addLead(lead: Omit<Lead, "id">) {
    try {
      const { created_at, updated_at, tipo_projeto, ultimo_contato, ...restLead } = lead;

      const dbLead = {
        ...restLead,
        createdat: new Date().toISOString(),
        updatedat: new Date().toISOString(),
        tipoprojeto: tipo_projeto,
        ultimocontato: ultimo_contato,
      };

      const { data, error } = await supabase
        .from("leads")
        .insert([dbLead])
        .select();

      if (error) {
        console.error("Erro ao adicionar lead:", error);
        return;
      }

      const formattedLead = {
        ...data[0],
        created_at: data[0].createdat,
        updated_at: data[0].updatedat,
        tipo_projeto: data[0].tipoprojeto,
        ultimo_contato: data[0].ultimocontato,
      };

      setLeads(prevLeads => [...prevLeads, formattedLead]);
    } catch (error) {
      console.error("Erro ao adicionar lead:", error);
    }
  }

  async function updateLead(id: string, lead: Partial<Lead>) {
    try {
      const { created_at, updated_at, tipo_projeto, ultimo_contato, ...restLead } = lead;

      const updates = {
        ...restLead,
        updatedat: new Date().toISOString(),
        ...(tipo_projeto && { tipoprojeto: tipo_projeto }),
        ...(ultimo_contato && { ultimocontato: ultimo_contato }),
      };

      const { error } = await supabase
        .from("leads")
        .update(updates)
        .eq("id", id);

      if (error) {
        console.error("Erro ao atualizar lead:", error);
        return;
      }

      setLeads(prevLeads =>
        prevLeads.map(l => (l.id === id ? { 
          ...l, 
          ...lead,
          updated_at: updates.updatedat,
        } : l))
      );
    } catch (error) {
      console.error("Erro ao atualizar lead:", error);
    }
  }

  async function deleteLead(id: string) {
    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);

      if (error) {
        console.error("Erro ao deletar lead:", error);
        return;
      }

      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id));
    } catch (error) {
      console.error("Erro ao deletar lead:", error);
    }
  }

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error("useLeads must be used within a LeadProvider");
  }
  return context;
}