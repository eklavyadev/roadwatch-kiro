'use client';

import { ValidationResult } from '@/lib/types';

interface ValidationStatusProps {
  validation: ValidationResult | null;
  isValidating: boolean;
}

export default function ValidationStatus({ validation, isValidating }: ValidationStatusProps) {
  if (isValidating) {
    return (
      <div className="p-4 border rounded bg-blue-50">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span className="text-blue-700">Validating report...</span>
        </div>
      </div>
    );
  }

  if (!validation) return null;

  return (
    <div className={`p-4 border rounded ${
      validation.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">
          Validation {validation.isValid ? 'Passed' : 'Failed'}
        </h3>
        <div className={`px-3 py-1 rounded text-sm font-medium ${
          validation.score >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          Score: {validation.score}/100
        </div>
      </div>