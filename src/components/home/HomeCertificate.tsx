"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeCertificate() {
  return (
    <section className="py-32 bg-[#e8e6e0] relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-stone-400 blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-stone-400 blur-[100px]" />
       </div>

       <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">证书查询</h2>
             <p className="text-stone-600 mb-10 max-w-xl mx-auto leading-relaxed">
                我们提供专业的艺术品鉴定证书查询服务。输入证书编号，即可查询藏品详细鉴定信息与电子档案，确保每一件藏品的真实性与传承价值。
             </p>
             
             <Link href="/certificate" className="inline-block bg-stone-900 text-white px-12 py-4 font-serif tracking-widest hover:bg-stone-700 transition-colors shadow-xl text-lg">
                立即查询
             </Link>
          </motion.div>
       </div>
    </section>
  )
}
