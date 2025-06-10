import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { policyInformationSchema, type PolicyInformation } from "@shared/schema";

interface PolicyInformationStepProps {
  onNext: (data: PolicyInformation) => void;
  initialData?: PolicyInformation | null;
}

export default function PolicyInformationStep({ onNext, initialData }: PolicyInformationStepProps) {
  const form = useForm<PolicyInformation>({
    resolver: zodResolver(policyInformationSchema),
    defaultValues: initialData || {
      policyNumber: "",
      coverageType: "",
      paymentFrequency: "",
      premiumAmount: 0,
      coverageDetails: "",
    },
  });

  const onSubmit = (data: PolicyInformation) => {
    onNext(data);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-[hsl(222,14%,29%)] mb-2">
          Policy Information
        </h3>
        <p className="text-gray-600">
          Enter your policy details to begin the payment process.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="policyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Policy Number <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter policy number"
                        {...field}
                        className="pr-10"
                      />
                      <FileText className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-destructive text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverageType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Coverage Type <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select coverage type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="comprehensive">Comprehensive Coverage</SelectItem>
                      <SelectItem value="liability">Liability Only</SelectItem>
                      <SelectItem value="collision">Collision Coverage</SelectItem>
                      <SelectItem value="full">Full Coverage</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-destructive text-sm" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="premiumAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Premium Amount <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        className="pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-destructive text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Payment Frequency <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-destructive text-sm" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="coverageDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Coverage Details
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter additional coverage details or notes"
                    rows={4}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive text-sm" />
              </FormItem>
            )}
          />

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="text-primary text-lg mr-3 mt-0.5 w-5 h-5" />
              <div>
                <h4 className="font-medium text-primary mb-1">Secure Information</h4>
                <p className="text-sm text-blue-700">
                  Your policy information is encrypted and securely transmitted. We use 
                  industry-standard security measures to protect your data.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-end">
              <Button type="submit" className="bg-primary hover:bg-blue-700 text-white px-8 py-3">
                Continue
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
