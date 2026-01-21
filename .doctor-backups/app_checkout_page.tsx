'use client';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, CreditCard, CheckCircle, ShieldCheck , AlertCircle} from 'lucide-react';

// Contexts (Linux/Vercel case-sensitive)
import { useCart } from '@/app/contexts/CartContext';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const {        language        } = useLanguage() || { language: 'en', t: (k) => k };

  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

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
    processing: language === 'fr' ? 'Traitement en cours...' : 'Processing...',
    secure: language === 'fr' ? 'Paiement sécurisé' : 'Secure Payment',
    empty: language === 'fr' ? 'Votre panier est vide' : 'Your cart is empty',
    browse: language === 'fr' ? 'Parcourir les cours' : 'Browse Courses',
    confirmedTitle: language === 'fr' ? 'Confirmée !' : 'Confirmed!',
    confirmedBody:
      language === 'fr'
        ? 'Merci pour votre achat. Vos modules de formation sont maintenant déverrouillés.'
        : 'Thank you for your purchase. Your training modules are now unlocked.',
    goDashboard: language === 'fr' ? 'Accéder au Dashboard' : 'Go to Dashboard',
  };

  const handleCheckout = async () => {
    setIsProcessing(true);

    // Simulate payment processing (Pedagogical Logic flow)
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      clearCart();
    }, 2000);
  };

  // Empty cart (before completion)
  if (cart.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-12 text-center max-w-md w-full">
          <p className="text-slate-500 font-medium mb-8 text-lg">{t.empty}</p>
          <Link
            href="/"
            className="block w-full bg-indigo-600 text-white px-6 py-4 rounded-2xl hover:bg-indigo-700 transition-all font-bold uppercase text-sm tracking-widest shadow-lg shadow-indigo-100"
          >
            {t.browse}
          </Link>
        </div>
      </div>
    );
  }

  // Success screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-emerald-500" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
            {t.confirmedTitle}
          </h1>
          <p className="text-slate-500 font-medium mb-8">{t.confirmedBody}</p>
          <Link
            href="/dashboard"
            className="block w-full bg-slate-900 text-white px-6 py-4 rounded-2xl hover:bg-black transition-all font-bold uppercase text-sm tracking-widest"
          >
            {t.goDashboard}
          </Link>
        </div>
      </div>
    );
  }

  // Checkout screen
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={16} />
          {t.back}
        </Link>

        <h1 className="text-4xl font-black text-slate-900 mb-10 uppercase tracking-tighter">{t.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Payment form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck size={24} className="text-emerald-500" />
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{t.secure}</h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
                    {t.cardNumber}
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
                      {t.expiryDate}
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
                      {t.cvv}
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
                    {t.cardholderName}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'fr' ? 'Nom complet' : 'Full Name'}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 p-8 sticky top-8">
              <h2 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight">{t.orderSummary}</h2>

              <div className="space-y-4 mb-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <span className="text-slate-500 text-sm font-medium pr-4">{item.title}</span>
                    <span className="font-bold text-slate-900 whitespace-nowrap">
                      {item.price_xof.toLocaleString()} XOF
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{t.total}</span>
                  <span className="text-2xl font-black text-indigo-600">
                    {totalPrice.toLocaleString()} XOF
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-700 transition-all disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center gap-3 shadow-lg shadow-indigo-100"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    {t.processing}
                  </>
                ) : (
                  <>
                    <CreditCard size={18} />
                    {t.placeOrder}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}