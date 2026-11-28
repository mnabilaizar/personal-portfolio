"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./CertificateGallery.module.css";

const fullDate = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "long",
  timeZone: "UTC",
});

const monthAndYear = new Intl.DateTimeFormat("id-ID", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function CertificateDate({ date }) {
  if (!date) return null;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;

  const formatted = /^\d{4}$/.test(date)
    ? date
    : /^\d{4}-\d{2}$/.test(date)
      ? monthAndYear.format(parsed)
      : fullDate.format(parsed);

  return <time dateTime={date}>{formatted}</time>;
}

function hasDocument(certificate) {
  return Boolean(certificate.thumbnail || certificate.documentUrl);
}

export default function CertificateGallery({ certificates }) {
  const [activeId, setActiveId] = useState(null);
  const [scrollEdges, setScrollEdges] = useState({ previous: false, next: false });
  const trackRef = useRef(null);
  const viewerRef = useRef(null);
  const closeRef = useRef(null);
  const openerRef = useRef(null);
  const trackId = useId();
  const titleId = useId();

  const viewableCertificates = certificates.filter(hasDocument);
  const activeIndex = viewableCertificates.findIndex(({ id }) => id === activeId);
  const activeCertificate = viewableCertificates[activeIndex];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateEdges() {
      const previous = track.scrollLeft > 2;
      const next = track.scrollWidth - track.clientWidth - track.scrollLeft > 2;

      setScrollEdges((edges) => (
        edges.previous === previous && edges.next === next ? edges : { previous, next }
      ));
    }

    const resizeObserver = new ResizeObserver(updateEdges);
    resizeObserver.observe(track);
    track.addEventListener("scroll", updateEdges, { passive: true });

    return () => {
      resizeObserver.disconnect();
      track.removeEventListener("scroll", updateEdges);
    };
  }, [certificates.length]);

  useEffect(() => {
    const viewer = viewerRef.current;

    if (activeId !== null && viewer && !viewer.open) {
      viewer.showModal();
      closeRef.current?.focus();
    }
  }, [activeId]);

  function moveTrack(direction) {
    if (!scrollEdges[direction]) return;

    const track = trackRef.current;
    const [first, second] = track.firstElementChild.children;
    if (!second) return;

    const step = second.offsetLeft - first.offsetLeft;
    track.scrollBy({ left: direction === "previous" ? -step : step });
  }

  function handleTrackKeyDown(event) {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveTrack(event.key === "ArrowLeft" ? "previous" : "next");
    }
  }

  function openViewer(event, id) {
    openerRef.current = event.currentTarget;
    setActiveId(id);
  }

  function closeViewer() {
    viewerRef.current.close();
    setActiveId(null);
    openerRef.current?.focus({ preventScroll: true });
  }

  function moveViewer(step) {
    const count = viewableCertificates.length;
    const nextIndex = (activeIndex + step + count) % count;
    const next = viewableCertificates[nextIndex];
    const focusedLink = document.activeElement?.dataset?.viewerLink;

    if (focusedLink && !next[focusedLink]) {
      closeRef.current?.focus();
    }

    setActiveId(next.id);
  }

  function handleViewerKeyDown(event) {
    if (event.key === "Tab") {
      const controls = event.currentTarget.querySelectorAll("button:not(:disabled), a[href]");
      const first = controls[0];
      const last = controls[controls.length - 1];
      const boundary = event.shiftKey ? first : last;

      if (document.activeElement === boundary) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }

      return;
    }

    if (viewableCertificates.length < 2 || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveViewer(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  if (certificates.length === 0) {
    return <p className={styles.empty}>Belum ada sertifikat untuk ditampilkan.</p>;
  }

  return (
    <div className={styles.gallery}>
      <div
        id={trackId}
        className={styles.track}
        ref={trackRef}
        role="region"
        aria-label="Galeri sertifikat"
        tabIndex={0}
        onKeyDown={handleTrackKeyDown}
      >
        <ul className={styles.list} role="list">
          {certificates.map((certificate) => (
            <li className={styles.record} key={certificate.id}>
              {certificate.thumbnail ? (
                <div className={styles.media}>
                  <Image
                    src={certificate.thumbnail.src}
                    width={certificate.thumbnail.width}
                    height={certificate.thumbnail.height}
                    sizes="(max-width: 600px) 80vw, (max-width: 950px) 45vw, 360px"
                    alt=""
                  />
                </div>
              ) : (
                <div className={`${styles.media} ${styles.typePreview}`}>
                  <h3 className={styles.credentialTitle}>{certificate.title}</h3>
                </div>
              )}
              <div className={styles.credential}>
                {certificate.thumbnail && (
                  <h3 className={styles.credentialTitle}>{certificate.title}</h3>
                )}
                <div className={styles.cardFooter}>
                  <p className={styles.details}>
                    {certificate.issuer && <span>{certificate.issuer}</span>}
                    <CertificateDate date={certificate.date} />
                  </p>
                  {hasDocument(certificate) ? (
                    <button
                      type="button"
                      className={styles.action}
                      aria-haspopup="dialog"
                      aria-label={`Lihat sertifikat ${certificate.title}`}
                      onClick={(event) => openViewer(event, certificate.id)}
                    >
                      Lihat sertifikat
                    </button>
                  ) : certificate.verificationUrl && (
                    <a
                      className={styles.action}
                      href={certificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verifikasi sertifikat ${certificate.title}`}
                    >
                      Verifikasi sertifikat
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {(scrollEdges.previous || scrollEdges.next) && (
        <div className={styles.trackControls} role="group" aria-label="Navigasi galeri sertifikat">
          <button
            type="button"
            className={styles.trackArrow}
            data-direction="previous"
            aria-label="Geser ke sertifikat sebelumnya"
            aria-controls={trackId}
            aria-disabled={!scrollEdges.previous}
            onClick={() => moveTrack("previous")}
          />
          <button
            type="button"
            className={styles.trackArrow}
            data-direction="next"
            aria-label="Geser ke sertifikat berikutnya"
            aria-controls={trackId}
            aria-disabled={!scrollEdges.next}
            onClick={() => moveTrack("next")}
          />
        </div>
      )}

      {viewableCertificates.length > 0 && (
        <dialog
          className={styles.viewer}
          ref={viewerRef}
          aria-labelledby={titleId}
          onCancel={(event) => {
            event.preventDefault();
            closeViewer();
          }}
          onKeyDown={handleViewerKeyDown}
        >
          {activeCertificate && (
            <>
              <div className={styles.viewerHeader}>
                <div>
                  <h3 id={titleId} className={styles.viewerTitle}>
                    {activeCertificate.title}
                  </h3>
                  <p className={styles.details}>
                    {activeCertificate.issuer && <span>{activeCertificate.issuer}</span>}
                    <CertificateDate date={activeCertificate.date} />
                  </p>
                </div>
                <button type="button" className={styles.control} ref={closeRef} onClick={closeViewer}>
                  Tutup
                </button>
              </div>

              {activeCertificate.thumbnail && (
                <div className={styles.preview}>
                  <Image
                    src={activeCertificate.thumbnail.src}
                    width={activeCertificate.thumbnail.width}
                    height={activeCertificate.thumbnail.height}
                    sizes="(max-width: 800px) 90vw, 770px"
                    alt={activeCertificate.thumbnail.alt || `Pratinjau ${activeCertificate.title}`}
                  />
                </div>
              )}

              {(activeCertificate.documentUrl || activeCertificate.verificationUrl) && (
                <div className={styles.viewerLinks}>
                  {activeCertificate.documentUrl && (
                    <a
                      href={activeCertificate.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-viewer-link="documentUrl"
                    >
                      Buka dokumen asli
                    </a>
                  )}
                  {activeCertificate.verificationUrl && (
                    <a
                      href={activeCertificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-viewer-link="verificationUrl"
                    >
                      Verifikasi sertifikat
                    </a>
                  )}
                </div>
              )}

              {viewableCertificates.length > 1 && (
                <nav className={styles.viewerNav} aria-label="Navigasi sertifikat">
                  <button type="button" className={styles.control} onClick={() => moveViewer(-1)}>
                    Sebelumnya
                  </button>
                  <p className={styles.viewerPosition} aria-live="polite" aria-atomic="true">
                    <span className={styles.srOnly}>{activeCertificate.title}. </span>
                    {activeIndex + 1} dari {viewableCertificates.length}
                  </p>
                  <button type="button" className={styles.control} onClick={() => moveViewer(1)}>
                    Berikutnya
                  </button>
                </nav>
              )}
            </>
          )}
        </dialog>
      )}
    </div>
  );
}
