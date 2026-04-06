import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, CreditCard, Truck, ShieldCheck, ShoppingBag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/src/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600"
        >
          <CheckCircle2 size={64} />
        </motion.div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Order Confirmed!</h2>
          <p className="text-slate-500 text-lg">Thank you for your purchase. Your order #123456789 has been placed successfully and will be shipped soon.</p>
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 text-left space-y-4">
          <h3 className="font-bold text-slate-900">Order Details</h3>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Order Number</span>
            <span className="font-bold text-slate-900">#123456789</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Date</span>
            <span className="font-bold text-slate-900">April 2, 2026</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Total Amount</span>
            <span className="font-bold text-blue-600">₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Payment Method</span>
            <span className="font-bold text-slate-900">Visa ending in 4242</span>
          </div>
        </div>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-10 rounded-full font-bold text-lg shadow-xl shadow-blue-200" render={<Link to="/shop" />} nativeButton={false}>
          CONTINUE SHOPPING
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link to="/cart" className="hover:text-blue-600 transition-colors">Cart</Link>
        <ChevronRight size={14} />
        <span className="text-slate-900 font-bold">Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <div className="space-y-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">1</div>
              Shipping Information
            </h2>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                <Input placeholder="John" className="h-12 rounded-xl border-slate-200" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                <Input placeholder="Doe" className="h-12 rounded-xl border-slate-200" required />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl border-slate-200" required />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address</label>
                <Input placeholder="123 Main St, Apt 4B" className="h-12 rounded-xl border-slate-200" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">City</label>
                <Input placeholder="New York" className="h-12 rounded-xl border-slate-200" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Postal Code</label>
                <Input placeholder="10001" className="h-12 rounded-xl border-slate-200" required />
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">2</div>
              Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-blue-600 bg-blue-50 p-6 rounded-2xl flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Credit Card</h4>
                  <p className="text-xs text-slate-500">Visa, Mastercard, AMEX</p>
                </div>
              </div>
              <div className="border-2 border-slate-100 p-6 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-slate-200 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">PayPal</h4>
                  <p className="text-xs text-slate-500">Fast and secure</p>
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Card Number</label>
                <Input placeholder="0000 0000 0000 0000" className="h-12 rounded-xl border-slate-200" required />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date</label>
                  <Input placeholder="MM/YY" className="h-12 rounded-xl border-slate-200" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">CVV</label>
                  <Input placeholder="123" className="h-12 rounded-xl border-slate-200" required />
                </div>
              </div>
            </form>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-full shadow-xl shadow-blue-100 gap-3"
          >
            {isProcessing ? (
              <>
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                PROCESSING...
              </>
            ) : (
              <>
                COMPLETE PURCHASE
                <CheckCircle2 size={24} />
              </>
            )}
          </Button>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-3xl p-8 text-white sticky top-32">
            <h3 className="text-2xl font-black mb-8 tracking-tighter">Order Summary</h3>
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-24 flex-shrink-0 rounded-sm overflow-hidden border border-slate-700">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-1">
                    <h4 className="font-bold text-sm line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-blue-400">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="bg-slate-800 mb-8" />

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Subtotal</span>
                <span className="text-white font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Shipping</span>
                <span className="text-green-400 font-bold">FREE</span>
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex justify-between text-2xl font-black">
                <span>Total</span>
                <span className="text-blue-400">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck size={16} className="text-blue-400" />
                <span>100% Secure Payment Processing</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <Truck size={16} className="text-blue-400" />
                <span>Fast & Reliable Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
