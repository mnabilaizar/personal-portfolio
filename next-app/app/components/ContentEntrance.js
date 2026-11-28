"use client";

import { useEffect } from "react";

export default function ContentEntrance() {
  useEffect(() => {
    const main = document.getElementById("portfolio-main");
    if (!main || !window.IntersectionObserver) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;

    const animations = new Map();
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        observer.unobserve(target);
        if (
          preference.matches ||
          target.matches(":focus-within") ||
          target.closest("section")?.matches(":focus-visible") ||
          !target.animate
        ) continue;

        const animation = target.animate([
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], {
          duration: 420,
          delay: target.hasAttribute("data-entrance-delay") ? 64 : 0,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        });
        animations.set(target, animation);
        animation.onfinish = () => animations.delete(target);
      }
    }, { threshold: 0.1 });

    function stopAnimations() {
      observer.disconnect();
      for (const animation of animations.values()) animation.cancel();
      animations.clear();
    }

    function revealFocused(event) {
      const target = event.target.closest("[data-entrance]");
      if (!target) return;
      observer.unobserve(target);
      animations.get(target)?.cancel();
      animations.delete(target);
    }

    main.querySelectorAll("[data-entrance]").forEach((target) => observer.observe(target));
    main.addEventListener("focusin", revealFocused);
    preference.addEventListener("change", stopAnimations);
    return () => {
      stopAnimations();
      preference.removeEventListener("change", stopAnimations);
      main.removeEventListener("focusin", revealFocused);
    };
  }, []);

  return null;
}
