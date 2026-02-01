"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Helper for image URLs
function fixUrl(url: string) {
  if (!url) return url;
  if (url.startsWith('/')) {
    return `http://45.145.229.20:6124${url}`;
  }
  return url.replace(':2025', ':6124');
}

export default function LeadershipTeam({ id, visionaries = [] }: { id?: string, visionaries?: any[] }) {
  
  // Process Data
  const { founder, coreTeam } = useMemo(() => {
    let allMembers = [];
    if (!visionaries || visionaries.length === 0) {
       // Fallback static data
       allMembers = [
          { 
              id: 1, 
              name: "阮永虎", 
              title: "董事长 / Chairman", 
              image: "/images/renwu/001.png",
              description: [
                  "阮永虎，1965年3月出生于中国安徽省合肥市。自幼聪慧勤学，对中华传统文化和艺术表现出浓厚兴趣。1979年，14岁的阮永虎怀揣对古代书画的热爱，前往北京，开始在故宫博物院深造，师从著名文物鉴定专家杨新教授。长达八年的沉浸式学习与实践，使他具备了独特的艺术品鉴与策划能力。",
                  "1997年10月，阮永虎与马保平、李楠等文化界同仁携手，共同创办中国保利文化艺术品有限公司，即为今日中国保利文化集团的前身。深度参与了诸多重大文化项目的策划与执行，包括举世瞩目的“圆明园十二生肖兽首回归”行动。",
                  "2004年，阮永虎赴澳门创办保利永安旅游投资有限公司，拓展文化与旅游产业的融合之路。公司自成立以来，致力于打造具有国际视野的综合性文化投资平台。"
              ]
          },
          { 
              id: 2, 
              name: "吴戴基", 
              title: "副董事长", 
              image: "/images/renwu/002.png",
              description: "资深文化产业投资人，拥有丰富的跨国企业管理经验。致力于推动中国传统文化的国际化传播与商业化运作。"
          },
          { 
              id: 3, 
              name: "刘志远", 
              title: "股东", 
              image: "/images/renwu/003.png",
              description: "著名艺术品收藏家，对明清瓷器有极深的研究。多次参与国内外大型拍卖会，为集团引进了众多国宝级藏品。"
          },
          { 
              id: 4, 
              name: "应金鸿", 
              title: "总经理", 
              image: "/images/renwu/004.png",
              description: "拥有二十余年旅游与酒店管理经验，主持了保利永安旗下多个文化旅游项目的开发与运营，擅长将文化资源转化为旅游体验。"
          },
          { 
              id: 5, 
              name: "马保平", 
              title: "公司顾问", 
              image: "/images/renwu/005.png",
              description: "文化界资深专家，曾任职于多个国家级文化机构。为集团的发展战略提供宏观指导与学术支持。"
          },
       ];
    } else {
        // Map API data
        allMembers = visionaries.map((item: any, index: number) => ({
            id: index + 1,
            name: item.name,
            title: item.title,
            image: fixUrl(item.image?.node?.sourceUrl) || "/images/renwu/001.png",
            description: item.description || "暂无简介" // Assuming API has description or we handle it
        }));
    }

    return {
        founder: allMembers[0],
        coreTeam: allMembers.slice(1)
    };
  }, [visionaries]);

  return (
      <section id={id} className="bg-[#fbf9f6] py-24 md:py-32">
         <div className="container mx-auto px-6">
            
            {/* Page Header */}
            <div className="text-center mb-24">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-[10px] tracking-[0.2em] text-[#8b4513] uppercase border-b border-[#8b4513]/30 pb-1">Leadership Team</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-stone-900 tracking-wide">领 导 团 队</h2>
                </div>
                <p className="text-stone-500 font-light text-sm tracking-widest">以远见卓识，引领文化传承与创新。</p>
            </div>

            {/* 1. Founder Section */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-32 max-w-6xl mx-auto">
                {/* Founder Image */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 relative aspect-[3/4] shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white p-4 rotate-1"
                >
                    <div className="relative w-full h-full overflow-hidden">
                        <Image 
                            src={founder.image} 
                            alt={founder.name} 
                            fill 
                            className="object-cover" 
                        />
                    </div>
                </motion.div>

                {/* Founder Info */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 pt-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-[1px] bg-[#8b4513]" />
                        <span className="text-[#8b4513] text-xs font-bold tracking-[0.2em] uppercase">创始人 · Founder</span>
                    </div>
                    
                    <h3 className="font-serif text-4xl text-stone-900 mb-2">{founder.name}</h3>
                    <p className="text-[#8b4513] text-sm uppercase tracking-widest mb-10">{founder.title}</p>
                    
                    <div className="space-y-6 text-stone-600 leading-relaxed text-justify text-sm md:text-base font-light">
                        {Array.isArray(founder.description) ? (
                            founder.description.map((para: string, i: number) => <p key={i}>{para}</p>)
                        ) : (
                            <p>{founder.description}</p>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* 2. Core Team Section */}
            <div className="mb-16 text-center">
                 <span className="text-[10px] tracking-[0.2em] text-[#8b4513] uppercase block mb-2">Core Team</span>
                 <h3 className="font-serif text-3xl text-stone-900">核心管理团队</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {coreTeam.map((member: any, idx: number) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 text-center group"
                    >
                        <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden bg-stone-100">
                             <Image 
                                src={member.image} 
                                alt={member.name} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                             />
                        </div>
                        <h4 className="font-serif text-xl text-stone-900 mb-1">{member.name}</h4>
                        <p className="text-[#8b4513] text-[10px] uppercase tracking-widest mb-4">{member.title}</p>
                        <div className="w-8 h-[1px] bg-stone-200 mx-auto mb-4" />
                        <p className="text-stone-500 text-xs leading-relaxed text-justify opacity-80 line-clamp-4">
                            {member.description}
                        </p>
                    </motion.div>
                ))}
            </div>

         </div>
      </section>
  );
}
