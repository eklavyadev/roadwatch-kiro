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