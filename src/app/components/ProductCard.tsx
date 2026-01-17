import { Minus, Plus } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  minimalPembelian?: number;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
}

export function ProductCard({ product, quantity, onQuantityChange }: ProductCardProps) {
  const handleDecrease = () => {
    if (quantity > 0) {
      const minimalPembelian = product.minimalPembelian || 0;
      // Jika quantity sama dengan minimal pembelian, langsung ke 0
      // Jika lebih dari minimal, kurangi 1
      const nextQuantity = quantity === minimalPembelian ? 0 : quantity - 1;
      onQuantityChange(product.id, nextQuantity);
    }
  };

  const handleIncrease = () => {
    const nextQuantity = quantity === 0 && product.minimalPembelian 
      ? product.minimalPembelian 
      : quantity + 1;
    onQuantityChange(product.id, nextQuantity);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex gap-2 p-2.5 sm:p-3">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-semibold text-gray-900 text-xs sm:text-sm mb-0.5 truncate">
              {product.name}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-1 mb-1">
              {product.description}
            </p>
            <p className="font-bold text-amber-700 text-xs sm:text-sm mb-0.5">
              Rp {product.price.toLocaleString('id-ID')}
            </p>
            {product.minimalPembelian && (
              <p className="text-xs font-semibold text-amber-700">
                Min: {product.minimalPembelian}
              </p>
            )}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center gap-1">
          <button
            onClick={handleDecrease}
            disabled={quantity === 0}
            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors active:scale-95"
            aria-label="Kurangi"
          >
            <Minus className="w-3 h-3 text-gray-700" />
          </button>
          
          <div className="w-7 h-6 flex items-center justify-center">
            <span className="font-semibold text-xs sm:text-sm text-gray-900">
              {quantity}
            </span>
          </div>
          
          <button
            onClick={handleIncrease}
            className="w-6 h-6 rounded-full bg-amber-600 hover:bg-amber-700 flex items-center justify-center transition-colors active:scale-95 shadow-sm"
            aria-label="Tambah"
          >
            <Plus className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
