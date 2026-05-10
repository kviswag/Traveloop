export function SiteBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="ambient-orb left-[8%] top-[10%] h-72 w-72"
        style={{
          background:
            "radial-gradient(circle at center, rgba(110, 231, 249, 0.28), transparent 68%)",
        }}
      />
      <div
        className="ambient-orb right-[10%] top-[18%] h-80 w-80"
        style={{
          animationDelay: "2.4s",
          background:
            "radial-gradient(circle at center, rgba(231, 198, 138, 0.22), transparent 70%)",
        }}
      />
      <div
        className="ambient-orb bottom-[5%] left-1/2 h-96 w-96 -translate-x-1/2"
        style={{
          animationDelay: "4.8s",
          background:
            "radial-gradient(circle at center, rgba(45, 212, 191, 0.18), transparent 72%)",
        }}
      />
      <div className="surface-grid absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,rgba(3,10,17,0.08)_0%,rgba(3,10,17,0.86)_70%,rgba(3,10,17,1)_100%)]" />
    </div>
  );
}
