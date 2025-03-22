
import { supabase } from "@/integrations/supabase/client";

/**
 * Checks and retries Supabase connection
 * @param retries Number of retries
 * @param delay Delay between retries in ms
 * @returns Promise<boolean> indicating if connection was successful
 */
export const checkSupabaseConnection = async (retries = 3, delay = 1000): Promise<boolean> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const { data, error } = await supabase.from('form_submissions').select('id').limit(1);
      
      if (error) {
        console.error(`Supabase connection attempt ${attempt}/${retries} failed:`, error);
        // Wait before retrying
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } else {
        console.log("Supabase connection successful");
        return true;
      }
    } catch (err) {
      console.error(`Supabase connection attempt ${attempt}/${retries} exception:`, err);
      // Wait before retrying
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  return false;
};
