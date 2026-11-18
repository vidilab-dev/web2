"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pre-paint effects run before the browser paints the committed tree; on the
 * server they never run at all, so pick the hook that is safe in both worlds.
 */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Motion bootstrap.
 *
 * Guarantees, in order of importance:
 *
 * 1. Content that is already on screen is NEVER hidden — not for a single
 *    frame. In-view elements are marked `is-revealed` before the hiding CSS
 *    (`html.js-motion [data-reveal]`) is enabled, so text painted at first
 *    contentful paint stays painted. No blink, no JS-gated text.
 * 2. The reveal choreography still applies to everything below the fold as
 *    the visitor scrolls (observer + scroll sweep + settle safety net).
 * 3. The bootstrap re-runs on every client-side navigation, so new pages get
 *    observed and their in-view content is revealed in the first paint of
 *    the route — previously new wrappers were never revealed at all.
 *
 * If scripting fails, the class is never added and all content stays visible,
 * so a script failure can never hide the page.
 */
export function MotionInit() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    // (1) Anything intersecting the viewport right now was already painted at
    // opacity 1. Lock it visible BEFORE enabling the hiding rule, so the
    // style change never computes to 0 for content the visitor can see.
    // `is-instant` also kills the transition so a navigated-to route shows
    // its text in the very first paint instead of re-running the entrance.
    for (const node of nodes) {
      if (node.getBoundingClientRect().top < window.innerHeight) {
        node.classList.add("is-revealed", "is-instant");
      }
    }

    root.classList.add("js-motion");
    root.classList.add("js");

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "300px 0px 300px 0px", threshold: 0.01 }
    );

    for (const node of nodes) {
      if (!node.classList.contains("is-revealed")) observer.observe(node);
    }

    // Reveal anything already in view as the viewport moves (resize, anchor
    // jumps). This is a plain visual sweep — it does not drive scroll.
    let ticking = false;
    const sweep = () => {
      ticking = false;
      for (const node of nodes) {
        if (node.classList.contains("is-revealed")) continue;
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight + 400) {
          node.classList.add("is-revealed");
          observer.unobserve(node);
        }
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Safety net: after a short settle, reveal anything still hidden that is
    // above the current viewport bottom. Covers programmatic jumps that never
    // emit a scroll event, so content is never left invisible.
    const settle = window.setTimeout(sweep, 1200);

    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
