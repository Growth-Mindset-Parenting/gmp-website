// The paper aeroplane and its dotted flight path, from the popup design
// handoff. Purely decorative: it sits behind the content and takes no clicks.
//
// Desktop and mobile are different drawings, not one drawing scaled, so both
// are rendered and the CSS shows whichever belongs at that width — a viewBox
// cannot be swapped in a media query.
//
// `variant` is 'paper' (cream popup: ink outline) or 'ink' (near-black popup:
// cream outline). The dotted path is the accent colour in both.

export default function PaperPlane({ variant }) {
  const bg = variant === 'ink' ? 'var(--ink)' : 'var(--paper)';
  const fg = variant === 'ink' ? 'var(--paper)' : 'var(--ink)';

  return (
    <>
      <svg
        className="gmp-popup-plane gmp-popup-plane-wide"
        viewBox="0 0 580 200"
        width="580"
        height="200"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M 350 186 C 384 184, 404 174, 418 160 C 436 138, 480 150, 470 176 C 460 200, 412 186, 424 152 C 434 126, 464 120, 484 124"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 11"
        />
        <g transform="translate(528 122) rotate(-6)">
          <path
            d="M 0 0 L -40 -16 L -30 0 L -40 16 Z"
            fill={bg}
            stroke={fg}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M 0 0 L -30 0" stroke={fg} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M -30 0 L -26 10" stroke={fg} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>

      <svg
        className="gmp-popup-plane gmp-popup-plane-narrow"
        viewBox="0 0 390 120"
        width="390"
        height="120"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M 160 98 C 190 96, 214 88, 236 78 C 256 66, 292 76, 284 98 C 276 118, 236 108, 250 82 C 262 62, 300 70, 316 84"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 9"
        />
        <g transform="translate(350 82) rotate(-6)">
          <path
            d="M 0 0 L -32 -13 L -24 0 L -32 13 Z"
            fill={bg}
            stroke={fg}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M 0 0 L -24 0" stroke={fg} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M -24 0 L -21 8" stroke={fg} strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </svg>
    </>
  );
}
