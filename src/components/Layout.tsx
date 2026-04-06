import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ChevronDown, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/src/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';

const Header = () => {
  const { totalItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Audiobooks', path: '/shop?category=Audiobooks' },
    { name: 'E-Books', path: '/shop?category=E-Books' },
    { name: 'Gift Books', path: '/shop?category=Gift' },
  ];

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="hidden md:flex w-full bg-slate-50 border-b py-2 px-4 justify-between items-center text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Phone size={12} />
            <span>+91 123 456 7890</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail size={12} />
            <span>support@bookmaniastore.com</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 border-r pr-4">
            <Facebook size={14} className="hover:text-slate-900 cursor-pointer" />
            <Twitter size={14} className="hover:text-slate-900 cursor-pointer" />
            <Instagram size={14} className="hover:text-slate-900 cursor-pointer" />
            <Youtube size={14} className="hover:text-slate-900 cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <span>English</span>
            <ChevronDown size={12} />
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <span>INR ₹</span>
            <ChevronDown size={12} />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger nativeButton={true} render={<Button variant="ghost" size="icon" />}>
              <Menu size={24} />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg font-medium ${location.pathname === link.path ? 'text-blue-600' : 'text-slate-900'}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-slate-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs">B</div>
          BOOK MANIA
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold transition-colors hover:text-blue-600 ${location.pathname === link.path ? 'text-blue-600' : 'text-slate-600'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="hidden sm:flex">
            <Search size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Heart size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="relative" render={<Link to="/cart" />} nativeButton={false}>
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px] bg-blue-600">
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Search Bar Expandable */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-50"
          >
            <div className="max-w-3xl mx-auto px-4 py-8">
              <div className="relative">
                <Input
                  placeholder="Search for books, authors, categories..."
                  className="w-full h-12 pl-12 text-lg rounded-full border-2 border-slate-200 focus:border-blue-500"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X size={20} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-900 text-xs">B</div>
            BOOK MANIA
          </Link>
          <p className="text-sm leading-relaxed">
            Your premier destination for literature and knowledge. We curate the best books from around the world to inspire your next adventure.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Facebook size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Twitter size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Instagram size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Youtube size={20} className="hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/shop" className="hover:text-white transition-colors">All Books</Link></li>
            <li><Link to="/shop?category=Fiction" className="hover:text-white transition-colors">Fiction</Link></li>
            <li><Link to="/shop?category=Non-Fiction" className="hover:text-white transition-colors">Non-Fiction</Link></li>
            <li><Link to="/shop?category=Classics" className="hover:text-white transition-colors">Classics</Link></li>
            <li><Link to="/shop?category=Mystery" className="hover:text-white transition-colors">Mystery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Customer Service</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
            <li className="hover:text-white cursor-pointer transition-colors">Shipping Policy</li>
            <li className="hover:text-white cursor-pointer transition-colors">Returns & Exchanges</li>
            <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe to get updates on new arrivals and special offers.</p>
          <div className="flex gap-2">
            <Input placeholder="Your email" className="bg-slate-800 border-slate-700 text-white" />
            <Button className="bg-blue-600 hover:bg-blue-700">Join</Button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-800 mt-16 pt-8 text-center text-xs text-slate-500">
        <p>© 2026 Book Mania Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
