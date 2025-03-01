
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Share, Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function PreFilledDetails({ form }: { form: any }) {
  const { toast } = useToast();
  const [showOtherIdField, setShowOtherIdField] = useState(false);
  const [showOtherLivingWithField, setShowOtherLivingWithField] = useState(false);
  const [letterOfInstruction, setLetterOfInstruction] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);

  useEffect(() => {
    emailjs.init("YnnsjqOayi-IRBxy_");
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLetterOfInstruction(e.target.files[0]);
    }
  };

  const extractDataFromLetter = async () => {
    if (!letterOfInstruction) {
      toast({
        title: "No file selected",
        description: "Please upload a Letter of Instruction first.",
        variant: "destructive",
      });
      return;
    }
    
    setExtracting(true);
    
    try {
      // In a real implementation, this would use OCR or text extraction
      // For now, we'll simulate extraction with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock extraction of data - ensuring all required fields are included
      const mockExtractedData = {
        fullName: "John Smith",
        dateOfBirth: "1985-06-15",
        address: "123 Main Street, London, W1 1AA",
        idType: "1", // Driving License
        accompaniedBy: "Spouse - Jane Smith",
        accidentDate: "2023-08-10",
        instructingPartyName: "ABC Insurance Ltd", // Name of Referring Party
        instructingPartyReference: "INS-2023-785", // Reference Number/Our reference
        solicitorName: "Johnson & Partners", // Name of referring Solicitor
        solicitorReference: "REF-2023-4589", // Solicitor Reference number
        medcoReference: "MED-2023-78945", // Medco Reference number
      };
      
      // Update form with extracted data
      form.setValue("fullName", mockExtractedData.fullName);
      form.setValue("dateOfBirth", mockExtractedData.dateOfBirth);
      form.setValue("address", mockExtractedData.address);
      form.setValue("idType", mockExtractedData.idType);
      form.setValue("accompaniedBy", mockExtractedData.accompaniedBy);
      form.setValue("accidentDate", mockExtractedData.accidentDate);
      form.setValue("solicitorName", mockExtractedData.solicitorName);
      form.setValue("solicitorReference", mockExtractedData.solicitorReference);
      form.setValue("instructingPartyName", mockExtractedData.instructingPartyName);
      form.setValue("instructingPartyReference", mockExtractedData.instructingPartyReference);
      form.setValue("medcoReference", mockExtractedData.medcoReference);
      
      toast({
        title: "Data Extracted",
        description: "Information has been extracted from the Letter of Instruction.",
      });
    } catch (error) {
      console.error("Error extracting data:", error);
      toast({
        title: "Extraction Failed",
        description: "Could not extract data from the file. Please enter details manually.",
        variant: "destructive",
      });
    } finally {
      setExtracting(false);
    }
  };

  const generateAndShareLink = async () => {
    const formData = form.getValues();
    
    const preFillData = {
      solicitorName: formData.solicitorName || '',
      solicitorReference: formData.solicitorReference || '',
      instructingPartyName: formData.instructingPartyName || '',
      instructingPartyReference: formData.instructingPartyReference || '',
      examinationLocation: formData.examinationLocation || '',
      medcoReference: formData.medcoReference || '',
      accompaniedBy: formData.accompaniedBy || '',
      mobileNumber: formData.mobileNumber || '',
      emailId: formData.emailId || '',
      fullName: formData.fullName || '',
      dateOfBirth: formData.dateOfBirth || '',
      idType: formData.idType || '',
      address: formData.address || '',
      occupation: formData.occupation || '',
      workType: formData.workType || '',
      livingWith: formData.livingWith || '',
      childrenCount: formData.childrenCount || '',
      accidentDate: formData.accidentDate || '',
    };
    
    const queryParams = new URLSearchParams();
    Object.entries(preFillData).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value.toString());
      }
    });
    
    const shareableLink = `${window.location.origin}?${queryParams.toString()}`;
    
    try {
      const templateParams = {
        to_name: formData.solicitorName || "Valued Client",
        to_email: formData.emailId,
        message: `
Dear ${formData.solicitorName || "Valued Client"},

I hope this email finds you well. As part of your personal injury assessment process, we have prepared a detailed questionnaire for you to complete.

Please click on the link below to access your personalized questionnaire. The form will be pre-filled with the information we already have:

${shareableLink}

If you have any questions or need assistance while completing the questionnaire, please don't hesitate to contact us.

Best regards,
Your Medical Assessment Team
        `,
        link: shareableLink,
      };

      const response = await emailjs.send(
        "service_by7xf4t",
        "template_5l8vu23",
        templateParams,
        "YnnsjqOayi-IRBxy_"
      );
      
      console.log('EmailJS Response:', response);

      toast({
        title: "Link Shared",
        description: "The questionnaire link has been sent to the provided email address.",
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Error",
        description: "Failed to send the email. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Personal Information & Pre-filled Details</h2>
        <Button
          onClick={generateAndShareLink}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Share className="w-4 h-4" />
          Share with Claimant
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-base font-semibold text-blue-900 mb-2">Letter of Instruction</h3>
        <p className="text-sm text-blue-800 mb-4">
          Upload a Letter of Instruction to automatically extract claimant details.
        </p>
        <div className="flex items-center gap-4">
          <Input 
            type="file" 
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx"
            className="max-w-md"
          />
          <Button 
            onClick={extractDataFromLetter} 
            disabled={!letterOfInstruction || extracting}
            variant="secondary"
          >
            {extracting ? "Extracting..." : "Extract Data"}
          </Button>
        </div>
        {letterOfInstruction && (
          <p className="text-sm text-blue-800 mt-2">
            Selected file: {letterOfInstruction.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>ID Type</FormLabel>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "1"}
                      onCheckedChange={() => field.onChange("1")}
                    />
                    <label>Driving License</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "2"}
                      onCheckedChange={() => field.onChange("2")}
                    />
                    <label>Passport</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "3"}
                      onCheckedChange={() => field.onChange("3")}
                    />
                    <label>ID Card</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "4"}
                      onCheckedChange={(checked) => {
                        setShowOtherIdField(checked === true);
                        if (checked) field.onChange("4");
                      }}
                    />
                    <label>Other</label>
                  </div>
                  {showOtherIdField && (
                    <Input 
                      placeholder="Please specify other ID type"
                      className="ml-6 mt-2"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Enter your occupation" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accidentDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Accident</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Work Type</FormLabel>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "1"}
                      onCheckedChange={() => field.onChange("1")}
                    />
                    <label>Full Time</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "2"}
                      onCheckedChange={() => field.onChange("2")}
                    />
                    <label>Part Time</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "3"}
                      onCheckedChange={() => field.onChange("3")}
                    />
                    <label>N/A</label>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="livingWith"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Who Lives with You at Home</FormLabel>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "1"}
                      onCheckedChange={() => field.onChange("1")}
                    />
                    <label>Wife</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "2"}
                      onCheckedChange={() => field.onChange("2")}
                    />
                    <label>Husband</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "3"}
                      onCheckedChange={() => field.onChange("3")}
                    />
                    <label>Partner</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "4"}
                      onCheckedChange={() => field.onChange("4")}
                    />
                    <label>Parents</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "5"}
                      onCheckedChange={() => field.onChange("5")}
                    />
                    <label>Alone</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === "6"}
                      onCheckedChange={(checked) => {
                        setShowOtherLivingWithField(checked === true);
                        if (checked) field.onChange("6");
                      }}
                    />
                    <label>Other</label>
                  </div>
                  {showOtherLivingWithField && (
                    <Input 
                      placeholder="Please specify who lives with you"
                      className="ml-6 mt-2"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="childrenCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Children at Home</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="solicitorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solicitor's Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="solicitorReference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solicitor's Reference</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="instructingPartyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructing Party Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="instructingPartyReference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructing Party Reference</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="examinationLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Examination Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medcoReference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medco Reference</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accompaniedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accompanied By</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input {...field} type="tel" placeholder="Enter mobile number" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emailId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter email address" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
