"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Navigasi.module.css";

const mobileQuery = "(max-width: 820px)";
const menuId = "navigasi-utama";

export default function Navigasi({ items, name }) {
  const homeId = items[0].id;
  const [activeId, setActiveId] = useState(homeId);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const scrollingElement = document.scrollingElement;
    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const headerBottom = headerRef.current.getBoundingClientRect().bottom;
      const activationLine =
        headerBottom + Math.min(window.innerHeight * 0.18, 112);
      const isAtEnd =
        scrollingElement.scrollTop > 0 &&
        scrollingElement.scrollTop + scrollingElement.clientHeight >=
          scrollingElement.scrollHeight - 2;

      let section;
      if (isAtEnd) {
        const hash = window.location.hash;
        // Short final sections can leave the requested anchor below the header.
        section =
          sections.find(
            (entry) =>
              `#${entry.id}` === hash &&
              entry.getBoundingClientRect().top >= headerBottom,
          ) ?? sections.at(-1);
      } else {
        section = sections.findLast(
          (entry) => entry.getBoundingClientRect().top <= activationLine,
        );
      }

      setActiveId(section?.id ?? homeId);
    }

    function scheduleUpdate() {
      if (!frame) {
        frame = window.requestAnimationFrame(updateActiveSection);
      }
    }

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [homeId, items]);

  useEffect(() => {
    if (!isOpen) return;

    const mobile = window.matchMedia(mobileQuery);

    function closeFromOutside(event) {
      if (!headerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        toggleRef.current.focus();
      }
    }

    function closeOnDesktop(event) {
      if (!event.matches) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("focusin", closeFromOutside);
    document.addEventListener("keydown", closeOnEscape);
    mobile.addEventListener("change", closeOnDesktop);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("focusin", closeFromOutside);
      document.removeEventListener("keydown", closeOnEscape);
      mobile.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  function followAnchor(event, id) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    setActiveId(id);
    setIsOpen(false);
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.focus({ preventScroll: true });
    });
  }

  return (
    <header className={styles.header} ref={headerRef}>
      <nav className={styles.navigasi} aria-label="Navigasi utama">
        <a
          href={"#" + homeId}
          className={styles.nama}
          onClick={(event) => followAnchor(event, homeId)}
        >
          {name}
          <span className={styles.titik} aria-hidden="true" />
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((open) => !open)}
          ref={toggleRef}
        >
          <span className={styles.toggleIcon} aria-hidden="true" />
          {isOpen ? "Tutup" : "Menu"}
        </button>

        <ul id={menuId} className={styles.tautan} data-open={isOpen}>
          {items.map(({ id, label }) => (
            <li key={id}>
              <a
                href={"#" + id}
                aria-current={activeId === id ? "location" : undefined}
                onClick={(event) => followAnchor(event, id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
