"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getCertificate } from "@/lib/api";

function fixUrl(url: string) {
  if (!url) return url;
  // If it starts with '/', return as is (relative), allowing Next.js proxy to handle it.
  if (url.startsWith('/')) {
    return url;
  }
  // If it's the specific backend IP, make it relative to use the proxy
  if (url.includes('45.145.229.20:6124')) {
    return url.replace('http://45.145.229.20:6124', '');
  }
  return url.replace(':2025', ':6124');
}

export default function CertificateQuery({ id }: { id?: string }) {
  const [query, setQuery] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);

  // Process content to fix image URLs (make them relative so they go through proxy)
  const processedContent = certificateData?.content 
    ? certificateData.content.replace(/http:\/\/45\.145\.229\.20:6124/g, '') 
    : "";

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setCertificateData(null);

    try {
      const data = await getCertificate(query);
      if (data) {
        setCertificateData(data);
      } else {
        setResult("未找到相关证书信息，请核对证书编号。");
      }
    } catch (error) {
      console.error("Search error:", error);
      setResult("查询出错，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={id} className="py-32 bg-stone-50 text-stone-900 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('/images/noise.png')] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">鉴定证书查询</h2>
          <p className="text-stone-600 mb-12 max-w-2xl mx-auto">
            根据鉴定证书编号及防伪密码，即可访问专属界面，查看鉴定证书电子档、藏品详细图片及内容介绍。
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSearch}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-xl mx-auto space-y-4"
        >
          <input 
            type="text" 
            placeholder="请输入证书编号" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 text-stone-900 px-6 py-4 outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all text-lg placeholder:text-stone-400"
            required
          />
          <input 
            type="password" 
            placeholder="请输入防伪密码" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-stone-200 text-stone-900 px-6 py-4 outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all text-lg placeholder:text-stone-400"
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-stone-900 text-white px-8 py-4 font-serif font-bold tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? "查询中..." : "立即查询"}
          </button>
        </motion.form>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 border border-stone-200 bg-white shadow-sm"
          >
            <p className="text-stone-500">{result}</p>
          </motion.div>
        )}
      </div>

      {/* Certificate Detail Modal (Product Style) */}
      <AnimatePresence>
        {certificateData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#f2f0ea]"
          >
            <button 
              onClick={() => setCertificateData(null)}
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
                   {/* Placeholder if no image */}
                   <Image
                      src={fixUrl(certificateData.featuredImage?.node?.sourceUrl) || "https://placehold.co/800x800/e8e6e0/999?text=No+Image"}
                      alt={certificateData.title}
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
                    <p className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-2">Certificate of Authenticity</p>
                    <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">{certificateData.title}</h1>
                    <div className="w-12 h-1 bg-stone-300" />
                  </div>
                  
                  <div 
                    className="prose prose-stone prose-lg text-stone-600 font-light leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: processedContent }} 
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
