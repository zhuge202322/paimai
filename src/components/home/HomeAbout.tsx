"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomeAbout() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl text-stone-900 mb-6">关于我们</h2>
            <div className="w-12 h-1 bg-stone-900 mb-8" />
            
            <div className="space-y-6 text-stone-600 leading-relaxed text-justify font-light text-base md:text-lg">
                <p>
                  澳门保利永安旅游投资有限公司自2004年成立以来，致力于在文化旅游投资领域中开拓创新，成为行业的引领者。
                </p>
                <p>
                  作为一家综合型企业，保利永安旗下拥有保利永安博物馆有限公司、保利永安拍卖行有限公司及保利拍卖行有限公司等，不仅涉猎了艺术品运营、博物馆管理、房地产开发及金融创新，还秉持着“文化引领、产业融合”的发展理念，努力推动中国及世界文化艺术的发展。
                </p>
            </div>

            <div className="mt-10">
                <Link 
                  href="/about" 
                  className="group inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white font-serif tracking-widest hover:bg-stone-700 transition-colors duration-300 shadow-md"
                >
                  <span>了解更多</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
            </div>
          </motion.div>

          {/* Images */}
          <div className="relative h-[400px] lg:h-[500px] w-full hidden md:block">
             <motion.div 
               className="absolute top-0 right-0 w-[65%] h-[75%] z-10 shadow-xl"
               initial={{ opacity: 0, y: -30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
                <div className="relative w-full h-full">
                    <Image src="/images/01.png" alt="About Image 1" fill className="object-cover" />
                </div>
             </motion.div>
             <motion.div 
               className="absolute bottom-0 left-0 w-[60%] h-[60%] z-20 shadow-2xl border-4 border-white"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
             >
                <div className="relative w-full h-full">
                    <Image src="/images/02.png" alt="About Image 2" fill className="object-cover" />
                </div>
             </motion.div>
          </div>
          {/* Mobile Image Fallback */}
           <div className="relative aspect-video w-full md:hidden shadow-lg mt-8">
              <Image src="/images/02.png" alt="About Image" fill className="object-cover" />
           </div>
        </div>
      </div>
    </section>
  );
}
