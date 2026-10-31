import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger in ms (60–90ms reads as one gesture). */
  delay?: number;
  /** Distance the element rises. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "span" | "p" | "figure";
};

/**
 * Wraps content in a [data-reveal] element.
 *
 * Content is visible by default in the HTML. The motion bootstrap only adds
 * the hiding class when scripting and motion are both available, so a script
 * failure never leaves content invisible.
 */
export function Reveal({ children, delay = 0, y = 24, className, as: Tag = "div" }: RevealProps) {
  return (
    <Tag
      data-reveal=""
      className={cn("reveal", className)}
      style={{ ["--reveal-delay" as string]: `${delay}ms`, ["--reveal-y" as string]: `${y}px` }}
    >
      {children}
    </Tag>
  );
}
