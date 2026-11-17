import { cache } from 'react';
import ScreenResetSales from '../../components/ScreenResetSales';
import { screenResetPriceAt } from '../../data/launch-schedule';
import { SCREEN_RESET_METADATA } from '../../lib/screen-reset-metadata';

// /screen-reset/ — The Screen Reset sales page. It switches BY ITSELF from
// the $67 launch version to the $99 version at the end of Mon Nov 30 2026,
// Central (SCREEN_RESET_SALE_ENDS in data/launch-schedule.js). No deploy
// needed: the page is regenerated on the server at most every 60 seconds
// (ISR), and each regeneration re-checks the clock. Without this
// `revalidate` the page would be frozen at build time and never switch.
//
// Standalone: no site Nav/Footer. Copy, prices and checkout links live in
// data/screen-reset-sales.js; metadata in lib/screen-reset-metadata.js.
export const revalidate = 60;

// Read the clock once per render, so the price, the buy links and the copy
// always agree.
const currentPrice = cache(() => screenResetPriceAt());

export const metadata = SCREEN_RESET_METADATA;

export default function ScreenResetPage() {
  return <ScreenResetSales phase={currentPrice()} />;
}
