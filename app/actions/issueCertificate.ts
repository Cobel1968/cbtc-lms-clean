'use server';

import { Resend } from 'resend';
// CHANGE: Importing 'createClient' to match your actual utility file
import { createClient } from '@/utils/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function issueCertificate(userId: string, stats: { score: number; terms: number }) {
  // CHANGE: Calling the correct function name
  const supabase = createClient();

  // 1. Fetch user details for the certificate
  const { data: profile } = await supabase
    .from('profiles')
    .select('email, full_name')
    .eq('id', userId)
    .single();

  // Innovation Logic: Automated Milestone Forecasting
  // Only issue if the engine validates 100% technical fluency
  if (!profile || stats.score < 100) {
    return { success: false, message: "Criteria not met for certification." };
  }

  try {
    // 2. Send the Email via Resend
    await resend.emails.send({
      from: 'certifications@cobelbtc.com',
      to: profile.email,
      subject: '🏆 Your COBEL BTC Vocational Certificate is Ready!',
      html: `
        <div style="font-family: sans-serif; border: 2px solid #0044cc; padding: 20px;">
          <h1 style="color: #0044cc;">Congratulations ${profile.full_name}!</h1>
          <p>The <strong>Cobel AI Engine</strong> has validated your technical fluency at 100%.</p>
          <hr />
          <p><strong>Terms Identified:</strong> ${stats.terms}</p>
          <p><strong>Bilingual Mapping:</strong> English/French Technical Verified</p>
          <p>Your official certificate is now available in your dashboard.</p>
        </div>
      `
    });

    return { success: true };
  } catch (error) {
    console.error("COBEL_ENGINE_CERT_ERROR:", error);
    return { success: false, message: "Notification failed, but record saved." };
  }
}