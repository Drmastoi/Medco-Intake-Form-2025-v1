
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShareLinkButton } from "@/components/prefilled-details/ShareLinkButton";

export function PrefilledDetailsSection({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FormField
            control={form.control}
            name="solicitorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solicitor Name</FormLabel>
                <FormControl>
                  <Input placeholder="Solicitor Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="solicitorReference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solicitor Reference</FormLabel>
                <FormControl>
                  <Input placeholder="Solicitor Reference" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="instructingPartyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructing Party Name</FormLabel>
                <FormControl>
                  <Input placeholder="Instructing Party Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="instructingPartyReference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructing Party Reference</FormLabel>
                <FormControl>
                  <Input placeholder="Instructing Party Reference" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="examinationLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Examination Location</FormLabel>
                <FormControl>
                  <Input placeholder="Examination Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="medcoReference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medco Reference</FormLabel>
                <FormControl>
                  <Input placeholder="Medco Reference" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="dateOfExamination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Examination</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="dateOfReport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Report</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="timeSpentWithClaimant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Spent With Claimant (minutes)</FormLabel>
                <FormControl>
                  <Input placeholder="15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="accompaniedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accompanied By</FormLabel>
                <FormControl>
                  <Input placeholder="Accompanied By" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="emailId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Claimant Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter claimant email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      
      <div className="mt-4">
        <ShareLinkButton form={form} />
      </div>
    </div>
  );
}
