export default function MarqueeStrip() {
  const items = [
    "药食同源 · 人类食用级标准",
    "兽医联合研发",
    "不添加无用填充物",
  ];

  return (
    <div className="bg-warm-dark text-warm-gold py-3 overflow-hidden text-xs tracking-[0.2em] uppercase">
      <div className="flex gap-12 animate-[scroll_20s_linear_infinite] whitespace-nowrap w-max">
        {[...items, ...items].map((item, i) => (
          <span key={i}>
            {item}
            {i < items.length * 2 - 1 && <span className="mx-6">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
