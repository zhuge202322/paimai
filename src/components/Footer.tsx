"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-stone-900 text-stone-400 py-24 relative z-10 w-full max-w-full overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            
            {/* Brand Column */}
            <div className="md:col-span-4">
              <h2 className="font-serif text-3xl text-white mb-6">保利永安</h2>
              <p className="font-sans text-xs uppercase tracking-widest text-stone-500 mb-4">POLY FOREVERWELL TOURS AND INVESTMENT COMPANY LIMITED</p>
              <p className="font-sans text-sm leading-relaxed max-w-xs mb-8">
                致力于在文化旅游投资领域中开拓创新，成为行业的引领者。传承中华文明，弘扬民族文化。
              </p>
              <p className="text-xs uppercase tracking-widest text-stone-600">© 2025 Poly Foreverwell. All Rights Reserved.</p>
            </div>

            {/* Links Column 1 */}
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">导航</h4>
              <ul className="space-y-4 text-sm font-sans">
                <li><Link href="/" className="hover:text-white transition-colors">公司简介</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors">领导团队</Link></li>
                <li><Link href="/collection" className="hover:text-white transition-colors">馆藏精品</Link></li>
                <li><Link href="/certificate" className="hover:text-white transition-colors">证书查询</Link></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">业务</h4>
              <ul className="space-y-4 text-sm font-sans">
                <li><span className="hover:text-white transition-colors cursor-pointer">艺术拍卖</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">博物馆展览</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">数字金融</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">文旅投资</span></li>
              </ul>
            </div>

            {/* Contact / Social */}
            <div className="md:col-span-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">联系方式</h4>
              <div className="space-y-4 text-sm font-sans mb-8">
                  <p>地址：中国澳门特别行政区北京街174号广发商业中心4楼A座</p>
                  <p>电话：（+853）68685946</p>
                  <p>邮箱：info@polyforeverwell.com</p>
              </div>
            </div>

          </div>
        </div>
      </footer>
  );
}
