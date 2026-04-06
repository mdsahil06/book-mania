import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, ArrowRight, Star, Truck, Headset, RotateCcw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BOOKS } from '@/src/constants';
import { useCart } from '@/src/CartContext';

const Home = () => {
  const { addToCart } = useCart();
  const featuredBooks = BOOKS.filter(book => book.featured);
  const audiobooks = BOOKS.filter(book => book.category === 'Fiction'); // Mocking audiobooks
  const newArrivals = BOOKS.slice(0, 5);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-slate-50 py-16 md:py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 px-3 py-1 font-semibold uppercase tracking-wider text-xs">
              BOOK LOVERS SALE
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tighter">
              PREMADE BOOK <br />
              <span className="text-blue-600">KINDLE COVERS</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Discover our curated collection of literature, from timeless classics to modern bestsellers. Start your next adventure today.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/shop">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-14 text-lg rounded-none">
                  SHOP NOW
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 h-14 text-lg rounded-none border-slate-300">
                LEARN MORE
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-[300px] md:w-[400px] aspect-[2/3] shadow-2xl rounded-sm overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src={featuredBooks[0].cover}
                alt={featuredBooks[0].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold">{featuredBooks[0].title}</h3>
                <p className="text-slate-200">{featuredBooks[0].author}</p>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-64 shadow-xl rounded-sm overflow-hidden hidden md:block transform -rotate-6 hover:rotate-0 transition-transform duration-500 border-4 border-white">
              <img
                src={featuredBooks[1].cover}
                alt={featuredBooks[1].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'Free shipping on all orders over ₹500' },
            { icon: Headset, title: 'Support 24/7', desc: 'Contact us 24 hours a day, 7 days a week' },
            { icon: RotateCcw, title: '30 Days Return', desc: 'Simply return it within 30 days for an exchange' },
            { icon: ShieldCheck, title: '100% Payment Secure', desc: 'We ensure secure payment with PEV' }
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <feature.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{feature.title}</h4>
                <p className="text-xs text-slate-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audiobooks Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 border-b pb-4">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Audiobooks</h2>
            <div className="flex gap-6 text-sm font-semibold text-slate-500">
              <span className="text-blue-600 cursor-pointer border-b-2 border-blue-600 pb-4 -mb-[18px]">Bestsellers</span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">New Releases</span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">Book Awards</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {audiobooks.map((book) => (
              <BookCard key={book.id} book={book} onAddToCart={() => addToCart(book)} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 border-b pb-4">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">New Arrivals</h2>
            <div className="flex gap-6 text-sm font-semibold text-slate-500">
              <span className="text-blue-600 cursor-pointer border-b-2 border-blue-600 pb-4 -mb-[18px]">Fiction</span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">Non-Fiction</span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">Mystery</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {newArrivals.map((book) => (
              <BookCard key={book.id} book={book} onAddToCart={() => addToCart(book)} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Join Our Community</h2>
            <p className="text-blue-100 text-lg">
              Subscribe to our newsletter and get 10% off your first purchase, plus exclusive access to new releases and author events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow h-14 rounded-full px-8 text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 h-14 px-10 rounded-full font-bold">
                SUBSCRIBE
              </Button>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
      </section>
    </div>
  );
};

const BookCard: React.FC<{ book: any, onAddToCart: () => void }> = ({ book, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group"
    >
      <div className="relative aspect-[2/3] bg-slate-100 rounded-sm overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300">
        <Link to={`/book/${book.id}`}>
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <Badge className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-none">
            NEW
          </Badge>
        </Link>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full w-10 h-10 shadow-lg pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart();
            }}
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
      <div className="space-y-1">
        <Link to={`/book/${book.id}`} className="block">
          <h3 className="font-bold text-slate-900 text-sm line-clamp-1 hover:text-blue-600 transition-colors">{book.title}</h3>
        </Link>
        <p className="text-xs text-slate-500">{book.author}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-bold text-blue-600">₹{book.price.toLocaleString('en-IN')}</span>
          <div className="flex items-center gap-0.5 text-amber-400">
            <Star size={10} fill="currentColor" />
            <span className="text-[10px] text-slate-400 font-medium">{book.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
