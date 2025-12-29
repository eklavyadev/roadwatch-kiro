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