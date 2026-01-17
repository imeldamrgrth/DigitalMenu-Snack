import { useState } from 'react';
import { X, User, MapPin, Calendar, FileText, Clock } from 'lucide-react';

export interface OrderFormData {
  name: string;
  address: string;
  orderDate: string;
  deliveryTime: string;
  notes: string;
}

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  onClose: () => void;
}

export function OrderForm({ onSubmit, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    address: '',
    orderDate: '',
    deliveryTime: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim() || !formData.orderDate || !formData.deliveryTime) {
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center z-[100] p-0 md:p-4 overflow-hidden">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-md h-[100dvh] md:h-auto md:max-h-[95vh] overflow-hidden flex flex-col shadow-2xl mx-0 md:mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between flex-shrink-0">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold mb-0.5">Detail Pesanan</h2>
            <p className="text-xs text-amber-100">Lengkapi data untuk memesan</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors active:scale-95 flex-shrink-0"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 pb-20 sm:pb-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              <User className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Nama Lengkap</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white transition-all text-sm"
              placeholder="Masukkan nama Anda"
            />
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Alamat Lengkap</span>
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white resize-none transition-all text-sm"
              placeholder="Contoh: Jl. Mawar No. 123"
            />
          </div>

          {/* Order Date Field */}
          <div>
            <label htmlFor="orderDate" className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Tanggal Pengambilan</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="orderDate"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white transition-all text-sm"
            />
          </div>

          {/* Delivery Time Field */}
          <div>
            <label htmlFor="deliveryTime" className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Waktu Pengambilan</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="deliveryTime"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white transition-all text-sm"
            />
          </div>

          {/* Notes Field */}
          <div>
            <label htmlFor="notes" className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Catatan</span>
              <span className="text-xs font-normal text-gray-500">(Opsional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white resize-none transition-all text-sm"
              placeholder="Contoh: Tolong ekstra cabai"
            />
          </div>

          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 sm:p-3">
            <p className="text-xs text-amber-900 leading-relaxed">
              💡 <span className="font-semibold">Info:</span> Pesanan akan dikirim ke WhatsApp untuk konfirmasi dan Google Calendar reminder.
            </p>
          </div>
        </form>

        {/* Footer with Submit Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 sm:p-4 flex-shrink-0">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="hidden sm:inline">Kirim via WhatsApp</span>
            <span className="sm:hidden">Kirim</span>
          </button>
        </div>
      </div>
    </div>
  );
}