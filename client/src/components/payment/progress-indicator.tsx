import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Policy Info",
  "Personal Info", 
  "Review",
  "Confirmation"
];

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[hsl(222,14%,29%)]">Payment Process</h2>
          <span className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="flex items-center">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isLast = index === totalSteps - 1;

            return (
              <div key={stepNumber} className="flex items-center">
                {/* Step Circle */}
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      isCompleted
                        ? "step-indicator-completed"
                        : isActive
                        ? "step-indicator-active"
                        : "step-indicator-inactive"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      isCompleted || isActive
                        ? isCompleted
                          ? "text-accent"
                          : "text-primary"
                        : "text-gray-500"
                    }`}
                  >
                    {stepLabels[index]}
                  </span>
                </div>
                
                {/* Progress Line */}
                {!isLast && (
                  <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isCompleted ? "bg-accent" : "bg-gray-300"
                      }`}
                      style={{
                        width: isCompleted ? "100%" : "0%"
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
