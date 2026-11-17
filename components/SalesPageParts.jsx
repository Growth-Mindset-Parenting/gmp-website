// Small building blocks shared by the standalone sales pages
// (components/AutopilotSales.jsx and components/ScreenResetSales.jsx).
// Moved here unchanged from AutopilotSales.jsx on 2026-11-17 so both pages
// draw from the same pieces. Styles: styles/autopilot-sales.css (aps-).

export const Arrow = () => <span aria-hidden="true">→</span>;

// A heading whose second phrase (`accent`) is set in italic serif.
// `accent` is optional: a heading without one is plain.
export function Heading({ as: Tag = 'h2', text, accent, after, className = 'aps-h2' }) {
  if (!accent) return <Tag className={className}>{text}{after}</Tag>;
  return (
    <Tag className={className}>
      {text} <em>{accent}</em>{after}
    </Tag>
  );
}

export function Check({ children }) {
  return (
    <li className="aps-check">
      <span className="aps-check-mark" aria-hidden="true">✓</span>
      <span>{children}</span>
    </li>
  );
}

export function NumberedRows({ rows, titleClass }) {
  return (
    <div className="aps-rows">
      {rows.map((r, i) => (
        <div key={i} className="aps-row">
          <span className="aps-numeral aps-row-num">{String(i + 1).padStart(2, '0')}</span>
          <div className="aps-row-body">
            <h3 className={titleClass}>{r.title}</h3>
            <p className="aps-row-text">{r.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
