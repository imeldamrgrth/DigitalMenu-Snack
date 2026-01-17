import { useState } from 'react';
import { ProductCard, Product } from '@/app/components/ProductCard';
import { CartSummary } from '@/app/components/CartSummary';
import { OrderForm, OrderFormData } from '@/app/components/OrderForm';
import { ImageWithFallback } from '@/app/components/common/ImageWithFallback';

// Product data
const PRODUCTS: Product[] = [
    {
    id: 'pastel',
    name: 'Pastel',
    description: 'Pastel goreng isi sayuran',
    price: 3500,
    minimalPembelian: 10,
    image: '/images/products/pastel-vol02.jpeg'
  },
  {
    id: 'pastel-frozen',
    name: 'Pastel Frozen',
    description: 'Pastel Beku isi sayuran, siap goreng',
    price: 3500,
    minimalPembelian: 10,
    image: '/images/products/pastelfrozen-vol02.jpeg'
  },
  {
    id: 'risol-mayo',
    name: 'Risol Mayo',
    description: 'Risol goreng mayo',
    price: 4500,
    minimalPembelian: 20,
    image: '/images/products/risolmayo-vol02.jpeg'
  },
  {
    id: 'risol-sayur',
    name: 'Risol Sayur',
    description: 'Risol goreng isi sayuran',
    price: 4000,
    minimalPembelian: 20,
    image: '/images/products/risolsayur-vol02.jpeg'
  },
  {
    id: 'lemper-ayam',
    name: 'Lemper Ayam',
    description: 'Lemper Ayam Gurih',
    price: 6500,
    minimalPembelian: 35,
    image: '/images/products/Lemper-Ayam.jpg'
  },
  {
    id: 'kue-lumpur',
    name: 'Kue Lumpur',
    description: 'Kue kentang halus dengan kismis',
    price: 3500,
    minimalPembelian: 35,
    image: '/images/products/kuelumpur-vol02.jpg'
  },
  {
    id: 'arem-arem',
    name: 'Arem-arem',
    description: 'Nasi gulung berisi kentang dan wortel berbumbu ringan',
    price: 3500,
    minimalPembelian: 35,
    image: '/images/products/arem-vol02.jpeg'
  },
  {
    id: 'dadar-gulung-og',
    name: 'DarLung OG',
    description: 'Dadar gulung original isi unti kelapa',
    price: 3500,
    minimalPembelian: 20,
    image: '/images/products/darlungOG-vol02.jpeg'
  },
  {
    id: 'dadar-gulung-coklat',
    name: 'DarLung Coklat',
    description: 'Dadar gulung isi vla coklat',
    price: 3500,
    minimalPembelian: 20,
    image: '/images/products/darlungCok-vol02.jpeg'
  },
  {
    id: 'wajik',
    name: 'Wajik',
    description: 'Ketan manis legit berpadu dengan aroma karamel gula merah, setiap gigitannya bikin nostalgia',
    price: 3500,
    minimalPembelian: 35,
    image: '/images/products/wajik.jpg'
  },
  {
    id: 'wingko',
    name: 'Wingko',
    description: 'Kue tradisional berbahan ketan dan kelapa manis dengan aroma panggang khas',
    price: 3500,
    minimalPembelian: 35,
    image: '/images/products/Wingko.jpg'
  }
];

// WhatsApp business number 
const WHATSAPP_NUMBER = '6281219892200';

function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleQuantityChange = (productId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const calculateTotals = () => {
    let totalItems = 0;
    let totalPrice = 0;

    Object.entries(cart).forEach(([productId, quantity]) => {
      if (quantity > 0) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
          totalItems += quantity;
          totalPrice += product.price * quantity;
        }
      }
    });

    return { totalItems, totalPrice };
  };

  const generateGoogleCalendarLink = (
  orderDate: string,
  deliveryTime: string,
  customerName: string
) => {
  const start = new Date(`${orderDate}T${deliveryTime}`);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // durasi 1 jam

  const format = (date: Date) =>
    date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const title = encodeURIComponent(`Pesanan - ${customerName}`);
  const details = encodeURIComponent(
    'Pengingat pesanan'
  );

  // REMINDER: 30 MENIT SEBELUM EVENT
  const reminders = encodeURIComponent('popup:30');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE
&text=${title}
&dates=${format(start)}/${format(end)}
&details=${details}
&reminders=${reminders}`.replace(/\n/g, '');
};

  const handleOrderSubmit = (formData: OrderFormData) => {
    const { totalItems, totalPrice } = calculateTotals();
    
    // Build WhatsApp message
    let message = ` *PESANAN BARU*\n\n`;
    message += `Halo! \n`;
    message += `Ada pesanan baru dengan detail berikut:\n\n`;

    message += `━━━━━━━━━━━━━━\n`;
    message += `*DATA PELANGGAN*\n`;
    message += `Nama    : ${formData.name}\n`;
    message += `Alamat  : ${formData.address}\n`;
    message += `Tanggal : ${new Date(formData.orderDate).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}\n`;
    message += `Waktu   : ${formData.deliveryTime} WIB\n\n`;

    message += `━━━━━━━━━━━━━━\n`;
    message += `*DETAIL PESANAN*\n`;

    Object.entries(cart).forEach(([productId, quantity]) => {
      if (quantity > 0) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
          const subtotal = product.price * quantity;
          message += `• ${product.name}\n`;
          message += `  ${quantity} × Rp ${product.price.toLocaleString('id-ID')}\n`;
          message += `  Subtotal: Rp ${subtotal.toLocaleString('id-ID')}\n\n`;
        }
      }
    });
    
    message += `━━━━━━━━━━━━━━\n`;
    message += `*RINGKASAN*\n`;
    message += `Total Item : ${totalItems} pcs\n`;
    message += `Total Bayar: *Rp ${totalPrice.toLocaleString('id-ID')}*\n\n`;

    
    if (formData.notes) {
      message += `*CATATAN*\n${formData.notes}\n\n`;
    }
    
    message += `━━━━━━━━━━━━━━\n`;
    message += `Terima kasih atas pesanan Anda\n`;
    message += `Kami siap menyiapkan pesanan terbaik untuk Anda\n\n`;

    // Add Google Calendar link
    const calendarLink = generateGoogleCalendarLink(formData.orderDate, formData.deliveryTime, formData.name);
    message += `━━━━━━━━━━━━━━\n`;
    message += `*PENGINGAT KALENDER*\n`;
    message += `30 menit sebelum pengiriman\n`;
    message += `Klik link berikut untuk menyimpan ke Google Calendar:\n`;
    message += `${calendarLink}\n`;

    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setShowOrderForm(false);
  };

  const { totalItems, totalPrice } = calculateTotals();

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Hero Section */}
      <div className="relative h-[45vh] max-h-[400px] min-h-[300px] bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
        <ImageWithFallback
            src="/images/hero-logo02.jpeg"
            alt="Imel Snack - Kue Basah Tradisional"
            className="w-full h-full object-cover"
          />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>

      {/* Main Content - Overlapping Card */}
      <div className="relative -mt-8 px-4 pb-32">
        <div className="bg-white rounded-t-3xl shadow-xl p-6 min-h-[60vh]">
          {/* Section Title */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Menu Hari Ini</h2>
            <p className="text-sm text-gray-600">Pilih kue kesukaan Anda</p>
            <p className="text-xs text-amber-700 font-semibold mt-2">⚠️ PO kue minimal H-2, kecuali Pastel</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-4">
            {PRODUCTS.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Cart Summary */}
      <CartSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        onOrderClick={() => setShowOrderForm(true)}
      />

      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm
          onSubmit={handleOrderSubmit}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </div>
  );
}

export default App;