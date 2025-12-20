import HeroSection from "@/components/HeroSection";
import HeroSlider from "@/components/HeroSlider";
import ParallaxShowcase from "@/components/ParallaxShowcase";
import { getAllProducts, getPostBySlug, getPostsByCategory, getVisionaries } from "@/lib/api";

export default async function HomePage() {
  let products = [];
  try {
    products = await getAllProducts();
  } catch (e) {
    console.error("Products fetch failed", e);
  }

  let heroPost = null;
  try {
    heroPost = await getPostBySlug("just-forour-dearest");
  } catch (e) {
    console.error("Hero post fetch failed", e);
  }

  let hotSales = [];
  try {
    hotSales = await getPostsByCategory("shouyeremai");
  } catch (e) {
    console.error("Hot sales fetch failed", e);
  }
  
  let visionaries = [];
  try {
    visionaries = await getVisionaries();
  } catch (error) {
    console.warn("Failed to fetch visionaries data (ACF configuration might be missing). Using fallback data.");
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Opening Animation (Fixed Overlay) */}
      <HeroSection />

      {/* Main Content: Hero Slider */}
      <HeroSlider />
      
      {/* Visual Displacement / Parallax Product Showcase */}
      <ParallaxShowcase products={products} heroPost={heroPost} hotSales={hotSales} visionaries={visionaries} />
    </main>
  );
}
