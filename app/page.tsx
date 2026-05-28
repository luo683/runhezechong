import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <div className="text-center py-20 text-warm-text-dim text-sm">
        更多内容正在施工中...
      </div>
    </>
  );
}
