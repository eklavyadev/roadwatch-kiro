'use client';

import { useEffect, useState } from 'react';

type Report = {
  id: string;
  image_url: string;
  location: string;
  lat: number;
  lng: number;
  severity: number;
  governing_body: string;
  created_at: string;
  status: string;
};

export function ApprovedPotholes() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/reports')
      .then((res) => res.json())
      .then((data) => {
        const approved = data.filter(
          (r: Report) => r.status === 'approved'
        );
        setReports(approved);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-gray-400 text-sm">
        Loading verified reports…
      </p>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="border border-dashed border-slate-700 rounded p-8 text-center">
        <p className="text-gray-400">
          No verified pothole reports yet.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Be the first to report a road issue and make an impact 🚧
        </p>
      </div>
    );
  }