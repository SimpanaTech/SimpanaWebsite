"use client";

import { useEffect, useRef } from "react";

const format = (n, pad, suffix) =>
  `${pad ? String(n).padStart(pad, "0") : n}${suffix}`;

/**
 * Counts a figure up when it scrolls into view.
 *
 * The final value is what renders, so the number is correct without JS, under
 * reduced motion, and if the observer never fires. The animation writes to
 * textContent directly rather than through state - re-rendering a number 30
 * times is work nobody needs.
 */
export default function CountUp({
  target,
  pad = 0,
  suffix = "",
  duration = 1100,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    let frame;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        // ease-out so it settles rather than stopping dead
        const eased = 1 - Math.pow(1 - t, 3);
        node.textContent = format(Math.round(target * eased), pad, suffix);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started) {
          started = true;
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = format(target, pad, suffix);
    };
  }, [target, pad, suffix, duration]);

  return <span ref={ref}>{format(target, pad, suffix)}</span>;
}
