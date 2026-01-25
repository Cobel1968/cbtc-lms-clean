'use client';
import { useState } from 'react';
import { Send, UserPlus, Mail, ShieldCheck } from 'lucide-react';
import { generateBilingualInvite } from '@/lib/InvitationEngine';

export default function StudentInviteModal() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [language, setLanguage] = useState<'en' | 'fr'>('fr');
  const [sent, setSent] = useState(false);

  const handleInvite = () => {
    // Logic: In a real environment, this triggers a Supabase Auth invitation
    // and sends the email via a service like Resend or SendGrid.
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <UserPlus className="text-blue-600" size={20} />
        </div>
        <h3 className="font-bold text-gray-800">Invite New Student</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase">Student Name</label>
          <input 
            type="text" 
            className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase">Email Address</label>
          <input 
            type="email" 
            className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="john@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="lang" checked={language === 'fr'} onChange={() => setLanguage('fr')} />
            <span className="text-sm">Français</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="lang" checked={language === 'en'} onChange={() => setLanguage('en')} />
            <span className="text-sm">English</span>
          </label>
        </div>

        <button 
          onClick={handleInvite}
          disabled={!email || sent}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            sent ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {sent ? <ShieldCheck size={18} /> : <Send size={18} />}
          {sent ? 'Invitation Sent' : 'Initialize Technical Path'}
        </button>
      </div>

      <p className="mt-4 text-[10px] text-gray-400 text-center italic">
        This will generate a unique ID and initialize Temporal Optimization.
      </p>
    </div>
  );
}
