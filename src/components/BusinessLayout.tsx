"use client";

import { motion } from "framer-motion";

const businessItems = [
  {
    title: "博物馆",
    description: "保利博物馆是展示中国文化与艺术的重要机构，收藏丰富的古代与现代艺术作品。我们定期举办展览和活动，欢迎您来探索艺术的魅力。"
  },
  {
    title: "拍卖",
    description: "保利拍卖致力于为艺术品收藏者和投资者提供优质的拍卖服务。我们汇聚了丰富艺术资源，定期举办各类主题拍卖，展示全球顶尖艺术家的杰作，旨在为您开启艺术投资的新视野。"
  },
  {
    title: "国际展览",
    description: "保利国际展览致力于为企业提供卓越的展览服务与解决方案。我们通过创新的展览设计和专业的团队，帮助客户在全球市场中脱颖而出。欢迎参与我们的展会，共同推动发展。"
  },
  {
    title: "数字艺术金融",
    description: "艺术数字金融是将艺术与金融结合的创新领域，利用数字技术为艺术品交易和投资提供新的性。它不仅为艺术家和收藏家创造了更多的机会，也为投资者来了独特的资产选择。"
  }
];

export default function BusinessLayout({ id }: { id?: string }) {
  return (
    <section id={id} className="py-24 bg-white text-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">集团业务板块</h2>
          <div className="w-16 h-1 bg-stone-900 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#F5F0EB] p-8 min-h-[400px] flex flex-col justify-center items-center hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="font-serif text-2xl text-stone-900 mb-6">{item.title}</h3>
              <p className="font-sans text-stone-600 text-sm leading-relaxed text-justify">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
