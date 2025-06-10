import { useState } from "react";
import { Edit, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { PolicyInformation, PersonalInformation } from "@shared/schema";

interface ReviewStepProps {
  policyData: PolicyInformation;
  personalData: PersonalInformation;
  onNext: () => void;
  onBack: () => void;
  onEdit: (step: number) => void;
  isProcessing?: boolean;
}

export default function ReviewStep({ 
  policyData, 
  personalData, 
  onNext, 
  onBack, 
  onEdit,
  isProcessing = false 
}: ReviewStepProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const processingFee = 3.50;
  const tax = policyData.premiumAmount * 0.01; // 1% tax
  const totalAmount = policyData.premiumAmount + processingFee + tax;

  const handleSubmit = () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
    onNext();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCoverageTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      comprehensive: "Comprehensive Coverage",
      liability: "Liability Only",
      collision: "Collision Coverage",
      full: "Full Coverage"
    };
    return labels[type] || type;
  };

  const getFrequencyLabel = (frequency: string) => {
    const labels: Record<string, string> = {
      monthly: "Monthly",
      quarterly: "Quarterly",
      "semi-annual": "Semi-Annual",
      annual: "Annual"
    };
    return labels[frequency] || frequency;
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-[hsl(222,14%,29%)] mb-2">
          Review Payment Details
        </h3>
        <p className="text-gray-600">
          Please review all information before proceeding to payment.
        </p>
      </div>

      <div className="space-y-6">
        {/* Policy Information Review */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-[hsl(222,14%,29%)]">Policy Information</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit(1)}
              className="text-primary hover:text-blue-800"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Policy Number:</span>
              <span className="ml-2">{policyData.policyNumber}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Coverage Type:</span>
              <span className="ml-2">{getCoverageTypeLabel(policyData.coverageType)}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Payment Frequency:</span>
              <span className="ml-2">{getFrequencyLabel(policyData.paymentFrequency)}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Premium Amount:</span>
              <span className="ml-2 font-semibold">{formatCurrency(policyData.premiumAmount)}</span>
            </div>
          </div>
          {policyData.coverageDetails && (
            <div className="mt-4 text-sm">
              <span className="font-medium text-gray-700">Coverage Details:</span>
              <p className="mt-1 text-gray-600">{policyData.coverageDetails}</p>
            </div>
          )}
        </div>

        {/* Personal Information Review */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-[hsl(222,14%,29%)]">Personal Information</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              className="text-primary hover:text-blue-800"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="col-span-2">
              <span className="font-medium text-gray-700">Name:</span>
              <span className="ml-2">{personalData.firstName} {personalData.lastName}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <span className="ml-2">{personalData.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Phone:</span>
              <span className="ml-2">{personalData.phone}</span>
            </div>
            <div className="col-span-2">
              <span className="font-medium text-gray-700">Address:</span>
              <span className="ml-2">
                {personalData.streetAddress}, {personalData.city}, {personalData.state} {personalData.zipCode}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white border-2 border-primary rounded-lg p-6">
          <h4 className="font-semibold text-[hsl(222,14%,29%)] mb-4">Payment Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Premium Amount:</span>
              <span className="font-medium">{formatCurrency(policyData.premiumAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processing Fee:</span>
              <span className="font-medium">{formatCurrency(processingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium">{formatCurrency(tax)}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-primary">{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms-agreement"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              className="mt-1"
            />
            <div className="text-sm">
              <Label htmlFor="terms-agreement" className="font-medium text-gray-700 cursor-pointer">
                I agree to the terms and conditions
              </Label>
              <p className="text-gray-600 mt-1">
                By checking this box, I confirm that I have read and agree to the{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mt-8">
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isProcessing || !termsAccepted}
            className="bg-accent hover:bg-green-700 text-white px-8"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Process Payment
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
