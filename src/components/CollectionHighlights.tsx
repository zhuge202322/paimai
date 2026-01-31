"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function fixUrl(url: string) {
  if (!url) return url;
  if (url.startsWith('/')) {
    return `http://45.145.229.20:6124${url}`;
  }
  return url.replace(':2025', ':6124');
}

export default function CollectionHighlights({ id, products = [] }: { id?: string, products?: any[] }) {
  // Transform WP data to local format
  const scrollProducts = useMemo(() => {
    // Filter out potential unwanted furniture items if they slip through
    const filteredProducts = (products || []).filter((item: any) => {
        const title = item.node.title || "";
        return !title.toUpperCase().includes("DREW") && !title.toUpperCase().includes("CJ88");
    });

    if (filteredProducts.length === 0) {
        // Fallback for demo using User's Artifacts
        return [
            { 
                id: 1, 
                name: "宋汝窑天青釉冰裂纹水洗", 
                model: "宋代 (960-1279)", 
                size: "直径 13cm", 
                material: "汝窑天青釉", 
                image: "https://placehold.co/800x800/e8e6e0/999?text=Artifact+Image+Not+Found", 
                collection: "陶瓷", 
                tagline: "雨过天青云破处", 
                content: "<p>宋汝窑天青釉冰裂纹水洗，造型古朴，釉色天青，开片自然...</p>" 
            },
            { 
                id: 2, 
                name: "旧藏清代乾隆哥釉仿青铜器鼎式炉", 
                model: "清乾隆 (1736-1795)", 
                size: "高 15cm", 
                material: "哥釉瓷", 
                image: "https://placehold.co/800x800/e8e6e0/999?text=Artifact+Image+Not+Found", 
                collection: "宫廷御用", 
                tagline: "仿古致敬", 
                content: "<p>旧藏清代乾隆哥釉仿青铜器鼎式炉，是一件迷人的文物...</p>" 
            },
        ];
    }
    return filteredProducts.map((item: any) => {
        const p = item.node;
        const category = p.categories?.edges?.[0]?.node?.name || "Collection";
        const tagline = p.excerpt ? p.excerpt.replace(/<[^>]+>/g, '').trim().substring(0, 20) : "传世珍品";
        
        return {
            id: p.id,
            name: p.title,
            model: "年代: 详见内文", // Changed from "珍品" to verify update
            size: "尺寸: 详见内文", 
            material: "材质: 详见内文",
            image: fixUrl(p.featuredImage?.node?.sourceUrl) || "https://placehold.co/800x800/e8e6e0/999?text=No+Image",
            collection: category,
            tagline: tagline,
            content: p.content || ""
        };
    });
  }, [products]);

  const hasProducts = scrollProducts.length > 0;
  
  // Click Carousel Logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const nextSlide = () => {
    if (!hasProducts) return;
    setCurrentIndex((prev) => (prev + 1) % scrollProducts.length);
  };
  const prevSlide = () => {
    if (!hasProducts) return;
    setCurrentIndex((prev) => (prev - 1 + scrollProducts.length) % scrollProducts.length);
  };

  const currentProduct = hasProducts ? scrollProducts[currentIndex] : null;

  return (
    <section id={id} className="relative h-screen bg-[#f8f8f6] flex items-center justify-center py-20 border-t border-stone-200">
        <div className="absolute top-12 left-0 w-full text-center z-10">
             <h2 className="font-serif text-4xl text-stone-900">馆藏精品</h2>
             <p className="text-stone-500 text-sm tracking-widest uppercase mt-2">Highlights</p>
        </div>

        <div className="w-full h-full bg-[#e5e5e5] overflow-hidden relative">
            
            {/* Carousel Container */}
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {hasProducts && currentProduct && (
                        <motion.div 
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full flex items-center justify-center"
                        >
                             {/* Centered Image Container */}
                             <div className="relative w-full max-w-[70vw] h-[80%]">
                                <Image 
                                  src={currentProduct.image} 
                                  alt={currentProduct.name} 
                                  fill 
                                  className="object-contain drop-shadow-2xl bg-white" 
                                  priority
                                />
                                

                                {/* Overlay: Left Specs */}
                                <div className="absolute top-auto bottom-[-180px] left-0 right-0 lg:top-12 lg:bottom-auto lg:-left-12 lg:right-auto z-20 w-full lg:w-64 p-6 lg:p-8 bg-white shadow-xl rounded-sm border border-stone-50">
                                   <div>
                                      <h3 className="font-serif text-2xl md:text-3xl text-stone-900 mb-2 leading-tight">{currentProduct.name}</h3>
                                      <p className="font-bold text-[10px] tracking-widest text-stone-400 uppercase">{currentProduct.model}</p>
                                   </div>
                                   <div className="space-y-4 text-xs text-stone-600 font-sans mt-6 md:mt-8 border-t border-stone-100 pt-4 md:pt-6">
                                      {/* Hide specs if generic */}
                                      {currentProduct.model !== "珍品" && (
                                        <>
                                          <div>
                                             <span className="font-bold text-stone-400 uppercase text-[10px] tracking-wider block mb-1">尺寸</span> 
                                             {currentProduct.size}
                                          </div>
                                          <div>
                                             <span className="font-bold text-stone-400 uppercase text-[10px] tracking-wider block mb-1">材质</span> 
                                             {currentProduct.material}
                                          </div>
                                        </>
                                      )}
                                   </div>
                                </div>

                                {/* Overlay: Right Collection Info */}
                                <div className="absolute top-1/2 -translate-y-1/2 -right-12 lg:-right-32 z-10 text-right hidden lg:block pointer-events-none select-none">
                                   <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-4">{currentProduct.collection}</p>
                                   <h2 className="font-serif text-6xl md:text-7xl text-stone-900/10 mix-blend-multiply leading-none whitespace-nowrap">
                                     {currentProduct.tagline}
                                   </h2>
                                </div>

                                {/* Floating CTA Button */}
                                <div className="absolute -bottom-24 lg:bottom-8 right-0 lg:right-8 z-20 w-full lg:w-auto text-center lg:text-right">
                                   <button 
                                     onClick={() => setSelectedProduct(currentProduct)}
                                     className="border border-stone-900 bg-white/80 backdrop-blur px-8 py-3 text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors w-full lg:w-auto"
                                   >
                                     查看详情
                                   </button>
                                </div>
                             </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {hasProducts && (
                <>
                    <button 
                        onClick={prevSlide}
                        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-stone-400 text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all"
                    >
                        ←
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-stone-400 text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all"
                    >
                        →
                    </button>
                    
                    {/* Slide Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                        {scrollProducts.map((_: any, idx: number) => (
                            <button 
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-stone-900 w-8" : "bg-stone-400 hover:bg-stone-600"}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>

        {/* Detail Overlay */}
        <AnimatePresence>
            {selectedProduct && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#f2f0ea]"
                >
                    <button 
                        onClick={() => setSelectedProduct(null)}
                        className="absolute top-6 right-6 z-50 text-stone-400 hover:text-stone-900 transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="w-full h-full flex flex-col md:flex-row">
                        {/* Left Image Section */}
                        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-[#e8e6e0] flex items-center justify-center p-8 md:p-16">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="relative w-full h-full max-w-lg max-h-[80vh] shadow-2xl"
                            >
                                <Image
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    fill
                                    className="object-contain bg-black/5"
                                />
                            </motion.div>
                        </div>

                        {/* Right Content Section */}
                        <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto p-8 md:p-20 bg-[#f2f0ea]">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="max-w-xl mx-auto"
                            >
                                <div className="mb-8">
                                    <p className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-2">Collection Highlight</p>
                                    <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">{selectedProduct.name}</h1>
                                    <div className="w-12 h-1 bg-stone-300" />
                                </div>
                                
                                <div 
                                    className="prose prose-stone prose-lg text-stone-600 font-light leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: selectedProduct.content }} 
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </section>
  );
}
