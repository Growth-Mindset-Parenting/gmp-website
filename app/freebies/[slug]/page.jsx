import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { getFreebie } from '../../../content/freebies';
import WorksheetVariant from './WorksheetVariant';
import KitchenTableVariant from './KitchenTableVariant';

export async function generateMetadata({ params }) {
  const freebie = getFreebie(params.slug);
  if (!freebie) return {};
  return {
    title: freebie.metaTitle,
    description: freebie.metaDescription,
    openGraph: {
      title: freebie.metaTitle,
      description: freebie.metaDescription,
      images: [{ url: '/images/freebie-sean-square.jpg' }],
    },
    robots: { index: true, follow: true },
  };
}

export default function FreebiePage({ params }) {
  const freebie = getFreebie(params.slug);
  if (!freebie) notFound();

  // Set by middleware; visible on first render thanks to the forwarded-request
  // pattern. Fallback only covers cookie-less edge cases (some crawlers).
  const variant = cookies().get('freebie-variant')?.value || 'worksheet';

  if (variant === 'kitchen-table') {
    return <KitchenTableVariant freebie={freebie} />;
  }
  return <WorksheetVariant freebie={freebie} />;
}
