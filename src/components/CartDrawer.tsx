import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck,
  Phone
} from 'lucide-react';
import { Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) => {
  const [area, setArea] = useState('Clifton / DHA');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [ordered, setOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.pricePkr, 0);
  const deliveryPkr = cart.length > 0 ? 350 : 0;
  const totalPkr = subtotal + deliveryPkr;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !address) return;
    setOrdered(true);
    setTimeout(() => {
      onClearCart();
      setOrdered(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between z-10 h-full overflow-y-auto"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Karachi Express Cart</h3>
                <span className="text-xs font-mono text-cyan-400 font-semibold">({cart.length})</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            {ordered ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Order Confirmed!</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Our Saddar logistics hub has dispatched your order to <strong className="text-slate-200">{area}</strong>. Rider will call <strong className="text-slate-200">{phone}</strong> for Cash on Delivery.
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-400">Your cart is currently empty.</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Browse Trending Imports
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3"
                  >
                    <img
                      src={item.directImageUrl}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.title}
                      </h4>
                      <div className="text-[11px] text-cyan-400 font-mono font-bold mt-1">
                        ₨ {item.pricePkr.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Truck className="w-3 h-3 text-emerald-400" />
                        <span>Ready in Saddar Hub</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Checkout COD Form */}
                <form onSubmit={handlePlaceOrder} className="pt-4 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Karachi Delivery Information
                  </h4>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Shaikh"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">WhatsApp / Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="0300-1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Karachi District</label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="Clifton / DHA">Clifton / DHA</option>
                        <option value="Gulshan-e-Iqbal">Gulshan-e-Iqbal</option>
                        <option value="Saddar / PECHS">Saddar / PECHS</option>
                        <option value="North Nazimabad">North Nazimabad</option>
                        <option value="Gulistan-e-Jauhar">Gulistan-e-Jauhar</option>
                        <option value="Bahria Town Karachi">Bahria Town Karachi</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Street Address</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Flat/House, Block, Landmark..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Summary & Price */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Items Subtotal:</span>
                      <span className="font-mono text-slate-200">₨ {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Karachi Express Courier:</span>
                      <span className="font-mono text-slate-200">₨ {deliveryPkr}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 flex justify-between font-bold text-sm">
                      <span className="text-white">Cash on Delivery Total:</span>
                      <span className="text-cyan-400 font-mono">₨ {totalPkr.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Confirm Karachi Cash-on-Delivery Order</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
