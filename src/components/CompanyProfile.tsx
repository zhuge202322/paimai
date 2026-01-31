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

        {/* Founder Intro */}
        <div className="border-t border-stone-200 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-4">
                     <div className="relative aspect-[3/4] bg-stone-200 grayscale">
                        <Image 
                           src="/images/renwu/001.png" 
                           alt="阮永虎" 
                           fill 
                           className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 bg-stone-900 text-white p-4">
                            <h3 className="text-xl font-serif">阮永虎</h3>
                            <p className="text-xs uppercase tracking-widest opacity-70">公司创始人</p>
                        </div>
                     </div>
                </div>
                <div className="lg:col-span-8">
                    <h2 className="font-serif text-3xl text-stone-900 mb-6">创始人致辞</h2>
                    <div className="space-y-4 text-stone-600 leading-relaxed text-sm md:text-base text-justify columns-1 md:columns-2 gap-8">
                        <p>
                            阮永虎，男，1965年3月出生于中国安徽省合肥市。自幼聪慧勤学，对中华传统文化和艺术表现出浓厚兴趣。1979年，14岁的阮永虎怀揣对古代书画的热爱，前往北京，开始在故宫博物院深造，系统学习古代书画的鉴定与研究工作。他有幸师从著名文物鉴定专家、时任故宫博物院副院长、博士生导师杨新教授，深得其真传。
                        </p>
                        <p>
                            1987年底，阮永虎南下深圳，加入振兴实业有限公司，开始将所学专业知识应用于文化产业实践。他在企业发展过程中逐步积累了丰富的管理经验和市场洞察力，为其日后创业打下了坚实的商业基础。
                        </p>
                        <p>
                            1997年10月，阮永虎与马保平、李楠等文化界同仁携手，在国家文化产业发展的大背景下，共同创办中国保利文化艺术品有限公司，开启了中国艺术品市场化运作的新篇章。该公司即为今日中国保利文化集团的前身。作为创始成员之一，阮永虎先生深度参与了诸多重大文化项目的策划与执行，包括举世瞩目的“圆明园十二生肖兽首回归”行动，彰显了强烈的文化使命感与家国情怀。
                        </p>
                        <p>
                            2004年，阮永虎赴澳门创办保利永安旅游投资有限公司，拓展文化与旅游产业的融合之路。公司自成立以来，持续推动中西文化交流与艺术品资源整合，积极参与文物资产化、文化金融及跨境文旅项目的开发，致力于打造具有国际视野的综合性文化投资平台。
                        </p>
                        <p>
                            历经数十年耕耘，阮永虎始终秉持“传承中华文明、弘扬民族文化”的初心，身体力行地推进中国艺术品市场的健康发展，为中华文化走向世界做出了卓越贡献。
                        </p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}
