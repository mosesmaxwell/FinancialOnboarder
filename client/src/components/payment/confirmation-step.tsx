import { Check, Download, Mail, Home, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PaymentTransaction } from "@shared/schema";

interface ConfirmationStepProps {
  transaction: PaymentTransaction;
  onFinish: () => void;
}

export default function ConfirmationStep({ transaction, onFinish }: ConfirmationStepProps) {
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(parseFloat(amount));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    }).format(date);
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

  const getNextPaymentDate = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    return nextMonth.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert("Receipt download functionality would be implemented here.");
  };

  const handleEmailReceipt = () => {
    // In a real app, this would send an email receipt
    alert("Receipt has been emailed to your registered email address.");
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white rounded-full mb-4">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-semibold text-[hsl(222,14%,29%)] mb-2">
          Payment Successful!
        </h3>
        <p className="text-gray-600">
          Your payment has been processed successfully. A confirmation email has been sent to your email address.
        </p>
      </div>

      {/* Receipt */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold text-[hsl(222,14%,29%)] mb-2">
            Payment Receipt
          </h4>
          <p className="text-sm text-gray-500">
            Transaction ID: <span className="font-mono">{transaction.transactionId}</span>
          </p>
          <p className="text-sm text-gray-500">
            Date: {formatDate(transaction.createdAt)}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Policy Number:</span>
            <span>{transaction.policyNumber}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Coverage Type:</span>
            <span>{getCoverageTypeLabel(transaction.coverageType)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Payment Method:</span>
            <span>Credit Card (**** 4567)</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Premium Amount:</span>
            <span>{formatCurrency(transaction.premiumAmount)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Processing Fee:</span>
            <span>{formatCurrency(transaction.processingFee)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Tax:</span>
            <span>{formatCurrency(transaction.tax)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Amount Paid:</span>
            <span className="font-semibold text-primary">{formatCurrency(transaction.totalAmount)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium text-gray-700">Status:</span>
            <span className="inline-flex items-center px-2 py-1 bg-accent text-white text-xs font-medium rounded-full">
              <Check className="w-3 h-3 mr-1" />
              Completed
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleDownloadReceipt}
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button
              type="button"
              onClick={handleEmailReceipt}
              className="w-full bg-primary hover:bg-blue-700 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Receipt
            </Button>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
        <h5 className="font-semibold text-primary mb-3">What's Next?</h5>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-start">
            <CheckCircle className="text-accent mr-2 mt-0.5 w-4 h-4 flex-shrink-0" />
            Your policy is now active and coverage begins immediately
          </li>
          <li className="flex items-start">
            <Mail className="text-primary mr-2 mt-0.5 w-4 h-4 flex-shrink-0" />
            Policy documents will be emailed within 24 hours
          </li>
          <li className="flex items-start">
            <Calendar className="text-primary mr-2 mt-0.5 w-4 h-4 flex-shrink-0" />
            Next payment due: {getNextPaymentDate()}
          </li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <Button onClick={onFinish} className="bg-primary hover:bg-blue-700 text-white px-8">
          <Home className="w-4 h-4 mr-2" />
          Return to Portal
        </Button>
      </div>
    </div>
  );
}
