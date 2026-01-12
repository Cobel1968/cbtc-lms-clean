'use client';

import { useLanguage } from '@/app/contexts/languagecontext';
import { useCart } from '@/app/contexts/CartContext';

export default function StateDebugger() {
  const { language, isMounted: langMounted } = useLanguage();
  const { cart, total_price, isMounted: cartMounted } = useCart();

  // Only show in development or for admin 'Abel C.'
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black/80 text-white text-xs rounded-lg shadow-xl z-50 font-mono border border-green-500">
      <h4 className="text-green-500 font-bold mb-2 uppercase">ðŸ“¡ Cobel Engine State</h4>
      <div className="space-y-1">
        <p>Language: <span className="text-yellow-400">{language.toUpperCase()}</span></p>
        <p>Lang Mounted: <span className={langMounted ? "text-green-400" : "text-red-400"}>{String(langMounted)}</span></p>
        <hr className="border-gray-700 my-2" />
        <p>Cart Items: <span className="text-yellow-400">{cart.length}</span></p>
        <p>Total: <span className="text-yellow-400">{total_price.toLocaleString()} XOF</span></p>
        <p>Cart Mounted: <span className={cartMounted ? "text-green-400" : "text-red-400"}>{String(cartMounted)}</span></p>
      </div>
    </div>
  );
}