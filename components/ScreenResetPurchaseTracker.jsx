'use client';

import { useEffect } from 'react';
import { ITEM_NAME, PRICES } from '../data/screen-reset-sales';
import { trackMetaPurchase, trackPurchase } from '../lib/analytics';

// Reports a finished Screen Reset purchase to Google Analytics and the Meta
// pixel. It sits on the thank-you page and draws nothing.
//
// How it knows someone bought: Kajabi sends each buyer back to
//   /screen-reset/thank-you/?offer=sale   (the $67 offer)
//   /screen-reset/thank-you/?offer=full   (the $99 offer)
// That ending is set in Kajabi, on each offer's "after purchase" page. With
// no `offer` on the link (someone just visiting the page), nothing is sent.
//
// Counting each purchase once:
//  - `offer` is taken off the address bar straight away, so a refresh, or a
//    link someone saved or shared, does not carry it.
//  - The browser also remembers the time it reported a purchase, and will
//    not report another for 24 hours. That covers the back button and Kajabi
//    sending the same buyer here twice. The cost: a second real purchase
//    from the same browser inside 24 hours is not counted. Kajabi's own
//    sales numbers stay the record of truth.
const OFFERS = {
  sale: PRICES.saleValue,
  full: PRICES.fullValue,
};
const ITEM_ID = 'screen-reset';
const PURCHASE_GUARD_KEY = 'gmp_screen_reset_purchase_reported';
const GUARD_MS = 24 * 60 * 60 * 1000;

function reportedRecently() {
  try {
    const at = Number(window.localStorage.getItem(PURCHASE_GUARD_KEY)) || 0;
    return at > 0 && Date.now() - at < GUARD_MS;
  } catch {
    // Storage blocked (private mode): the address-bar cleanup below is then
    // the only guard, which still stops a refresh from counting twice.
    return false;
  }
}

function rememberReported() {
  try {
    window.localStorage.setItem(PURCHASE_GUARD_KEY, String(Date.now()));
  } catch {
    // never block the page
  }
}

export default function ScreenResetPurchaseTracker() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const offer = url.searchParams.get('offer');
    if (!Object.prototype.hasOwnProperty.call(OFFERS, offer)) return;
    const value = OFFERS[offer];

    // Take `offer` off the address bar, keeping anything else on the link.
    url.searchParams.delete('offer');
    try {
      window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    } catch {
      // an old browser: the 24-hour guard still applies
    }

    if (reportedRecently()) return;
    // Remembered before sending, not after: GA can take seconds to load, and
    // a refresh in that gap must not start a second report.
    rememberReported();

    const transactionId = `sr-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    trackPurchase({ transactionId, value, itemId: ITEM_ID, itemName: ITEM_NAME });
    trackMetaPurchase({ value, itemId: ITEM_ID, itemName: ITEM_NAME });
  }, []);

  return null;
}
