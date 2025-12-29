'use client';

import { useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api';

type Report = {
  id: string;
  lat: number;
  lng: number;
  location: string;
  severity: number;
};

export default function ApprovedPotholesMap() {
  const [reports, setReports] = useState<Report[]>([]);
  const [active, setActive] = useState<Report | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    fetch('/api/admin/reports')
      .then((res) => res.json())
      .then((data) =>
        setReports(data.filter((r: any) => r.status === 'approved'))
      );
  }, []);

  if (!isLoaded) {
    return <p className="text-gray-400">Loading map…</p>;
  }

  if (reports.length === 0) {
    return (
      <p className="text-gray-400 text-sm">
        No approved potholes to display on map yet.
      </p>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '500px' }}
      zoom={12}
      center={{ lat: reports[0].lat, lng: reports[0].lng }}
      onLoad={(map) => {
        const bounds = new window.google.maps.LatLngBounds();
        reports.forEach((r) =>
          bounds.extend({ lat: r.lat, lng: r.lng })
        );
        map.fitBounds(bounds);
      }}
    >
      {reports.map((r) => (
        <Marker
          key={r.id}
          position={{ lat: r.lat, lng: r.lng }}
          onClick={() => setActive(r)}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: r.severity >= 4 ? '#ef4444' : r.severity === 3 ? '#eab308' : '#22c55e',
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          }}
        />
      ))}

      {active && (
        <InfoWindow
          position={{ lat: active.lat, lng: active.lng }}
          onCloseClick={() => setActive(null)}
        >
          <div
            style={{
              background: '#0f172a',
              color: 'white',
              padding: '8px',
              borderRadius: '6px',
              minWidth: '180px',
            }}
          >
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              {active.location}
            </p>
            <p style={{ fontSize: '12px', opacity: 0.8 }}>
              Severity: {active.severity}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}