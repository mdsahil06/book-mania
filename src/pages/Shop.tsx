import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Grid, List, ChevronDown, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BOOKS, CATEGORIES } from '@/src/constants';
import { useCart } from '@/src/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const activeCategory = searchParams.get('category') || 'All';

  const filteredBooks = useMemo(() => {
    return BOOKS.filter(book => {
      const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy]);

  const setCategory = (category: string) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Filter size={18} />
              Categories
            </h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-bold mb-4">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Min" className="h-8 text-xs" />
                <span className="text-slate-400">-</span>
                <Input type="number" placeholder="Max" className="h-8 text-xs" />
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs">Apply Filter</Button>
            </div>
          </div>

          <Separator />

          <div className="bg-slate-900 rounded-xl p-6 text-white text-center space-y-4">
            <h4 className="font-bold text-lg">Special Offer</h4>
            <p className="text-xs text-slate-400">Get 20% off on all Sci-Fi books this weekend!</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-xs font-bold">REDEEM NOW</Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-full border-slate-300 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <div className="flex items-center gap-1 border-l pl-4 border-slate-300">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`w-8 h-8 ${viewMode === 'grid' ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`w-8 h-8 ${viewMode === 'list' ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900">{filteredBooks.length}</span> results
              {activeCategory !== 'All' && <span> in <span className="text-blue-600 font-bold">{activeCategory}</span></span>}
            </p>
          </div>

          {/* Book Grid/List */}
          <AnimatePresence mode="wait">
            {filteredBooks.length > 0 ? (
              <motion.div
                key={viewMode + activeCategory + searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={viewMode === 'grid'
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                  : "flex flex-col gap-6"
                }
              >
                {filteredBooks.map((book) => (
                  viewMode === 'grid' ? (
                    <BookGridCard key={book.id} book={book} onAddToCart={() => addToCart(book)} />
                  ) : (
                    <BookListCard key={book.id} book={book} onAddToCart={() => addToCart(book)} />
                  )
                ))}
              </motion.div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No books found</h3>
                <p className="text-slate-500">Try adjusting your filters or search query.</p>
                <Button variant="outline" onClick={() => { setCategory('All'); setSearchQuery(''); }}>Clear all filters</Button>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const BookGridCard: React.FC<{ book: any, onAddToCart: () => void }> = ({ book, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
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

const BookListCard: React.FC<{ book: any, onAddToCart: () => void }> = ({ book, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex gap-6 p-4 bg-white border rounded-xl hover:shadow-md transition-all group"
    >
      <Link to={`/book/${book.id}`} className="w-32 h-48 flex-shrink-0 rounded-sm overflow-hidden shadow-sm">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </Link>
      <div className="flex-grow flex flex-col justify-between py-2">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="secondary" className="mb-2 text-[10px] uppercase font-bold tracking-wider">{book.category}</Badge>
              <Link to={`/book/${book.id}`}>
                <h3 className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">{book.title}</h3>
              </Link>
              <p className="text-sm text-slate-500 font-medium">by {book.author}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-blue-600">₹{book.price.toLocaleString('en-IN')}</div>
              <div className="flex items-center justify-end gap-1 text-amber-400 mt-1">
                <Star size={14} fill="currentColor" />
                <span className="text-sm text-slate-600 font-bold">{book.rating}</span>
                <span className="text-xs text-slate-400 font-normal">({book.reviews})</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed max-w-2xl">
            {book.description}
          </p>
        </div>
        <div className="flex gap-4 pt-4">
          <Button onClick={onAddToCart} className="bg-blue-600 hover:bg-blue-700 gap-2 rounded-full px-6">
            <ShoppingCart size={18} />
            Add to Cart
          </Button>
          <Button variant="outline" className="rounded-full px-6" render={<Link to={`/book/${book.id}`} />} nativeButton={false}>
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
