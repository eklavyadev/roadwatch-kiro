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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.slice(0, 6).map((r) => (
        <div
          key={r.id}
          className="bg-[#0f172a] border border-slate-700 rounded overflow-hidden"
        >
          {/* Image */}
          <div className="bg-black">
            <img
              src={r.image_url}
              alt="pothole"
              className="h-48 w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-2 text-sm text-slate-300">
            <p className="text-white font-semibold">
              {r.location}
            </p>

            <p>
              <span className="text-white font-medium">
                Coordinates:
              </span>{' '}
              {r.lat.toFixed(5)}, {r.lng.toFixed(5)}
            </p>

            <p>
              <span className="text-white font-medium">
                Severity:
              </span>{' '}
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  r.severity >= 4
                    ? 'bg-red-600 text-white'
                    : r.severity === 3
                    ? 'bg-yellow-500 text-black'
                    : 'bg-green-600 text-white'
                }`}
              >
                {r.severity}
              </span>
            </p>

            <p className="text-xs text-slate-400">
              Reported on:{' '}
              {new Date(r.created_at).toLocaleDateString()}
            </p>

            <a
              href={`https://www.google.com/maps?q=${r.lat},${r.lng}`}
              target="_blank"
              className="text-cyan-400 text-xs underline"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}