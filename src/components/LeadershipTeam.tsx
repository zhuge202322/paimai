"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Helper for image URLs
function fixUrl(url: string) {
  if (!url) return url;
  if (url.startsWith('/')) {
    return `http://45.145.229.20:6124${url}`;
  }
  return url.replace(':2025', ':6124');
}

export default function LeadershipTeam({ id, visionaries = [] }: { id?: string, visionaries?: any[] }) {
  const teamRef = useRef<HTMLElement>(null);
  
  // Process Visionaries Data
  const designers = useMemo(() => {
    if (!visionaries || visionaries.length === 0) {
       // Fallback static data for demo
       return [
          { id: 1, name: "阮永虎", title: "董事长", image: "/images/renwu/001.png" },
          { id: 2, name: "吴戴基", title: "副董事长", image: "/images/renwu/002.png" },
          { id: 3, name: "刘志远", title: "股东", image: "/images/renwu/003.png" },
          { id: 4, name: "应金鸿", title: "总经理", image: "/images/renwu/004.png" },
          { id: 5, name: "马保平", title: "公司顾问", image: "/images/renwu/005.png" },
       ];
    }
    return visionaries.map((item: any, index: number) => ({
        id: index + 1,
        name: item.name,
        title: item.title,
        image: fixUrl(item.image?.node?.sourceUrl) || "/images/renwu/001.png"
    }));
  }, [visionaries]);

  // Team Section Parallax (Spiral Staircase Logic)
  const { scrollYProgress: teamScroll } = useScroll({
    target: teamRef,
    offset: ["start start", "end end"]
  });
  
  // Calculate dynamic target values based on item count
  // We want the LAST item to end up at rotation 0 (facing front) and centered
  const itemCount = designers.length;
  const lastIndex = Math.max(0, itemCount - 1);
  const targetRotate = -(lastIndex * 45);
  const targetY = -(lastIndex * 250);

  // Animate from 0 to 85% of scroll, then hold for the last 15%
  // This ensures the last image stays in front for a moment before scrolling away
  const spiralRotate = useTransform(teamScroll, [0, 0.85, 1], [0, targetRotate, targetRotate]);
  const spiralY = useTransform(teamScroll, [0, 0.85, 1], ["0px", `${targetY}px`, `${targetY}px`]);

  return (
      <section id={id} ref={teamRef} className="relative h-[400vh] bg-[#f8f8f6]">
         <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center perspective-1000">
            
            <div className="absolute top-12 md:top-24 z-20 text-center w-full px-6">
                <h2 className="font-serif text-5xl md:text-6xl text-stone-900 mb-4">领导团队</h2>
                <p className="font-sans text-stone-500 max-w-lg mx-auto">
                   汇聚行业顶尖专家，为您提供专业的艺术品鉴定与评估服务。
                </p>
            </div>

            {/* 3D Scene Container */}
            <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1500px" }}>
               <motion.div 
                 style={{ 
                    rotateY: spiralRotate, 
                    y: spiralY,
                    transformStyle: "preserve-3d" // Critical for 3D children
                 }}
                 className="relative w-full h-full"
               >
                 {designers.map((designer, index) => {
                    // Calculate position for each step of the spiral
                    const angle = index * 45; // 360 / 8 designers = 45 degrees per step
                    const yOffset = index * 250; // Vertical distance between steps
                    const radius = 500; // Radius of the spiral

                    return (
                       <div 
                         key={designer.id}
                         className="absolute top-1/2 left-1/2 w-[300px] md:w-[400px] aspect-[3/4] -ml-[150px] md:-ml-[200px] -mt-[200px]"
                         style={{
                            transform: `translateY(${yOffset}px) rotateY(${angle}deg) translateZ(${radius}px)`,
                            backfaceVisibility: "hidden" // Optional: hide back face for performance
                         }}
                       >
                          <div className="block w-full h-full cursor-pointer">
                            <div className="relative w-full h-full bg-white p-4 shadow-2xl border border-stone-100 transform transition-transform hover:scale-105 duration-500">
                               <div className="relative w-full h-[85%] overflow-hidden bg-stone-100">
                                  <Image 
                                    src={designer.image} 
                                    alt={designer.name} 
                                    fill 
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                                  />
                               </div>
                               <div className="pt-4 text-center">
                                  <h4 className="font-serif text-xl text-stone-900">{designer.name}</h4>
                                  <p className="text-[10px] tracking-widest uppercase text-stone-500 mt-1">{designer.title}</p>
                               </div>
                            </div>
                          </div>
                       </div>
                    );
                 })}
               </motion.div>
            </div>
         </div>
      </section>
  );
}
