import { Minus, Plus } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
}

export function ProductCard({ product, quantity, onQuantityChange }: ProductCardProps) {
  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(product.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
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
            <h3 className="font-semibold text-gray-900 text-base mb-0.5 truncate">
              {product.name}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
              {product.description}
            </p>
            <p className="font-bold text-amber-700 text-base">
              Rp {product.price.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2">
          <button
            onClick={handleDecrease}
            disabled={quantity === 0}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors active:scale-95"
            aria-label="Kurangi"
          >
            <Minus className="w-4 h-4 text-gray-700" />
          </button>
          
          <div className="w-10 h-8 flex items-center justify-center">
            <span className="font-semibold text-base text-gray-900">
              {quantity}
            </span>
          </div>
          
          <button
            onClick={handleIncrease}
            className="w-8 h-8 rounded-full bg-amber-600 hover:bg-amber-700 flex items-center justify-center transition-colors active:scale-95 shadow-sm"
            aria-label="Tambah"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
