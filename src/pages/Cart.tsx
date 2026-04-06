import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/src/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-8">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag size={48} />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Your cart is empty</h2>
          <p className="text-slate-500 max-w-md mx-auto text-lg">Looks like you haven't added any books to your cart yet. Start exploring our collection!</p>
        </div>
        <Link to="/shop">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-10 rounded-full font-bold text-lg shadow-xl shadow-blue-200">
            CONTINUE SHOPPING
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Shopping Cart</h1>
        <span className="text-slate-400 text-lg font-medium">({totalItems} items)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-xs font-bold text-slate-400 uppercase tracking-widest">
            <div className="col-span-6">Product Details</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <AnimatePresence initial={false}>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-8 border-b border-slate-100 group"
              >
                <div className="md:col-span-6 flex gap-6">
                  <Link to={`/book/${item.id}`} className="w-24 h-36 flex-shrink-0 rounded-sm overflow-hidden shadow-md">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="flex flex-col justify-center space-y-1">
                    <Link to={`/book/${item.id}`}>
                      <h3 className="font-bold text-slate-900 text-lg hover:text-blue-600 transition-colors">{item.title}</h3>
                    </Link>
                    <p className="text-sm text-slate-500 font-medium">by {item.author}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500 font-bold flex items-center gap-1 hover:text-red-700 transition-colors pt-2"
                    >
                      <Trash2 size={14} />
                      REMOVE
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 text-center">
                  <span className="md:hidden text-xs font-bold text-slate-400 uppercase mr-2">Price:</span>
                  <span className="font-bold text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
                </div>

                <div className="md:col-span-2 flex justify-center">
                  <div className="flex items-center border-2 border-slate-100 rounded-full h-10 px-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 text-right">
                  <span className="md:hidden text-xs font-bold text-slate-400 uppercase mr-2">Total:</span>
                  <span className="font-black text-blue-600 text-lg">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex justify-between items-center pt-4">
            <Link to="/shop">
              <Button variant="ghost" className="text-slate-500 hover:text-blue-600 font-bold gap-2">
                <ArrowLeft size={18} />
                CONTINUE SHOPPING
              </Button>
            </Link>
            <Button variant="ghost" className="text-red-500 hover:text-red-700 font-bold gap-2">
              <Trash2 size={18} />
              CLEAR CART
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 sticky top-32">
            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tighter">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Subtotal</span>
                <span className="text-slate-900 font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Estimated Tax</span>
                <span className="text-slate-900 font-bold">₹0.00</span>
              </div>
              <Separator className="bg-slate-200" />
              <div className="flex justify-between text-xl font-black text-slate-900">
                <span>Total</span>
                <span className="text-blue-600">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Input placeholder="Promo code" className="h-12 rounded-full pr-24 border-slate-200" />
                <Button variant="ghost" className="absolute right-1 top-1 h-10 px-4 font-bold text-blue-600 hover:bg-blue-50 rounded-full">APPLY</Button>
              </div>
              <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-full shadow-xl shadow-blue-100 gap-2" render={<Link to="/checkout" className="block" />} nativeButton={false}>
                CHECKOUT NOW
                <ArrowRight size={20} />
              </Button>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <ShieldCheck size={16} className="text-green-500" />
                <span>Secure Checkout Guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <Truck size={16} className="text-blue-500" />
                <span>Free Shipping on all orders</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <RotateCcw size={16} className="text-amber-500" />
                <span>30 Days Return Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
