'use client';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, CreditCard, CheckCircle, ShieldCheck, AlertCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

// Contexts (Using consistent lowercase paths for Linux compatibility)
import { useCart } from '@/app/contexts/CartContext';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { language } = useLanguage() || { language: 'en' };
  const supabase = createClient();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Translations
  const t = {
    title: language === 'fr' ? 'Paiement' : 'Checkout',
    back: language === 'fr' ? 'Retour au panier' : 'Back to cart',
    orderSummary: language === 'fr' ? 'Résumé de la commande' : 'Order Summary',
    total: language === 'fr' ? 'Total' : 'Total',
    cardNumber: language === 'fr' ? 'Numéro de carte' : 'Card Number',
    expiryDate: language === 'fr' ? "Date d'expiration" : 'Expiry Date',
    cvv: language === 'fr' ? 'CVV' : 'CVV',
    cardholderName: language === 'fr' ? 'Nom du titulaire' : 'Cardholder Name',
    placeOrder: language === 'fr' ? 'Passer la commande' : 'Place Order',
    processing: language === 'fr' ? 'Traitement...' : 'Processing...',
    secure: language === 'fr' ? 'Paiement sécurisé' : 'Secure Payment',
    empty: language === 'fr' ? 'Votre panier est vide' : 'Your cart is empty',
    browse: language === 'fr' ? 'Parcourir les cours' : 'Browse Courses',
    confirmedTitle: language === 'fr' ? 'Confirmée !' : 'Confirmed!',
    confirmedBody: language === 'fr' 
      ? 'Merci pour votre achat. Vos modules sont déverrouillés.' 
      : 'Thank you for your purchase. Your modules are unlocked.',
    goDashboard: language === 'fr' ? 'Accéder au Dashboard' : 'Go to Dashboard',
    syncError: language === 'fr' 
      ? 'Paiement reçu, mais erreur de synchronisation. Support notifié.' 
      : 'Payment received, but sync failed. Support notified.'
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);
    const transactionId = `TX-${Date.now()}`;

    try {
      // 1. PAYMENT SIMULATION
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 2. AUTH CHECK
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Session lost. Please log in again.");

      // 3. DATABASE UPDATE (Pedagogical Role Sync)
      const hasProTier = cart.some(item => item.id.includes('trainer') || item.type === 'SUBSCRIPTION');
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          subscription_tier: hasProTier ? 'pro' : 'student',
          role: hasProTier ? 'lead_trainer' : 'student' 
        })
        .eq('id', user.id);

      // 4. ROLLBACK LOGGING (Feature: Analog-to-Digital Integrity)
      if (updateError) {
        await supabase.from('audit_logs').insert({
          user_id: user.id,
          event: 'CHECKOUT_SYNC_FAILURE',
          details: { transactionId, cart, error: updateError.message },
          status: 'pending_manual_review'
        });
        throw new Error(t.syncError);
      }

      // 5. SUCCESS
      setIsProcessing(false);
      setIsComplete(true);
      clearCart();

    } catch (err: any) {
      console.error("[Cobel Engine] Checkout Error:", err.message);
      setError(err.message);
      setIsProcessing(false);
    }
  };

  // ... [Success UI and Form UI logic remains the same as your provided code]
  // Note: Just ensure your Summary section uses item.price_xof as per your design.
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
       {/* ... existing layout logic ... */}
    </div>
  );
}
