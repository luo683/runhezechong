import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProductShowcase from "@/components/ProductShowcase";
import EditorialSection from "@/components/EditorialSection";
import TestimonialGrid from "@/components/TestimonialGrid";
import SocialStrip from "@/components/SocialStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <ProductShowcase />
      <EditorialSection />
      {/* Divider with personality */}
      <div className="max-w-6xl mx-auto px-10">
        <div className="border-t border-warm-border" />
      </div>
      <TestimonialGrid />
      <SocialStrip />
    </>
  );
}
