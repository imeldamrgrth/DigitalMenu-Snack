import { ShoppingBag } from 'lucide-react';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onOrderClick: () => void;
}

export function CartSummary({ totalItems, totalPrice, onOrderClick }: CartSummaryProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-4 sm:px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 sm:p-4">
        {/* Cart Info */}
        <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-600">Keranjang</p>
              <p className="font-semibold text-gray-900 text-sm">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-600">Total</p>
            <p className="font-bold text-amber-700 text-base sm:text-lg">
              Rp {totalPrice.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
        
        {/* Order Button */}
        <button
          onClick={onOrderClick}
          disabled={totalItems === 0}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Pesan via WhatsApp
        </button>
      </div>
    </div>
  );
}
