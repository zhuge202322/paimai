"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CompanyProfile({ id }: { id?: string }) {
  return (
    <section id={id} className="relative min-h-screen flex flex-col justify-center bg-stone-50 py-24 overflow-hidden">
      {/* Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-100/50 -z-0 skew-x-12 translate-x-1/4" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Company Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h5 className="text-stone-500 tracking-[0.1em] uppercase text-xs mb-4">
              POLY FOREVERWELL TOURS AND INVESTMENT COMPANY LIMITED
            </h5>
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8 leading-tight">
              保利永安旅游投资有限公司
            </h1>
            <div className="space-y-6 text-stone-600 font-light leading-relaxed text-base text-justify">
              <p>
                澳门保利永安旅游投资有限公司自2004年成立以来，致力于在文化旅游投资领域中开拓创新，成为行业的引领者。作为一家综合型企业，保利永安旗下拥有保利永安博物馆有限公司、保利永安拍卖行有限公司及保利拍卖行有限公司等，不仅涉猎了艺术品运营、博物馆管理、房地产开发及金融创新，还秉持着“文化引领、产业融合”的发展理念，深耕澳门本地市场，努力推动本地区文化艺术的国际化发展。
              </p>
              <p>
                公司旗下的保利永安艺术博物馆已成为澳门文化旅游的重要地标，其丰富的馆藏和定期举办的高水平艺术展览及国际交流活动，吸引了大量国内外游客，提升了澳门在全球艺术舞台上的影响力。通过这些活动，保利永安不仅丰富了当地的文化生活，也为澳门的经济发展注入了新的活力。
              </p>
              <p>
                此外，公司在艺术金融和数字资产应用方面的积极布局，探索了品牌价值与金融工具的深度融合。这种创新思维为澳门的文化产业提供了新的商业模式，推动了以文化为核心的多元经济发展。
              </p>
              <p>
                展望未来，澳门保利永安旅游投资有限公司将继续依托粤港澳大湾区的发展机遇，推动澳门成为亚太地区文化旅游与艺术金融融合发展的新高地。
              </p>
            </div>

            <div className="mt-8">
                <h4 className="font-serif text-lg text-stone-900 mb-4">旗下子公司：</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-stone-500">
                    <li>• 保利永安博物馆有限公司</li>
                    <li>• POLY FOREVERWELL MUSEUM LIMITED</li>
                    <li>• 保利永安拍卖行有限公司</li>
                    <li>• POLY FOREVERWELL AUCTION HOUSE LIMITED</li>
                    <li>• 保利典当行有限公司</li>
                    <li>• POLY PAWN SHOP COMPANY LIMITED</li>
                </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] mt-8 lg:mt-0"
          >
             <div className="absolute inset-0 bg-stone-200">
                <Image 
                  src="/images/02.png" 
                  alt="Company Artifact" 
                  fill 
                  className="object-cover opacity-90"
                />
             </div>
             <div className="absolute -inset-4 border border-stone-300 -z-10" />
          </motion.div>
        </div>

        {/* Group Business Segments */}
        <div className="border-t border-stone-200 pt-16 mt-16">
            <h2 className="font-serif text-3xl text-stone-900 mb-12 text-center">集团业务板块</h2>
            <div className="w-12 h-0.5 bg-stone-900 mx-auto -mt-8 mb-12" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1: Museum */}
                <div className="bg-[#fcf8f6] p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300">
                    <h3 className="font-serif text-xl text-stone-800 mb-6">博物馆</h3>
                    <p className="text-stone-600 text-sm leading-relaxed text-justify">
                        保利博物馆是展示中国文化与艺术的重要机构，收藏丰富的古代与现代艺术作品。我们定期举办展览和活动，欢迎您来探索艺术的魅力。
                    </p>
                </div>

                {/* Card 2: Auction */}
                <div className="bg-[#fcf8f6] p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300">
                    <h3 className="font-serif text-xl text-stone-800 mb-6">拍卖</h3>
                    <p className="text-stone-600 text-sm leading-relaxed text-justify">
                        保利拍卖致力于为艺术品收藏者和投资者提供优质的拍卖服务。我们汇聚了丰富艺术资源，定期举办各类主题拍卖，展示全球顶尖艺术家的杰作，旨在为您开启艺术投资的新视野。
                    </p>
                </div>

                {/* Card 3: International Exhibition */}
                <div className="bg-[#fcf8f6] p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300">
                    <h3 className="font-serif text-xl text-stone-800 mb-6">国际展览</h3>
                    <p className="text-stone-600 text-sm leading-relaxed text-justify">
                        保利国际展览致力于为企业提供卓越的展览服务与解决方案。我们通过创新的展览设计和专业的团队，帮助客户在全球市场中脱颖而出。欢迎参与我们的展会，共同推动发展。
                    </p>
                </div>

                {/* Card 4: Digital Art Finance */}
                <div className="bg-[#fcf8f6] p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300">
                    <h3 className="font-serif text-xl text-stone-800 mb-6">数字艺术金融</h3>
                    <p className="text-stone-600 text-sm leading-relaxed text-justify">
                        艺术数字金融是将艺术与金融结合的创新领域，利用数字技术为艺术品交易和投资提供新的可能性。它不仅为艺术家和收藏家创造了更多的机会，也为投资者带来了独特的资产选择。
                    </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}
