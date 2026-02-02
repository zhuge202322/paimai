"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const menuItems = ["首页", "公司简介", "领导团队", "馆藏精品", "证书查询", "联系我们"];

  return (
    <>
      {/* LOGO: Always Top-Left */}
      <motion.div
        className="fixed top-6 left-6 md:left-12 md:top-8 z-[70]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Link href="/" className="flex items-center gap-3 md:gap-4">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
               <Image 
                 src="/images/logo.png" 
                 alt="保利永安" 
                 fill 
                 className="object-contain"
               />
            </div>
        </Link>
      </motion.div>

      {/* 
        ===========================================
        DESKTOP MENU (MD+)
        Hidden on mobile, visible on medium screens and up
        ===========================================
      */}
      <motion.nav
        className="fixed z-[60] hidden lg:flex gap-4 md:gap-8 flex-row items-center lg:top-6 left-0 right-0 mx-auto w-fit px-10 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Horizontal Background Pill */}
        <motion.div 
            layoutId="navbar-pill"
            className="absolute inset-0 bg-black/30 backdrop-blur-md border border-white/10 rounded-full shadow-lg -z-10"
        />

        {menuItems.map((item) => {
            const Content = (
                <motion.div
                    className="uppercase tracking-widest text-[10px] md:text-xs font-bold cursor-pointer text-center whitespace-nowrap bg-transparent text-white hover:text-stone-200 transition-colors"
                >
                    {item}
                </motion.div>
            );

            const href = {
                "首页": "/",
                "公司简介": "/about",
                "领导团队": "/team",
                "馆藏精品": "/collection",
                "证书查询": "/certificate",
                "联系我们": "/contact"
            }[item] || "#";

            return <Link key={item} href={href}>{Content}</Link>;
        })}
      </motion.nav>

      {/* 
        ===========================================
        MOBILE MENU BUTTON & OVERLAY (< MD)
        Visible only on mobile
        ===========================================
      */}
      
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-6 right-6 z-[70] lg:hidden p-2 text-white mix-blend-difference focus:outline-none"
      >
        <div className="w-6 flex flex-col items-end gap-1.5">
            <motion.span 
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                className="w-full h-0.5 bg-white block" 
            />
            <motion.span 
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-3/4 h-0.5 bg-white block" 
            />
            <motion.span 
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0, width: isMobileMenuOpen ? "100%" : "50%" }}
                className="w-1/2 h-0.5 bg-white block" 
            />
        </div>
      </button>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed inset-0 z-[65] bg-stone-900 text-white flex flex-col justify-center px-12 lg:hidden"
            >
                <div className="flex flex-col gap-8">
                    {menuItems.map((item, i) => {
                         const href = {
                            "首页": "/",
                            "公司简介": "/about",
                            "领导团队": "/team",
                            "馆藏精品": "/collection",
                            "证书查询": "/certificate",
                            "联系我们": "/contact"
                        }[item] || "#";
                        
                         return (
                            <Link key={item} href={href} onClick={() => setIsMobileMenuOpen(false)}>
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    className="text-4xl font-serif border-b border-white/10 pb-4"
                                >
                                    {item}
                                </motion.div>
                            </Link>
                         );
                    })}
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-stone-500 text-xs uppercase tracking-widest"
                >
                    Houjie Town, Dongguan City <br/> Guangdong, China
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

