'use client';

import { useState } from 'react';

const MAX_SIZE_MB = 10;
const MAX_GPS_ACCURACY = 200; // meters

export default function ReportPotholePage() {
  const [image, setImage] = useState<File | null>(null);

  // System-detected (read-only)
  const [autoLocation, setAutoLocation] = useState('Not detected yet');

  // User-provided
  const [landmark, setLandmark] = useState('');

  // GPS
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const [severity, setSeverity] = useState(3);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const locationResolved = lat !== null && lng !== null;
  const isAccuracyAcceptable =
    accuracy !== null && accuracy <= MAX_GPS_ACCURACY;
  /* ---------- GET LOCATION ---------- */
  const getLocation = () => {
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation not supported on this device');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        setLat(latitude);
        setLng(longitude);
        setAccuracy(Math.round(pos.coords.accuracy));

        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );

          const data = await res.json();

          if (data.status === 'OK' && data.results?.length) {
            setAutoLocation(data.results[0].formatted_address);
          } else {
            setAutoLocation('GPS reported location');
          }
        } catch {
          setAutoLocation('GPS reported location');
        }
      },
      () => {
        setError('Location permission denied');
      },
      { enableHighAccuracy: true }
    );
  };