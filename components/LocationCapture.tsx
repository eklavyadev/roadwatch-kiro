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