'use client';
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseDB';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({ total_revenue: 0, active_students: 0, pending_payments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch_system_stats();
  }, []);

  const fetch_system_stats = async () => {
    // 1. Fetch all active enrollments to sum revenue
    const { data: enrollments, error } = await supabase
      .from('enrollments')
      .select(`status, courses ( price )`);

    if (!error && enrollments) {
      const revenue = enrollments
        .filter(e => e.status === 'active')
        .reduce((sum, e) => sum + (e.courses?.price || 0), 0);
      
      const active = enrollments.filter(e => e.status === 'active').length;
      const pending = enrollments.filter(e => e.status === 'pending').length;

      setStats({ total_revenue: revenue, active_students: active, pending_payments: pending });
    }
    setLoading(false);
  };

  if (loading) return <div className="p-10 font-mono text-center">LOADING COBEL ANALYTICS...</div>;

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tighter uppercase">Executive Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Revenue Card */}
        <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-xl shadow-blue-100">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Total Revenue</p>
          <p className="text-4xl font-black mt-2">{stats.total_revenue.toLocaleString()} <span className="text-lg font-normal">XOF</span></p>
        </div>

        {/* Active Students */}
        <div className="bg-gray-900 p-6 rounded-2xl text-white shadow-xl shadow-gray-200">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Active Learners</p>
          <p className="text-4xl font-black mt-2">{stats.active_students}</p>
        </div>

        {/* Pending Alerts */}
        <div className="bg-orange-500 p-6 rounded-2xl text-white shadow-xl shadow-orange-100">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Pending Cash</p>
          <p className="text-4xl font-black mt-2">{stats.pending_payments}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Operational Status</h3>
        <p className="text-sm text-gray-500">
          The <strong>Cobel AI Engine</strong> is currently monitoring {stats.active_students + stats.pending_payments} vocational journeys across your bilingual catalog.
        </p>
      </div>
    </div>
  );
}
