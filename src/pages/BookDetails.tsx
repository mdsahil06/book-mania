import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Check, Truck, ShieldCheck, RotateCcw, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BOOKS } from '@/src/constants';
import { useCart } from '@/src/CartContext';
import { motion } from 'motion/react';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const book = BOOKS.find(b => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-bold text-slate-900">Book not found</h2>
        <p className="text-slate-500">The book you are looking for does not exist or has been removed.</p>
        <Button className="bg-blue-600 hover:bg-blue-700" render={<Link to="/shop" />} nativeButton={false}>Back to Shop</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedBooks = BOOKS.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-blue-600 transition-colors">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${book.category}`} className="hover:text-blue-600 transition-colors">{book.category}</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate max-w-[200px]">{book.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Book Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="aspect-[2/3] bg-slate-100 rounded-xl overflow-hidden shadow-2xl border-8 border-white">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[2/3] bg-slate-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all opacity-60 hover:opacity-100">
                <img
                  src={`${book.cover}?v=${i}`}
                  alt={`${book.title} view ${i}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Book Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">{book.category}</Badge>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-50 hover:text-pink-600">
                  <Heart size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600">
                  <Share2 size={20} />
                </Button>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">{book.title}</h1>
            <p className="text-xl text-slate-500 font-medium">by <span className="text-blue-600 hover:underline cursor-pointer">{book.author}</span></p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} fill={s <= Math.floor(book.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-900">{book.rating}</span>
              <span className="text-sm text-slate-400">({book.reviews} customer reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-4xl font-black text-blue-600">₹{book.price.toLocaleString('en-IN')}</span>
            <span className="text-lg text-slate-400 line-through">₹{(book.price * 1.2).toLocaleString('en-IN')}</span>
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 font-bold">SAVE 20%</Badge>
          </div>

          <p className="text-slate-600 leading-relaxed text-lg">
            {book.description}
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center border-2 border-slate-200 rounded-full h-14 px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                className={`flex-grow h-14 rounded-full text-lg font-bold gap-3 transition-all ${
                  isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isAdded ? <Check size={24} /> : <ShoppingCart size={24} />}
                {isAdded ? 'ADDED TO CART' : 'ADD TO CART'}
              </Button>
            </div>
            <Button variant="outline" className="w-full h-14 rounded-full text-lg font-bold border-slate-300 hover:bg-slate-50">
              BUY IT NOW
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-blue-600" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">Free Shipping</p>
                <p className="text-slate-500">On orders over ₹500</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={20} className="text-blue-600" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">30 Days Return</p>
                <p className="text-slate-500">Hassle free returns</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-blue-600" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">Secure Payment</p>
                <p className="text-slate-500">100% secure checkout</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <section className="py-20">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-8">
            <TabsTrigger
              value="description"
              className="px-8 py-4 text-lg font-bold rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent shadow-none"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="px-8 py-4 text-lg font-bold rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent shadow-none"
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="px-8 py-4 text-lg font-bold rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent shadow-none"
            >
              Reviews ({book.reviews})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-slate-600 leading-relaxed text-lg space-y-6">
            <p>{book.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </TabsContent>
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-medium">Author</span>
                  <span className="text-slate-900 font-bold">{book.author}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-medium">Publisher</span>
                  <span className="text-slate-900 font-bold">Book Mania Publishing</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-medium">Published Date</span>
                  <span className="text-slate-900 font-bold">October 15, 2023</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-medium">Language</span>
                  <span className="text-slate-900 font-bold">English</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-medium">Pages</span>
                  <span className="text-slate-900 font-bold">352 pages</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500 font-medium">ISBN-10</span>
                  <span className="text-slate-900 font-bold">1234567890</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-64 space-y-4">
                <div className="text-center p-8 bg-slate-50 rounded-2xl">
                  <div className="text-5xl font-black text-slate-900 mb-2">{book.rating}</div>
                  <div className="flex justify-center gap-1 text-amber-400 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={16} fill={s <= Math.floor(book.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">Based on {book.reviews} reviews</div>
                </div>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full">Write a Review</Button>
              </div>
              <div className="flex-grow space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4 pb-8 border-b border-slate-100 last:border-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">JD</div>
                        <div>
                          <h4 className="font-bold text-slate-900">John Doe</h4>
                          <div className="flex gap-1 text-amber-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} size={12} fill={s <= 5 ? "currentColor" : "none"} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">2 weeks ago</span>
                    </div>
                    <p className="text-slate-600 italic">"Absolutely loved this book! The characters were so well-developed and the plot kept me guessing until the very end. Highly recommend to anyone who loves a good {book.category.toLowerCase()}."</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section className="py-20 border-t">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 tracking-tight">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedBooks.map((relatedBook) => (
              <div key={relatedBook.id} className="group">
                <Link to={`/book/${relatedBook.id}`}>
                  <div className="aspect-[2/3] bg-slate-100 rounded-sm overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={relatedBook.cover}
                      alt={relatedBook.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Link>
                <div className="space-y-1">
                  <Link to={`/book/${relatedBook.id}`}>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 hover:text-blue-600 transition-colors">{relatedBook.title}</h3>
                  </Link>
                  <p className="text-xs text-slate-500">{relatedBook.author}</p>
                  <span className="font-bold text-blue-600">₹{relatedBook.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BookDetails;
