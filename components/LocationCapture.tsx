'use client';

import { useState, useEffect } from 'react';
import { Location } from '@/lib/types';
import { LocationService } from '@/lib/location';

interface LocationCaptureProps {
  onLocationUpdate: (location: Location | null) => void;
}

export default function LocationCapture({ onLocationUpdate }: LocationCaptureProps) {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const captureLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const loc = await LocationService.getEnhancedLocation();
      setLocation(loc);
      onLocationUpdate(loc);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Location error');
      onLocationUpdate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    captureLocation();
  }, []);

  return (
    <div className="space-y-4 p-4 border rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Location</h3>
        <button
          onClick={captureLocation}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Getting Location...' : 'Refresh Location'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {location && (
        <div className="space-y-2">
          <div className="text-sm">
            <strong>Coordinates:</strong> {LocationService.formatCoordinates(location)}
          </div>
          <div className="text-sm">
            <strong>Accuracy:</strong> {location.accuracy.toFixed(1)}m 
            <span className={`ml-2 px-2 py-1 rounded text-xs ${
              location.accuracy <= 10 ? 'bg-green-100 text-green-800' :
              location.accuracy <= 50 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {LocationService.getAccuracyLevel(location.accuracy)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}