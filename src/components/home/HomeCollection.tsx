"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomeCollection({ products = [] }: { products?: any[] }) {
    // Generate paths for images 01.png through 12.png
    const images = Array.from({ length: 12 }, (_, i) => `/images/img/${(i + 1).toString().padStart(2, '0')}.png`);

    // Duplicate images for infinite loop effect
    const carouselImages = [...images, ...images];

    return (
       <section className="py-24 bg-[#f5f0eb] overflow-hidden">
          <div className="container mx-auto px-6 text-center mb-16">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
             >
                <p className="text-xs font-bold tracking-[0.3em] text-[#8b4513] mb-3 uppercase font-sans">Highlights</p>
                <h2 className="font-serif text-4xl md:text-5xl text-stone-900">典藏预览</h2>
             </motion.div>
          </div>
             
          {/* Infinite Carousel Track */}
          <div className="relative w-full flex overflow-hidden">
             <motion.div 
                className="flex gap-6 md:gap-8 px-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                   duration: 50, 
                   ease: "linear", 
                   repeat: Infinity 
                }}
                whileHover={{ animationPlayState: "paused" }} // Optional: pause on hover if using CSS animation, but framer motion handles this differently. 
                // To pause framer motion on hover is complex, so let's keep it simple continuous flow or maybe slow it down.
             >
                {carouselImages.map((src, idx) => (
                   <div 
                     key={idx} 
                     className="relative flex-shrink-0 w-[280px] h-[180px] md:w-[400px] md:h-[260px] bg-stone-200 shadow-lg group cursor-pointer overflow-hidden"
                   >
                       <Image 
                         src={src} 
                         alt={`Collection Highlight ${idx}`} 
                         fill 
                         className="object-cover transition-transform duration-700 group-hover:scale-110" 
                         sizes="(max-width: 768px) 280px, 400px"
                       />
                       <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                   </div>
                ))}
             </motion.div>
          </div>

          <div className="mt-16 text-center">
             <Link href="/collection" className="inline-block px-12 py-3 border border-stone-900 text-stone-900 font-serif tracking-widest hover:bg-stone-900 hover:text-white transition-all duration-300">
                查看全部
             </Link>
          </div>
       </section>
    );
}
