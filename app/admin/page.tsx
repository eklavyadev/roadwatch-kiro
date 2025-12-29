'use client';

import { useState } from 'react';

type Report = {
  id: string;
  image_url: string;
  location: string;
  lat: number;
  lng: number;
  severity: number;
  governing_body: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [activeTab, setActiveTab] =
    useState<'pending' | 'approved' | 'rejected'>('pending');
  const [toast, setToast] = useState<string | null>(null);

  /* ---------- TOAST ---------- */
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  /* ---------- AUTH ---------- */
  const login = async () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuth(true);
      fetchReports();
    } else {
      showToast('❌ Wrong password');
    }
  };
  /* ---------- DATA ---------- */
  const fetchReports = async () => {
    const res = await fetch('/api/admin/reports');
    const data = await res.json();
    setReports(data);
  };

  const updateStatus = async (
    id: string,
    status: 'pending' | 'approved' | 'rejected'
  ) => {
    await fetch('/api/admin/update', {
      method: 'POST',
      body: JSON.stringify({ id, status }),
    });
    fetchReports();
    showToast(`Status updated to ${status}`);
  };

  const deleteReport = async (id: string) => {
    const ok = confirm(
      'This will permanently delete the rejected report. Continue?'
    );
    if (!ok) return;

    const res = await fetch(`/api/admin/reports/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchReports();
      showToast('🗑 Report deleted');
    } else {
      showToast('❌ Delete failed');
    }
  };

  const filteredReports = reports.filter(
    (r) => r.status === activeTab
  );
  /* ---------- LOGIN ---------- */
  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020817]">
        <div className="border border-slate-700 p-6 rounded w-72 bg-[#0f172a]">
          <h2 className="text-lg font-bold mb-4 text-white">
            Admin Login
          </h2>
          <input
            type="password"
            placeholder="Admin password"
            className="border border-slate-600 bg-[#020817] text-white p-2 w-full mb-3 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={login}
            className="w-full bg-white text-black py-2 rounded font-medium"
          >
            Login
          </button>
        </div>
      </div>
    );
  }
  /* ---------- DASHBOARD ---------- */
  return (
    <div className="p-6 bg-[#020817] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['pending', 'approved', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab as 'pending' | 'approved' | 'rejected')
            }
            className={`px-4 py-2 rounded capitalize ${
              activeTab === tab
                ? 'bg-white text-black'
                : 'bg-[#0f172a] text-slate-300 border border-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 ? (
        <div className="border border-dashed border-slate-700 rounded p-10 text-center">
          <p className="text-gray-400 text-lg">
            No {activeTab} reports
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Reports will appear here once marked as {activeTab}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((r) => (
            <div
              key={r.id}
              className="border border-slate-700 rounded bg-[#0f172a]"
            >
              <img
                src={r.image_url}
                alt="report"
                className="h-64 w-full object-contain bg-black"
              />

              <div className="p-4 space-y-2 text-sm text-slate-300">
                <p>
                  <b className="text-white">Location:</b> {r.location}
                </p>
                <p>
                  <b className="text-white">Coordinates:</b>{' '}
                  {r.lat}, {r.lng}
                </p>
                <p>
                  <b className="text-white">Severity:</b>{' '}
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      r.severity >= 4
                        ? 'bg-red-600'
                        : r.severity === 3
                        ? 'bg-yellow-500 text-black'
                        : 'bg-green-600'
                    }`}
                  >
                    {r.severity}
                  </span>
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              </div>
              {/* Actions */}
              <div className="p-4 border-t border-slate-700 space-y-2">
                {r.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(r.id, 'approved')}
                      className="flex-1 bg-green-600 py-2 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(r.id, 'rejected')}
                      className="flex-1 bg-red-600 py-2 rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {r.status === 'approved' && (
                  <>
                    <span className="text-green-400 font-semibold">
                      ✔ Approved
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(r.id, 'pending')}
                        className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-1 rounded text-sm"
                      >
                        Move to Pending
                      </button>

                      <button
                        onClick={() => updateStatus(r.id, 'rejected')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </>
                )}

                {r.status === 'rejected' && (
                  <>
                    <span className="text-red-400 font-semibold">
                      ✖ Rejected
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(r.id, 'pending')}
                        className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-1 rounded text-sm"
                      >
                        Move to Pending
                      </button>

                      <button
                        onClick={() => updateStatus(r.id, 'approved')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded text-sm"
                      >
                        Approve
                      </button>
                    </div>

                    <button
                      onClick={() => deleteReport(r.id)}
                      className="w-full border border-red-500 text-red-400 hover:bg-red-600 hover:text-white py-2 rounded text-sm font-semibold"
                    >
                      🗑 Delete Permanently
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black border border-slate-700 text-white px-4 py-2 rounded shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}