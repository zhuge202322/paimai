"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function fixUrl(url: string) {
  if (!url) return "";
  if (url.startsWith('/')) {
    return `http://45.145.229.20:6124${url}`;
  }
  return url.replace(':2025', ':6124');
}

export default function HomeArtExhibition({ products = [] }: { products?: any[] }) {
    // Ensure we have at least 2 products to display, or placeholders
    // If products array is empty or small, we fallback to placeholders.
    // We try to pick items different from generic ones if possible, but here we just take the first 2.
    const displayProducts = products.length > 0 ? products : [];
    
    // Fallback placeholders if API fails or returns no data
    const item1 = displayProducts[0] || { node: { title: "清乾隆 斗彩加粉彩暗八仙纹天球瓶", featuredImage: { node: { sourceUrl: "/images/img/05.png" } } } };
    const item2 = displayProducts[1] || { node: { title: "明永乐 青花折枝花果纹梅瓶", featuredImage: { node: { sourceUrl: "/images/img/06.png" } } } };

    return (
       <section className="py-24 bg-[#fbf9f6]">
          <div className="container mx-auto px-6">
             {/* Header */}
             <div className="text-center mb-16">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                 >
                     <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#8b4513] uppercase mb-4 border-b border-[#8b4513]/30 inline-block pb-1">
                        The Heritage Collection
                     </p>
                     <h2 className="font-serif text-5xl md:text-6xl text-stone-900 mb-8 tracking-wide">物 华 天 宝</h2>
                     
                     <div className="space-y-3 text-stone-500 font-light text-sm md:text-base mb-12">
                        <p>每一件藏品，都是一段凝固的历史。</p>
                        <p>在这里，我们不谈价格，只论风骨。</p>
                     </div>
                     
                     {/* Categories (Visual only for preview) */}
                     <div className="flex justify-center gap-8 md:gap-12 text-xs md:text-sm text-stone-400 tracking-widest uppercase">
                        <span className="text-[#8b4513] relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#8b4513] after:rounded-full cursor-pointer">全部</span>
                        <span className="hover:text-[#8b4513] cursor-pointer transition-colors">瓷器</span>
                        <span className="hover:text-[#8b4513] cursor-pointer transition-colors">书画</span>
                        <span className="hover:text-[#8b4513] cursor-pointer transition-colors">玉器</span>
                        <span className="hover:text-[#8b4513] cursor-pointer transition-colors">家具</span>
                        <span className="hover:text-[#8b4513] cursor-pointer transition-colors">杂项</span>
                     </div>
                 </motion.div>
             </div>

             {/* Two Products Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto">
                 {[item1, item2].map((item, idx) => {
                     const rawUrl = item.node?.featuredImage?.node?.sourceUrl;
                     // If it's a local path (starts with /), use it directly. If it's a URL, fix it.
                     const imgUrl = rawUrl ? (rawUrl.startsWith('/') ? rawUrl : fixUrl(rawUrl)) : "/images/placeholder.jpg";
                     const title = item.node?.title || "Untitled";

                     return (
                         <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group relative aspect-[3/4] bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500"
                         >
                            <div className="relative w-full h-full overflow-hidden bg-stone-100">
                                <Image 
                                    src={imgUrl} 
                                    alt={title} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Internal White Border Frame */}
                                <div className="absolute inset-4 border border-white/40 z-10 pointer-events-none" />
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                            </div>
                            
                            {/* Hover Info */}
                            <div className="absolute bottom-10 left-10 right-10 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-center">
                                <h3 className="text-white font-serif text-xl tracking-wide drop-shadow-md">{title}</h3>
                                <p className="text-white/80 text-xs mt-2 uppercase tracking-widest">查看详情</p>
                            </div>
                         </motion.div>
                     );
                 })}
             </div>
             
             <div className="mt-16 text-center">
                <Link href="/collection" className="inline-block px-10 py-3 border border-[#8b4513]/30 text-[#8b4513] font-serif tracking-widest hover:bg-[#8b4513] hover:text-white transition-all duration-300">
                   浏览更多藏品
                </Link>
             </div>
          </div>
       </section>
    );
}
