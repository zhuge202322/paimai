import HeroSection from "@/components/HeroSection";
import CompanyProfile from "@/components/CompanyProfile";
import BusinessLayout from "@/components/BusinessLayout";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Opening Animation (Fixed Overlay) */}
      <HeroSection />

      {/* Section 1: Company Profile (Main Page Content) */}
      <CompanyProfile id="company" />

      {/* Section 1.5: Business Layout */}
      <BusinessLayout />
    </main>
  );
}
