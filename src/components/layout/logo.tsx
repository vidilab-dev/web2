import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Bionusa lockup — the official mark with the "Bionusa" wordmark beneath it
 * (transparent PNG cropped from the brand file). The lockup is tall, so it is
 * sized by height and every surface picks its own scale. `tone` follows the
 * ground: the white cut for dark surfaces, the colour cut for light ones.
 */
export function LogoMark({
  className,
  tone = "color",
}: {
  className?: string;
  tone?: "color" | "white";
}) {
  return (
    <Image
      src={tone === "white" ? "/images/bionusa-logo-white.png" : "/images/bionusa-logo.png"}
      alt=""
      aria-hidden="true"
      width={639}
      height={1048}
      loading="eager"
      sizes="192px"
      className={cn("h-12 w-auto shrink-0 object-contain", className)}
    />
  );
}

/**
 * The same motif as a single-colour vector, for places the mark has to
 * inherit a tone: the enlarged watermarks behind product plates. Raster
 * artwork cannot follow the plate's palette, so the vector stays.
 */
export function WatermarkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("size-7 shrink-0 md:size-8", className)}
    >
      {/* Open cycle */}
      <path
        d="M16 3.5a12.5 12.5 0 1 1-8.84 3.66"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
      {/* Stem */}
      <path d="M16 24.2V13.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      {/* Leaf, right */}
      <path d="M16.2 15.6c0-3.1 2.5-5.6 5.6-5.6 0 3.1-2.5 5.6-5.6 5.6Z" fill="currentColor" />
      {/* Leaf, left */}
      <path
        d="M15.8 19.4c0-2.5-2-4.5-4.5-4.5 0 2.5 2 4.5 4.5 4.5Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

/** Header lockup: Bionusa logo beside the legal name. */
export function Logo({
  className,
  tone,
}: {
  className?: string;
  tone?: "color" | "white";
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-12 md:h-14" tone={tone} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.8125rem] font-extrabold tracking-[-0.012em] md:text-[0.9375rem]">
          PT BIO INDUSTRI
        </span>
        <span className="mt-[3px] text-[0.5625rem] font-semibold tracking-[0.24em] opacity-70 md:text-[0.625rem]">
          NUSANTARA
        </span>
      </span>
    </span>
  );
}
