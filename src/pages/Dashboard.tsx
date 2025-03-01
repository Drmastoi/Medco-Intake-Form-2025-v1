
import React, { useState, useEffect } from "react";
import { QuestionnaireDashboard } from "@/components/dashboard/QuestionnaireDashboard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const [questionnaires, setQuestionnaires] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchQuestionnaires = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('questionnaire_tracking')
        .select('*, profiles:recipient_id(full_name)')
        .order('sent_date', { ascending: false });

      if (error) throw error;
      
      setQuestionnaires(data || []);
    } catch (error) {
      console.error('Error fetching questionnaires:', error);
      toast({
        title: "Error",
        description: "Failed to load questionnaire data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionnaires();
  }, []);

  const handleStatusChange = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('questionnaire_tracking')
        .update({ 
          completed,
          completed_date: completed ? new Date().toISOString() : null 
        })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Status Updated",
        description: `Questionnaire marked as ${completed ? 'completed' : 'pending'}.`,
      });
      
      fetchQuestionnaires();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update questionnaire status.",
        variant: "destructive",
      });
    }
  };

  const handleSendReminder = async (id: string, email: string, name: string, link: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-reminder', {
        body: {
          to: email,
          name: name || "Valued Client",
          link: link
        }
      });

      if (error) throw error;
      
      // Update the last reminder date
      await supabase
        .from('questionnaire_tracking')
        .update({ 
          last_reminder_date: new Date().toISOString()
        })
        .eq('id', id);
      
      toast({
        title: "Reminder Sent",
        description: `A reminder email has been sent to ${name || email}.`,
      });
      
      fetchQuestionnaires();
    } catch (error) {
      console.error('Error sending reminder:', error);
      toast({
        title: "Error",
        description: "Failed to send reminder email.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-8">Questionnaire Dashboard</h1>
      <QuestionnaireDashboard 
        questionnaires={questionnaires}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
        onSendReminder={handleSendReminder}
        onRefresh={fetchQuestionnaires}
      />
    </div>
  );
}
