
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface LoadPrefilledButtonProps {
  form: any;
}

export function LoadPrefilledButton({ form }: LoadPrefilledButtonProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [foundData, setFoundData] = useState<any>(null);

  const handleSearch = async () => {
    if (!searchEmail) {
      toast({
        title: "Missing Email",
        description: "Please enter an email address to search for.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Try to load from local storage first as it's faster
      const storedData = localStorage.getItem('prefilledData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.emailId === searchEmail) {
          setFoundData(parsedData);
          setIsLoading(false);
          return;
        }
      }
      
      // Then try to load from Supabase
      try {
        // Using 'any' temporarily to work around the type mismatch
        const response: any = await supabase
          .from('prefilled_details')
          .select('*')
          .eq('email_id', searchEmail)
          .single();
          
        if (response.error) throw response.error;
        
        if (response.data && response.data.data) {
          setFoundData(response.data.data);
          return;
        }
      } catch (dbError) {
        console.error('Database search error:', dbError);
        // Continue with local storage search as fallback
      }
      
      // No data found
      toast({
        title: "No Data Found",
        description: "No prefilled details were found for this email address.",
        variant: "destructive",
      });
      setFoundData(null);
    } catch (error) {
      console.error('Load error:', error);
      toast({
        title: "Error",
        description: "Failed to load the details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    if (!foundData) return;
    
    // Reset form with found data
    form.reset(foundData);
    
    toast({
      title: "Details Loaded",
      description: "The prefilled details have been loaded successfully.",
    });
    
    setLoadDialogOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setLoadDialogOpen(true)}
        variant="outline"
        className="flex items-center gap-2 mr-2"
      >
        <FileSearch className="w-4 h-4" />
        Load Details
      </Button>
      
      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Load Prefilled Details</DialogTitle>
            <DialogDescription>
              Search for previously saved details using the claimant's email address.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="search-email" className="text-right">
                Email
              </Label>
              <div className="col-span-3 flex">
                <Input 
                  id="search-email" 
                  value={searchEmail} 
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="Enter email to search"
                  className="flex-1"
                />
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="ml-2"
                >
                  Search
                </Button>
              </div>
            </div>
            
            {foundData && (
              <div className="border p-3 rounded-md bg-gray-50">
                <p className="font-medium">Found details for: {foundData.emailId}</p>
                <p className="text-sm text-gray-500">Solicitor: {foundData.solicitorName}</p>
                <p className="text-sm text-gray-500">MEDCO Reference: {foundData.medcoReference || "Not set"}</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              onClick={handleLoad}
              disabled={!foundData || isLoading}
            >
              Load Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
