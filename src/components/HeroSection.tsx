"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/01.png"
          alt="Hero Background"
          fill
          className="object-cover opacity-90"
          priority
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
        <h1 className="mb-8 font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide drop-shadow-lg leading-tight">
          藏古今之瑰宝 <br className="md:hidden" /> 集中外之精华
        </h1>
        <p className="font-sans text-sm md:text-lg lg:text-xl uppercase tracking-[0.2em] opacity-90 drop-shadow-md">
          保利永安旅游投资有限公司
        </p>
      </div>
    </section>
  );
}
