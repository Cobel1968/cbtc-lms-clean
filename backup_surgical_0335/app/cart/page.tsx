'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, CreditCard, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Survival English - Trade & Travel', price: 149, category: 'Vocational' },
    { id: 2, name: 'Oil & Gas Technical Communication', price: 299, category: 'Technical' }
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 font-bold transition-colors">
          <ArrowLeft size={20} /> Back to Training Portal
        </Link>
        
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-8">
          Your Enrollment Cart
        </h1>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-6 border-b border-slate-100 last:border-0">
                <div>
                  <h3 className="font-black text-slate-900 uppercase tracking-tight">{item.name}</h3>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{item.category}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-black text-xl text-slate-900">${item.price}</span>
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-slate-400 uppercase text-xs font-bold tracking-[0.3em]">Total Investment</p>
              <p className="text-4xl font-black italic">${total}</p>
            </div>
            <Link href="/checkout" className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-3">
              Proceed to Checkout <CreditCard size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
