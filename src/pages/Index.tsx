import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { IntakeFormSection1 } from "@/components/IntakeFormSection1";
import { IntakeFormSection2 } from "@/components/IntakeFormSection2";
import { IntakeFormSection3 } from "@/components/IntakeFormSection3";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  // Section 1
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  dateOfBirth: z.string(),
  idType: z.enum(["1", "2", "3"]),
  email: z.string().email(),
  address: z.string(),
  occupation: z.string(),
  workType: z.enum(["1", "2"]),
  livingWith: z.enum(["1", "2", "3", "4", "5"]),
  childrenCount: z.string(),
  // ... We'll add more sections as we build them
});

export default function Index() {
  const [currentSection, setCurrentSection] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      idType: "1",
      email: "",
      address: "",
      occupation: "",
      workType: "1",
      livingWith: "1",
      childrenCount: "0",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Form submitted",
      description: "Your intake form has been submitted successfully.",
    });
    console.log(values);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Medical Intake Form</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {currentSection === 1 && <IntakeFormSection1 form={form} />}
          {currentSection === 2 && <IntakeFormSection2 form={form} />}
          {currentSection === 3 && <IntakeFormSection3 form={form} />}
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setCurrentSection(prev => Math.max(1, prev - 1))}
              disabled={currentSection === 1}
            >
              Previous
            </Button>
            
            {currentSection < 3 ? (
              <Button 
                type="button"
                onClick={() => setCurrentSection(prev => Math.min(3, prev + 1))}
              >
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}