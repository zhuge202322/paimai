"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  image: string;
  // designer field removed as requested
}

interface ProjectsClientProps {
  initialProducts: Product[];
}

export default function ProjectsClient({ initialProducts }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map(p => p.category));
    // Filter out "Uncategorized" or the main "Anli" category if it appears
    return ["All", ...Array.from(cats).filter(c => c !== "Anli" && c !== "anli" && c !== "案例" && c !== "Uncategorized")];
  }, [initialProducts]);

  // Filter Logic (Simplified: Category only)
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return initialProducts;
    }
    return initialProducts.filter(p => p.category === activeCategory);
  }, [activeCategory, initialProducts]);

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
  };

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-stone-900 selection:bg-stone-900 selection:text-white">
      
      {/* Header Section */}
      <section className="pt-40 pb-12 px-6 container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-stone-400 uppercase mb-4">Selected Works</p>
          <h1 className="font-serif text-6xl md:text-8xl mb-8 leading-none">
            Global <br /> <span className="italic text-stone-400">Projects</span>
          </h1>
          <p className="font-sans text-stone-600 max-w-lg text-lg leading-relaxed">
            Showcasing our bespoke furniture solutions for luxury hotels, commercial spaces, and high-end residences worldwide.
          </p>
        </motion.div>
      </section>

      {/* Filter Bar (Sticky) */}
      <section className="sticky top-24 z-40 bg-[#f8f8f6]/80 backdrop-blur-md border-b border-stone-200 mb-12 transition-all duration-300">
        <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 h-16 whitespace-nowrap">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              
              return (
                <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`text-xs uppercase tracking-widest transition-colors duration-300 ${
                    isSelected 
                        ? "text-stone-900 font-bold border-b-2 border-stone-900 pb-1" 
                        : "text-stone-400 hover:text-stone-900"
                    }`}
                >
                    {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-6 pb-32">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16" // Changed to 2 columns for larger project images
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
              >
                <Link href={`/product/${product.id}`} className="block">
                    {/* Image Container - Aspect Ratio adjusted for Projects (Landscape often better) */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 mb-6">
                    <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500" />
                    
                    {/* Quick Action (View Details) */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <span className="text-white font-serif italic text-lg tracking-wider">
                        View Project →
                        </span>
                    </div>
                    </div>

                    {/* Info */}
                    <div className="flex justify-between items-end border-t border-stone-300 pt-4">
                    <div>
                        <h3 className="font-serif text-2xl text-stone-900 mb-1 group-hover:text-stone-600 transition-colors">{product.name}</h3>
                        <p className="text-[10px] tracking-widest uppercase text-stone-500">
                           {/* Designer info removed */}
                           Location / Category
                        </p>
                    </div>
                    <span className="font-sans text-[10px] font-bold text-stone-400 uppercase tracking-widest">{product.category}</span>
                    </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
           <div className="py-24 text-center">
              <p className="font-serif text-2xl text-stone-400 italic">No projects found in this category.</p>
           </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-stone-200">
         <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 uppercase tracking-widest">
            <span>© 2024 HC Furniture Supply</span>
            <div className="flex gap-8 mt-4 md:mt-0">
               <a href="#" className="hover:text-stone-900">Instagram</a>
               <a href="#" className="hover:text-stone-900">Contact</a>
            </div>
         </div>
      </footer>
    </main>
  );
}
