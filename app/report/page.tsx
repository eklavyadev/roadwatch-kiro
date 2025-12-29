'use client';

import { useState } from 'react';
import { IssueReport, Location, ValidationResult } from '@/lib/types';
import { ReportValidator } from '@/lib/validation';
import ReportForm from '@/components/ReportForm';
import LocationCapture from '@/components/LocationCapture';
import ValidationStatus from '@/components/ValidationStatus';

export default function ReportPage() {
  const [location, setLocation] = useState<Location | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLocationUpdate = (newLocation: Location | null) => {
    setLocation(newLocation);
    setValidation(null); // Reset validation when location changes
  };

  const handleSubmit = async (formData: any) => {
    if (!location) {
      alert('Please capture your location first');
      return;
    }

    setIsValidating(true);
    
    try {
      // Create report object
      const report: Partial<IssueReport> = {
        ...formData,
        location,
        reportedAt: new Date(),
        reportedBy: 'current-user' // In real app, get from auth
      };

      // Validate report (in real app, this would include existing reports)
      const validationResult = await ReportValidator.validateReport(report, []);
      setValidation(validationResult);

      if (validationResult.isValid && validationResult.score >= 70) {
        setIsSubmitting(true);
        // In real app: submit to backend
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        alert('Report submitted successfully!');
      }
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setIsValidating(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Report Road Issue</h1>
            <p className="text-gray-600 mt-2">
              Help improve road safety by reporting issues with precise location data
            </p>
          </div>

          <div className="p-6 space-y-6">
            <LocationCapture onLocationUpdate={handleLocationUpdate} />
            
            <ReportForm onSubmit={handleSubmit} />
            
            <ValidationStatus 
              validation={validation} 
              isValidating={isValidating} 
            />

            {validation && validation.isValid && validation.score >= 70 && (
              <div className="flex justify-end">
                <button
                  onClick={() => handleSubmit({})}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}