"use client";

import { useEffect } from "react";

/**
 * Motion bootstrap.
 *
 * Adds `js-motion` to <html> only when scripting is available, then reveals
 * elements marked with [data-reveal] once, as they enter the viewport.
 *
 * If this script never runs, the class is never added and all content stays
 * visible, so a script failure can never hide the page.
 */
export function MotionInit() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    root.classList.add("js-motion");
    root.classList.add("js");

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
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

    for (const node of nodes) observer.observe(node);

    // Reveal anything already in view on load (above the fold).
    requestAnimationFrame(() => {
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          node.classList.add("is-revealed");
          observer.unobserve(node);
        }
      }
    });

    // Safety net: nothing may ever sit at opacity 0. If a visitor (or an
    // automated walk) reaches a section whose observer callback has not yet
    // fired, reveal every element at or above the fold on the next scroll
    // frame. This keeps the reveal choreography while guaranteeing that
    // content is never left invisible.
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

    // Final guarantee: after a short settle, reveal anything still hidden that
    // is above the current viewport bottom. Covers programmatic jumps that
    // never emit a scroll event.
    const settle = window.setTimeout(sweep, 1200);

    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
