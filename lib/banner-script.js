// The tiny script that runs before the page paints and decides which banner,
// if any, this visitor sees. It lives here (not inline in app/layout.jsx) so
// scripts/popup-phase-check.mjs can run the exact same text at every switch
// time and prove it agrees with phaseAt() in data/site-banner.js.
//
// What it sets on <html>:
//   data-banner-phase="waitlist" | "sales" | …   which banner is current
//   data-banner="hidden"                         none shows here (off, a
//                                                hidden page, or dismissed)
// styles/site-banner.css reads both. No JS, or the script throws: no banner
// at all. That is the safe way to fail — a stale banner is worse than none.
//
// Kept dependency-free and ES5 on purpose: it runs while the HTML is still
// being parsed.
export function buildBannerScript({ schedule, versions, hiddenPaths, cookie }) {
  if (!schedule.some(([, phase]) => phase)) return null;
  return `(function(){try{var h=document.documentElement;
var s=${JSON.stringify(schedule)},v=${JSON.stringify(versions)};
var n=Date.now(),ph=null;for(var i=0;i<s.length;i++){if(n>=s[i][0])ph=s[i][1];}
var p=location.pathname;if(p.slice(-1)!=='/')p+='/';
var hide=!ph||${JSON.stringify(hiddenPaths)}.indexOf(p)>-1;
if(!hide)hide=(document.cookie.split('; ').filter(function(c){return c.indexOf('${cookie}=')===0;})[0]||'').split('=')[1]===encodeURIComponent(v[ph]);
if(ph)h.setAttribute('data-banner-phase',ph);
if(hide)h.setAttribute('data-banner','hidden');}catch(e){}})();`;
}
