import { useState } from "react";
import { Shield, Lock, Phone } from "lucide-react";
import ProgressIndicator from "@/components/payment/progress-indicator";
import PolicyInformationStep from "@/components/payment/policy-information-step";
import PersonalInformationStep from "@/components/payment/personal-information-step";
import ReviewStep from "@/components/payment/review-step";
import ConfirmationStep from "@/components/payment/confirmation-step";
import { Button } from "@/components/ui/button";
import type { PolicyInformation, PersonalInformation, PaymentTransaction } from "@shared/schema";

export default function PaymentWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [policyData, setPolicyData] = useState<PolicyInformation | null>(null);
  const [personalData, setPersonalData] = useState<PersonalInformation | null>(null);
  const [paymentTransaction, setPaymentTransaction] = useState<PaymentTransaction | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePolicyNext = (data: PolicyInformation) => {
    setPolicyData(data);
    setCurrentStep(2);
  };

  const handlePersonalNext = (data: PersonalInformation) => {
    setPersonalData(data);
    setCurrentStep(3);
  };

  const handleReviewNext = async () => {
    if (!policyData || !personalData) return;

    setIsProcessing(true);
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock transaction for frontend-only demo
      const processingFee = policyData.premiumAmount * 0.03;
      const tax = policyData.premiumAmount * 0.08;
      const totalAmount = policyData.premiumAmount + processingFee + tax;
      
      const transaction: PaymentTransaction = {
        id: Date.now(),
        transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        policyNumber: policyData.policyNumber,
        coverageType: policyData.coverageType,
        paymentFrequency: policyData.paymentFrequency,
        premiumAmount: policyData.premiumAmount.toString(),
        processingFee: processingFee.toFixed(2),
        tax: tax.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        firstName: personalData.firstName,
        lastName: personalData.lastName,
        email: personalData.email,
        phone: personalData.phone,
        streetAddress: personalData.streetAddress,
        city: personalData.city,
        state: personalData.state,
        zipCode: personalData.zipCode,
        coverageDetails: policyData.coverageDetails || null,
        status: "completed",
        createdAt: new Date()
      } as PaymentTransaction;
      
      setPaymentTransaction(transaction);
      setCurrentStep(4);
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleFinish = () => {
    // Reset wizard
    setCurrentStep(1);
    setPolicyData(null);
    setPersonalData(null);
    setPaymentTransaction(null);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Shield className="text-primary text-2xl mr-3" />
                <h1 className="text-xl font-semibold text-[hsl(222,14%,29%)]">
                  SecureInsure Payment Portal
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Lock className="text-accent mr-1 w-4 h-4" />
                <span>Secure Connection</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="mr-1 w-4 h-4" />
                <span>1-800-SECURE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgressIndicator currentStep={currentStep} totalSteps={4} />

          <div className="bg-white rounded-lg shadow-sm">
            {currentStep === 1 && (
              <PolicyInformationStep
                onNext={handlePolicyNext}
                initialData={policyData}
              />
            )}
            
            {currentStep === 2 && (
              <PersonalInformationStep
                onNext={handlePersonalNext}
                onBack={handleBack}
                initialData={personalData}
              />
            )}
            
            {currentStep === 3 && policyData && personalData && (
              <ReviewStep
                policyData={policyData}
                personalData={personalData}
                onNext={handleReviewNext}
                onBack={handleBack}
                onEdit={handleEditStep}
                isProcessing={isProcessing}
              />
            )}
            
            {currentStep === 4 && paymentTransaction && (
              <ConfirmationStep
                transaction={paymentTransaction}
                onFinish={handleFinish}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[hsl(222,14%,29%)] text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="text-primary text-xl mr-2" />
                <span className="font-semibold text-white">SecureInsure</span>
              </div>
              <p className="text-sm text-gray-400">
                Trusted insurance solutions with secure payment processing since 1985.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-white mb-3">Support</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payment Issues</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold text-white mb-3">Legal</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold text-white mb-3">Security</h6>
              <div className="flex items-center space-x-4">
                <div className="text-xs text-gray-400">
                  <Shield className="text-accent mr-1 w-3 h-3 inline" />
                  SSL Secured
                </div>
                <div className="text-xs text-gray-400">
                  <Lock className="text-accent mr-1 w-3 h-3 inline" />
                  PCI Compliant
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-6 text-center text-sm text-gray-400">
            © 2024 SecureInsure Payment Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
