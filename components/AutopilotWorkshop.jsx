'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { WORKSHOP } from '../data/autopilot-workshop';

// Testimonial wall: each column is at least 280px wide with 16px gaps.
const WALL_COL = 280;
const WALL_GAP = 16;

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Replaces a {token} in a copy string with styled emphasis.
function withEmphasis(text, token, value, className) {
  if (!text.includes(token)) return text;
  const [before, after] = text.split(token);
  return (
    <>
      {before}
      <strong className={className}>{value}</strong>
      {after}
    </>
  );
}

function Heading({ as: Tag = 'h2', id, className, before, accent, after }) {
  return (
    <Tag id={id} className={className}>
      {before} <em>{accent}</em>
      {after ? ` ${after}` : null}
    </Tag>
  );
}

function CtaButton({ label, onOpen, className = '' }) {
  return (
    <button type="button" className={`apws-button ${className}`} onClick={onOpen}>
      {label} <span aria-hidden="true">→</span>
    </button>
  );
}

// Greedy balance: longest comment first, always into the shortest column,
// so column heights come out close to even.
function balance(comments, n) {
  const cols = Array.from({ length: n }, () => []);
  const heights = new Array(n).fill(0);
  [...comments]
    .sort((a, b) => b.text.length - a.text.length)
    .forEach((c) => {
      const i = heights.indexOf(Math.min(...heights));
      cols[i].push(c);
      heights[i] += c.text.length + 90;
    });
  return cols;
}

function CommentCard({ c }) {
  return (
    <figure className="apws-comment">
      <span className="apws-avatar" aria-hidden="true">{c.handle[0].toUpperCase()}</span>
      <div className="apws-comment-main">
        <blockquote className="apws-comment-text">
          <span className="apws-comment-handle">{c.handle}</span>
          <span className="apws-comment-body">{c.text}</span>
        </blockquote>
        <div className="apws-comment-meta" aria-hidden="true">
          <span>{c.likes === 1 ? '1 like' : `${c.likes} likes`}</span>
          <span>Reply</span>
        </div>
      </div>
      <span className="apws-heart" aria-hidden="true">♥</span>
    </figure>
  );
}

function CommentWall({ comments }) {
  const ref = useRef(null);
  // null until measured: the server HTML falls back to a CSS auto-fill grid
  // so phones don't flash three squashed columns before JavaScript runs.
  const [n, setN] = useState(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const next = Math.max(1, Math.floor((el.clientWidth + WALL_GAP) / (WALL_COL + WALL_GAP)));
      setN((prev) => (prev === next ? prev : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="apws-wall" style={n ? { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` } : undefined}>
      {(n ? balance(comments, n) : comments.map((c) => [c])).map((col, i) => (
        <div key={i} className="apws-wall-col">
          {col.map((c) => <CommentCard key={c.handle} c={c} />)}
        </div>
      ))}
    </div>
  );
}

function Ticker({ phrases }) {
  // The run renders twice so translating by -50% loops seamlessly; the
  // second copy is hidden from screen readers.
  const run = (hidden) =>
    phrases.map((p, i) => (
      <span key={`${hidden ? 'b' : 'a'}${i}`} className="apws-ticker-item" aria-hidden={hidden || undefined}>
        {p}
        <span className="apws-ticker-dot" aria-hidden="true" />
      </span>
    ));
  return (
    <div className="apws-ticker">
      <div className="apws-ticker-track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

// Always mounted (hidden until opened) because EasyWebinar's widget script
// scans the page for its container once, when it loads. Hidden with
// visibility, not display:none, so the widget's iframe can measure itself.
function RegistrationModal({ open, onClose }) {
  const m = WORKSHOP.modal;
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const pressedOverlay = useRef(false);

  // React 18 has no boolean `inert` prop; set the attribute so the closed
  // modal is out of the tab order and hidden from screen readers.
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (open) el.removeAttribute('inert');
    else el.setAttribute('inert', '');
  }, [open]);

  // Esc closes; body scroll locks while open. (Keys pressed inside the
  // EasyWebinar iframe never reach this page, so Esc only works outside it.)
  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus({ preventScroll: true });
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // The widget's iframe is same-origin (srcdoc), so give its fields the
  // page's font and edges. EasyWebinar's own font setting doesn't load Inter.
  useEffect(() => {
    const box = overlayRef.current?.querySelector('.apws-ew-form');
    if (!box) return undefined;
    const style = (iframe) => {
      try {
        const doc = iframe.contentDocument;
        if (!doc?.head || doc.getElementById('gmp-ew-style')) return;
        const fontFaces = [];
        for (const sheet of document.styleSheets) {
          let rules;
          try {
            rules = sheet.cssRules;
          } catch {
            continue;
          }
          for (const r of rules) if (r instanceof CSSFontFaceRule && /Inter/.test(r.cssText)) fontFaces.push(r.cssText);
        }
        const font = getComputedStyle(document.body).getPropertyValue('--sans') || 'Helvetica Neue, Arial, sans-serif';
        const el = doc.createElement('style');
        el.id = 'gmp-ew-style';
        el.textContent = `${fontFaces.join('\n')}
          body, input, button, label, span, p, div { font-family: ${font} !important; }
          input[type="text"] { border: 1.5px solid #241710 !important; border-radius: 8px !important; color: #241710 !important; }
          input[type="text"]:focus { border-color: #c55123 !important; outline: none !important; }
          button.widget-action-registration { border-radius: 999px !important; font-weight: 600 !important; }`;
        doc.head.appendChild(el);
      } catch {
        // Styling is cosmetic; the form still works without it.
      }
    };
    const attach = () => {
      box.querySelectorAll('iframe').forEach((iframe) => {
        style(iframe);
        if (!iframe.dataset.gmpStyled) {
          iframe.dataset.gmpStyled = '1';
          iframe.addEventListener('load', () => style(iframe));
        }
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(box, { childList: true, subtree: true });
    const timer = setInterval(attach, 1000);
    const stop = setTimeout(() => clearInterval(timer), 20000);
    return () => {
      mo.disconnect();
      clearInterval(timer);
      clearTimeout(stop);
    };
  }, []);

  // Focus that tabs past either edge of the card (including out of the
  // iframe) lands on a sentinel and is sent back to the close button.
  const trapFocus = () => closeRef.current?.focus({ preventScroll: true });
  const titleId = 'apws-modal-title';

  return (
    <div
      ref={overlayRef}
      className={`apws-overlay${open ? ' is-open' : ''}`}
      aria-hidden={open ? undefined : true}
      // Close only when the press AND the release both land on the dark
      // backdrop, so dragging to select text in a field never closes it.
      onMouseDown={(e) => {
        pressedOverlay.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (pressedOverlay.current && e.target === e.currentTarget) onClose();
        pressedOverlay.current = false;
      }}
    >
      <span tabIndex={open ? 0 : -1} className="apws-sentinel" onFocus={trapFocus} />
      <div className="apws-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button ref={closeRef} type="button" className="apws-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <p className="gmp-eyebrow apws-modal-eyebrow">{m.eyebrow}</p>
        <Heading
          as="h3"
          id={titleId}
          className="apws-modal-h3"
          before={m.headline}
          accent={m.headlineAccent}
          after={m.headlineAfter}
        />
        <p className="apws-modal-intro">{m.intro}</p>
        <div className="apws-ew-form">
          <p className="apws-ew-loading" aria-hidden="true">{m.loading}</p>
          <div
            className="ew-wid"
            data-wid={WORKSHOP.registration.widgetId}
            data-loaded="no"
            data-schloaded="no"
          />
        </div>
        <p className="apws-small-print">{m.smallPrint}</p>
      </div>
      <span tabIndex={open ? 0 : -1} className="apws-sentinel" onFocus={trapFocus} />
    </div>
  );
}

export default function AutopilotWorkshop() {
  const [modalOpen, setModalOpen] = useState(false);
  const triggerRef = useRef(null);
  const { hero, learn, who, testimonials, bonus, faq, note, eventDate } = WORKSHOP;

  const openModal = (e) => {
    triggerRef.current = e.currentTarget;
    setModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }, []);

  return (
    <div className="apws">
      {/* 1. Nav */}
      <header className="apws-wrap apws-nav">
        <img src="/images/autopilot/gmp-logo.png" alt="Growth Mindset Parenting" width="242" height="30" className="apws-logo" />
        <button type="button" className="apws-pill" onClick={openModal}>
          <span className="apws-pill-dot" aria-hidden="true" />
          {WORKSHOP.nav.pill} · {eventDate}
        </button>
      </header>

      <main>
        {/* 2. Hero */}
        <section className="apws-wrap apws-hero">
          <div>
            <p className="gmp-eyebrow apws-hero-eyebrow">{hero.eyebrow}</p>
            <Heading as="h1" className="apws-h1" before={hero.headline} accent={hero.headlineAccent} />
            <p className="apws-dek">{hero.dek}</p>
            <div className="apws-cta-row">
              <CtaButton label={hero.cta} onOpen={openModal} />
              <p className="apws-meta">
                {eventDate} · {hero.meta}
              </p>
            </div>
          </div>
          <div className="apws-photo-wrap">
            <img
              src="/images/autopilot/workshop-hero.jpg"
              alt="Sean Kane"
              width="1200"
              height="1800"
              className="apws-photo apws-photo--hero"
              fetchPriority="high"
            />
            <span className="apws-chip">{hero.photoCaption}</span>
          </div>
        </section>

        {/* 3. Ticker */}
        <Ticker phrases={WORKSHOP.ticker} />

        {/* 4. What you'll learn */}
        <section className="apws-wrap apws-section">
          <p className="gmp-eyebrow apws-eyebrow-gap">{learn.eyebrow}</p>
          <Heading
            className="apws-h2 apws-learn-h2"
            before={learn.headline}
            accent={learn.headlineAccent}
            after={learn.headlineAfter}
          />
          <div className="apws-learn-grid">
            {learn.items.map((it, i) => (
              <div key={it.title} className="apws-learn-cell">
                <span className="apws-learn-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="apws-h3">{it.title}</h3>
                <p className="apws-body">{it.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Who this is for */}
        <section className="apws-wrap apws-section">
          <div className="apws-split">
            <div className="apws-sticky">
              <p className="gmp-eyebrow apws-eyebrow-gap">{who.eyebrow}</p>
              <Heading className="apws-h2 apws-h2--tight" before={who.headline} accent={who.headlineAccent} />
              <p className="apws-body apws-who-intro">{who.intro}</p>
              <CtaButton label={who.cta} onOpen={openModal} />
            </div>
            <ol className="apws-rows">
              {who.items.map((w, i) => (
                <li key={w.quote} className="apws-who-row">
                  <span className="apws-who-num" aria-hidden="true">{i + 1}</span>
                  <div>
                    <p className="apws-who-quote">{`“${w.quote}”`}</p>
                    <p className="apws-body">{w.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. Testimonials */}
        <section className="apws-wrap apws-section">
          <p className="gmp-eyebrow apws-eyebrow-gap">{testimonials.eyebrow}</p>
          <Heading
            className="apws-h2 apws-testimonials-h2"
            before={testimonials.headline}
            accent={testimonials.headlineAccent}
          />
          <p className="apws-body apws-testimonials-intro">{testimonials.intro}</p>
          <CommentWall comments={testimonials.comments} />
        </section>

        {/* 7. Show-up bonus */}
        <section className="apws-wrap apws-section">
          <div className="apws-bonus">
            <div>
              <span className="apws-stamp">{bonus.stamp}</span>
              <Heading className="apws-h2 apws-bonus-h2" before={bonus.headline} accent={bonus.headlineAccent} />
              {bonus.paragraphs.map((p) => (
                <p key={p} className="apws-body apws-bonus-p">{p}</p>
              ))}
              <CtaButton label={bonus.cta} onOpen={openModal} className="apws-bonus-cta" />
            </div>
            <div className="apws-agenda">
              <p className="gmp-eyebrow apws-agenda-eyebrow">{bonus.cardEyebrow}</p>
              <ol className="apws-agenda-list">
                {bonus.agenda.map((a, i) => (
                  <li key={a} className="apws-agenda-row">
                    <span className="apws-agenda-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="apws-agenda-label">{a}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="apws-wrap apws-section">
          <div className="apws-split">
            <div>
              <p className="gmp-eyebrow apws-eyebrow-gap">{faq.eyebrow}</p>
              <Heading className="apws-h2 apws-h2--tight" before={faq.headline} accent={faq.headlineAccent} />
            </div>
            <div>
              {faq.items.map((f) => (
                <div key={f.q} className="apws-faq-row">
                  <h3 className="apws-faq-q">{f.q}</h3>
                  <p className="apws-body">{f.a}</p>
                </div>
              ))}
              <div className="apws-faq-end">
                <CtaButton label={faq.cta} onOpen={openModal} />
              </div>
            </div>
          </div>
        </section>

        {/* 9. A note from Sean */}
        <section className="apws-wrap apws-section apws-note">
          <div className="apws-split">
            <div className="apws-photo-wrap">
              <img
                src="/images/autopilot/sean-studio.jpg"
                alt="Sean Kane"
                width="1000"
                height="1500"
                loading="lazy"
                className="apws-photo apws-photo--square"
              />
              <span className="apws-chip">{note.photoCaption}</span>
            </div>
            <div>
              <p className="gmp-eyebrow apws-eyebrow-gap">{note.eyebrow}</p>
              <Heading className="apws-h2 apws-note-h2" before={note.headline} accent={note.headlineAccent} />
              <div className="apws-note-body">
                {note.paragraphs.map((p) => (
                  <p key={p}>{withEmphasis(p, '{emphasis}', note.emphasis, 'apws-inline-emph')}</p>
                ))}
              </div>
              <div className="apws-cta-row apws-note-cta">
                <CtaButton label={note.cta} onOpen={openModal} />
                <p className="apws-meta">
                  {eventDate} · {note.meta}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Footer */}
      <footer className="apws-footer">
        <div className="apws-wrap apws-footer-inner">
          <span>{WORKSHOP.copyright}</span>
          <nav className="apws-footer-links" aria-label="Legal">
            {WORKSHOP.legalLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
        </div>
      </footer>

      <RegistrationModal open={modalOpen} onClose={closeModal} />
      {/* EasyWebinar registration widget; loads after the page so it never slows it down. */}
      <Script src={WORKSHOP.registration.scriptSrc} strategy="lazyOnload" />
    </div>
  );
}
