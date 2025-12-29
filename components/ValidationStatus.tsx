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
      
      {validation.reasons.length > 0 && (
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Details:</h4>
          <ul className="text-sm space-y-1">
            {validation.reasons.map((reason, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className={validation.isValid ? 'text-green-600' : 'text-red-600'}>
                  {validation.isValid ? '✓' : '✗'}
                </span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {validation.duplicateId && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Duplicate detected:</strong> Similar report found nearby.
            Report ID: {validation.duplicateId}
          </p>
        </div>
      )}
    </div>
  );
}