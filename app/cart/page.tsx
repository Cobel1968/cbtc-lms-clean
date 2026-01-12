'use client';

// Corrected import paths to match CamelCase filenames
import { useCart } from '@/app/contexts/CartContext'; 
import { useLanguage } from '@/app/contexts/languagecontext'; 
import Link from 'next/link';
import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const { language } = useLanguage();

  const t = {
    title: language === 'fr' ? 'Panier' : 'Shopping Cart',
    empty: language === 'fr' ? 'Votre panier est vide' : 'Your cart is empty',
    browse: language === 'fr' ? 'Parcourir les cours' : 'Browse Courses',
    total: language === 'fr' ? 'Total' : 'Total',
    clear: language === 'fr' ? 'Vider le panier' : 'Clear Cart',
    checkout: language === 'fr' ? 'Passer ÃƒÂ  la caisse' : 'Proceed to Checkout',
    remove: language === 'fr' ? 'Retirer' : 'Remove',
    back: language === 'fr' ? 'Retour aux cours' : 'Back to courses',
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-slate-300" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{t.title}</h1>
          <p className="text-slate-500 font-medium mb-8">{t.empty}</p>
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={16} />
          {t.back}
        </Link>

        <h1 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tighter">{t.title}</h1>
        
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-6 last:border-b-0"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 line-clamp-1">{item[language] || item.description}</p>
                  <p className="text-lg font-black text-indigo-600 mt-2">
                    {item.price_xof.toLocaleString()} XOF
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-bold text-xs uppercase tracking-widest"
                  aria-label={t.remove}
                >
                  <Trash2 size={16} />
                  {t.remove}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-8 border-t border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">{t.total}</span>
              <span className="text-3xl font-black text-slate-900">
                {totalPrice.toLocaleString()} XOF
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={clearCart}
                className="flex-1 px-6 py-4 bg-white text-slate-500 border border-slate-200 rounded-2xl hover:bg-slate-100 transition-all font-bold uppercase text-xs tracking-widest"
              >
                {t.clear}
              </button>
              <Link
                href="/checkout"
                className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all text-center font-bold uppercase text-xs tracking-widest shadow-lg shadow-indigo-100"
              >
                {t.checkout}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}