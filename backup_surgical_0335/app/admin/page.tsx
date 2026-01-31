'use client';
import { useState } from 'react';
import { Check, X, Eye, ShieldCheck, Lock } from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const [pendingPayments, setPendingPayments] = useState([
    { id: 'TRX-9921', user: 'Student_Abidjan_01', course: 'Survival English', amount: '149 USD', status: 'Pending' }
  ]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 w-full max-w-md text-center">
          <Lock className="mx-auto text-blue-500 mb-4" size={48} />
          <h2 className="text-xl font-black text-white uppercase mb-6">Admin Access</h2>
          <input 
            type="password" 
            placeholder="Enter Admin Key" 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white mb-4 outline-none focus:border-blue-500"
            onChange={(e) => setPass(e.target.value)}
          />
          <button 
            onClick={() => pass === 'COBEL2026' && setIsAuthenticated(true)}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all"
          >
            Authorize
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Cobel Admin</h1>
            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Enrollment Control Center</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-slate-500 hover:text-white text-xs font-bold uppercase">Logout</button>
        </header>

        <div className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700">
          <table className="w-full text-left">
            <thead className="bg-slate-700/50 text-slate-400 text-xs uppercase tracking-widest">
              <tr>
                <th className="p-6">TRX ID</th>
                <th>Student</th>
                <th>Course</th>
                <th>Receipt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {pendingPayments.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-6 font-mono text-blue-400">{pay.id}</td>
                  <td className="font-bold">{pay.user}</td>
                  <td>{pay.course}</td>
                  <td><button className="text-xs bg-slate-600 px-3 py-1 rounded-full hover:bg-blue-400 transition-all">View Screenshot</button></td>
                  <td className="flex gap-2 p-6">
                    <button className="p-2 bg-green-600 rounded-lg hover:bg-green-500"><Check size={20} /></button>
                    <button className="p-2 bg-red-600 rounded-lg hover:bg-red-500"><X size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
