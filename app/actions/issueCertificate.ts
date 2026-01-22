'use server';

import { Resend } from 'resend';
import { createServerClient } from '@/utils/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function issueCertificate(userId: string, stats: { score: number; terms: number }) {
  const supabase = createServerClient();

  // 1. Fetch user details for the certificate
  const { data: profile } = await supabase
    .from('profiles')
    .select('email, full_name')
    .eq('id', userId)
    .single();

  if (!profile || stats.score < 100) return { success: false, message: "Criteria not met." };

  try {
    // 2. Send the Email (In a real production app, you'd generate the PDF buffer here)
    await resend.emails.send({
      from: 'certifications@cobelbtc.com',
      to: profile.email,
      subject: '🏆 Your COBEL BTC Vocational Certificate is Ready!',
      html: `
        <h1>Congratulations ${profile.full_name}!</h1>
        <p>Our AI Engine has validated your technical fluency at 100%.</p>
        <p><strong>Terms Identified:</strong> ${stats.terms}</p>
        <p>Your official certificate is now available in your dashboard.</p>
      `
    });

    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false };
  }
}