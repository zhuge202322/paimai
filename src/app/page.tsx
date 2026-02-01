import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/home/HomeAbout";
import HomeArtExhibition from "@/components/home/HomeArtExhibition";
import HomeLeadership from "@/components/home/HomeLeadership";
import HomeCollection from "@/components/home/HomeCollection";
import HomeCertificate from "@/components/home/HomeCertificate";
import { getPostsByCategory } from "@/lib/api";

export default async function HomePage() {
  let products = [];
  try {
    // Fetch a few products for the homepage preview
    products = await getPostsByCategory("chanpin", 4); 
  } catch (error) {
    console.error("Home fetch error", error);
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Opening Animation (Fixed Overlay) */}
      <HeroSection />

      {/* Section 1: About Us Summary */}
      <HomeAbout />
      
      {/* Section 2: Leadership Team Preview */}
      <HomeLeadership />

      {/* Section 3: Collection Highlights Preview */}
      <HomeCollection products={products} />

      {/* Section 4: Art Exhibition (Two Products) */}
      <HomeArtExhibition products={products} />

      {/* Section 5: Certificate Query Preview */}
      <HomeCertificate />
    </main>
  );
}
