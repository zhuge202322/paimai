"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomeLeadership() {
  return (
    <section className="py-24 bg-[#f8f8f6] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           {/* Images (Left Side on Desktop) */}
           <div className="relative h-[500px] w-full hidden lg:block order-2 lg:order-1">
             <motion.div 
               className="absolute top-0 left-0 w-[70%] h-[85%] z-10"
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
                <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-700 shadow-xl">
                    <Image src="/images/renwu/001.png" alt="Leadership Main" fill className="object-cover" />
                </div>
             </motion.div>
             <motion.div 
               className="absolute bottom-10 right-0 w-[50%] h-[50%] z-20 border-8 border-[#f8f8f6] shadow-2xl"
               initial={{ opacity: 0, y: 30, rotate: 0 }}
               whileInView={{ opacity: 1, y: 0, rotate: -3 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
                <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-700">
                    <Image src="/images/renwu/002.png" alt="Leadership Secondary" fill className="object-cover" />
                </div>
             </motion.div>
          </div>

          {/* Text Content (Right Side on Desktop) */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl text-stone-900 mb-6">领导团队</h2>
            <div className="w-12 h-1 bg-stone-900 mb-8" />
            
            <div className="space-y-6 text-stone-600 leading-relaxed text-justify font-light text-base md:text-lg">
                <p>
                  我们保利永安的专业团队由一群热情和经验丰富的专家组成，他们致力于为客户提供卓越的文化体验。团队成员在艺术、历史和教育领域具有深厚的背景，确保每一展览都经过精心策划和呈现。
                </p>
                <p>
                  我们相信，通过专业的知识和热情的服务，可以激发客户对艺术的热爱和精神。我们拥有丰富的管理经验和强大的团队运营能力。我们的团队致力于提供高效的服务，确保每个项目都能顺利。我们相信，专业的管理和卓越的团队合作是成功的关键。
                </p>
            </div>

            <div className="mt-10">
                <Link 
                  href="/team" 
                  className="group inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white font-serif tracking-widest hover:bg-stone-700 transition-colors duration-300 shadow-md"
                >
                  <span>了解更多</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
            </div>
          </motion.div>

          {/* Mobile Image Fallback */}
           <div className="relative aspect-[4/5] w-full lg:hidden order-3 mt-8 shadow-lg">
              <Image src="/images/renwu/001.png" alt="Leadership Team" fill className="object-cover" />
           </div>
        </div>
      </div>
    </section>
  )
}
