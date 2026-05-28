export default function TestimonialGrid() {
  return (
    <section className="px-10 py-20 max-w-6xl mx-auto">
      <div className="grid grid-cols-[1fr_2fr] gap-14">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-80">
          <div className="row-span-2 bg-warm-border/40 rounded-xl flex items-center justify-center text-sm text-warm-text-dim">宠物照片</div>
          <div className="bg-warm-border/40 rounded-xl flex items-center justify-center text-sm text-warm-text-dim">宠物照片</div>
          <div className="bg-warm-border/40 rounded-xl flex items-center justify-center text-sm text-warm-text-dim">宠物照片</div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs tracking-[0.2em] uppercase text-warm-accent mb-5">They Said</span>
          <blockquote className="font-serif italic text-2xl leading-relaxed text-warm-text border-none p-0 m-0">
            "换了润禾泽宠之后，我家猫的毛掉了少了一半。兽医说这个配方确实靠谱，已经是第四次回购了。"
          </blockquote>
          <p className="text-sm text-warm-text-dim mt-5">@catmom_lily · 小红书</p>
        </div>
      </div>
    </section>
  );
}
