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
  /* ---------- SUBMIT ---------- */
  const submitReport = async () => {
    setError('');

    if (!image || !locationResolved) {
      setError('Please upload an image and detect location');
      return;
    }

    if (!isAccuracyAcceptable) {
      setError(
        'Location accuracy is too low. Please retry from an open area.'
      );
      return;
    }

    if (image.size > MAX_SIZE_MB * 1024 * 1024) {
      setError('Please upload an image smaller than 10MB');
      return;
    }

    setLoading(true);
    setSuccess(false);

    const finalLocation = landmark.trim()
      ? `(${landmark.trim()}) ${autoLocation}`
      : autoLocation;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('location', finalLocation);
    formData.append('lat', String(lat));
    formData.append('lng', String(lng));
    formData.append('severity', String(severity));

    const res = await fetch('/api/report/create', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
      return;
    }

    // Reset
    setImage(null);
    setLandmark('');
    setLat(null);
    setLng(null);
    setAccuracy(null);
    setAutoLocation('Not detected yet');
    setSeverity(3);
    setSuccess(true);
  };
  return (
    <div className="min-h-screen bg-[#020817] text-white px-6 py-20">
      <div className="mx-auto max-w-xl bg-[#0f172a] p-6 rounded border border-slate-700">
        <h1 className="text-2xl font-bold mb-6">Report a Pothole</h1>

        {success && (
          <div className="mb-4 rounded bg-green-600/20 border border-green-600 p-3 text-sm text-green-400">
            ✅ Pothole reported successfully.
          </div>
        )}

        {error && (
          <div className="mb-4 rounded bg-red-600/20 border border-red-600 p-3 text-sm text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* Image */}
        <label className="block mb-4">
          <span className="text-sm text-gray-300">
            Capture / Upload photo (max 10MB)
          </span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mt-2 block w-full text-sm"
          />
        </label>

        {image && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-full h-48 object-contain rounded border border-slate-600"
            />
          </div>
        )}