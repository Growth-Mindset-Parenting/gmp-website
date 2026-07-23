import { LETTERS } from '../../content/letters';
import { SITE } from '../../data/site';

// Content only changes via commits + redeploys, so the feed is
// generated once at build time.
export const dynamic = 'force-static';

export function GET() {
  const sorted = [...LETTERS].sort((a, b) => new Date(b.date) - new Date(a.date));

  const items = sorted.map((l) => `
  <item>
    <title><![CDATA[${l.title}]]></title>
    <link>${SITE.url}/writing/${l.slug}/</link>
    <guid isPermaLink="true">${SITE.url}/writing/${l.slug}/</guid>
    <pubDate>${new Date(l.date).toUTCString()}</pubDate>
    <description><![CDATA[${l.excerpt || l.dek || ''}]]></description>
  </item>`).join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE.name}]]></title>
    <link>${SITE.url}</link>
    <description><![CDATA[${SITE.description}]]></description>
    <language>en-us</language>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
