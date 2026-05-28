export default function SocialStrip() {
  return (
    <section className="px-10 pb-20 max-w-6xl mx-auto">
      <h3 className="font-serif italic text-2xl text-warm-text mb-8 flex items-center gap-3">
        关注我们的小红书
        <span className="flex-1 h-px bg-warm-border" />
      </h3>
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-warm-border/40 rounded-lg flex items-center justify-center text-xs text-warm-text-dim">照片</div>
        ))}
      </div>
    </section>
  );
}
