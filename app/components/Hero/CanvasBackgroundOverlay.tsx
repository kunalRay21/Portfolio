import Image from "next/image";

interface BackgroundOverlayProps {
  imageSrc?: string;
  opacity?: number;
}

export default function CanvasBackgroundOverlay({
  imageSrc = "/BackgroundOverlay.png",
  opacity = 0.55,
}: BackgroundOverlayProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Image
        src={imageSrc}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{
          opacity,
          mixBlendMode: "soft-light",
        }}
      />
      {/* <div className="absolute inset-0 hero-grid opacity-25" /> */}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-emerald-300 via-white to-emerald-200 opacity-15" />

      {/* Contrast + vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/20 to-black/85" />

      {/* Aurora glow layer (CSS-only) */}
      <div className="absolute inset-0 hero-aurora opacity-70" />

      {/* Subtle grid sheen (CSS-only) */}
    </div>
  );
}
