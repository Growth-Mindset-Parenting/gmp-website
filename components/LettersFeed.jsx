'use client';
import { useState } from 'react';
import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

const PRIMARY_SKILLS = [
  { key: 'emotional-literacy', label: 'Emotional Literacy' },
  { key: 'resilience',         label: 'Resilience' },
  { key: 'reflection',         label: 'Reflection' },
  { key: 'relationship',       label: 'Relationship' },
  { key: 'autonomy',           label: 'Autonomy' },
  { key: 'communication',      label: 'Communication' },
];

const SECONDARY_TOPICS = [
  { key: 'co-parenting',      label: 'Co-parenting' },
  { key: 'raising-boys',      label: 'Raising boys' },
  { key: 'school-teachers',   label: 'School & teachers' },
];

function LetterRow({ letter }) {
  const isEssay = letter.type === 'essay';
  return (
    <Link href={`/writing/${letter.slug}/`} className="v6-letter">
      <time className="v6-letter-date" dateTime={letter.date}>
        <b>{new Date(letter.date + 'T12:00:00').getDate()}</b>
        <span>{new Date(letter.date + 'T12:00:00').toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
      </time>
      <div className="v6-letter-body">
        <div className={`v6-letter-tag ${isEssay ? 'is-essay' : 'is-note'}`}>
          <span className="v6-letter-tag-dot" aria-hidden="true" />
          {letter.tag}
        </div>
        <h2 className="v6-letter-title">{letter.title}</h2>
        {letter.dek && <p className="v6-letter-dek">{letter.dek}</p>}
        {letter.excerpt && !letter.dek && <p className="v6-letter-dek">{letter.excerpt}</p>}
      </div>
    </Link>
  );
}

export default function LettersFeed({ letters }) {
  const [activeTopic, setActiveTopic] = useState(null);

  const displayed = activeTopic ? letters.filter((l) => l.topic === activeTopic) : letters;

  const allTopics = [...PRIMARY_SKILLS, ...SECONDARY_TOPICS];
  const hasContent = (key) => letters.some((l) => l.topic === key);

  return (
    <div className="v6-letters">
      <section className="v6-letters-feed" aria-label="Writing archive">
        {displayed.map((letter) => (
          <LetterRow key={letter.slug} letter={letter} />
        ))}

      </section>

      <aside className="v6-letters-side" aria-label="Sidebar">
        <div className="v6-letters-side-card">
          <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 20, margin: '0 0 8px' }}>
            The Newsletter
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 16px' }}>
            One piece of teaching in your inbox, every Saturday. Free, plainspoken, unsubscribe anytime.
          </p>
          <SubscribeForm
            variant="light"
            inputPlaceholder="sean@growthmindsetparenting.com"
            buttonLabel="Subscribe free"
          />
        </div>

        <div className="v6-letters-side-card" style={{ background: 'var(--card-sage)' }}>
          {/* Primary group: six Middle Skills */}
          <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 16, margin: '0 0 4px' }}>
            Browse by skill
          </h3>
          <div className="v6-letters-side-tags" style={{ marginBottom: 20 }}>
            <button
              className={`v6-letters-side-tag${activeTopic === null ? ' is-active' : ''}`}
              onClick={() => setActiveTopic(null)}
              style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
            >
              All {letters.length}
            </button>
            {PRIMARY_SKILLS.filter((s) => hasContent(s.key)).map((s) => (
              <button
                key={s.key}
                className={`v6-letters-side-tag${activeTopic === s.key ? ' is-active' : ''}`}
                onClick={() => setActiveTopic(activeTopic === s.key ? null : s.key)}
                style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Secondary group */}
          {SECONDARY_TOPICS.some((t) => hasContent(t.key)) && (
            <>
              <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-soft)', margin: '0 0 8px' }}>
                More topics
              </h3>
              <div className="v6-letters-side-tags">
                {SECONDARY_TOPICS.filter((t) => hasContent(t.key)).map((t) => (
                  <button
                    key={t.key}
                    className={`v6-letters-side-tag${activeTopic === t.key ? ' is-active' : ''}`}
                    onClick={() => setActiveTopic(activeTopic === t.key ? null : t.key)}
                    style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit', fontSize: 13, opacity: 0.85 }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {activeTopic && (
            <button
              onClick={() => setActiveTopic(null)}
              style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-soft)', padding: 0 }}
            >
              ← All writing
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
