import { crossCenter, crossOverlap, glowBox, LOGO_VIEWBOX, logoParts, markCenter } from "./logo-paths";

/**
 * The animated logo loading screen.
 *
 * It is plain CSS, SVG and a tiny inline script, rendered into the HTML that the
 * server sends, so it is on screen from the very first paint and does not wait
 * for React or any other JavaScript to load.
 *
 *  - Shows when someone opens the site or refreshes. It never shows again while
 *    they move between pages.
 *  - The logo assembles in about 1.5 seconds. If the page is ready sooner, the
 *    remaining pieces settle quickly while the screen is already fading, so the
 *    animation never holds the page back.
 *  - If the page is slow, the finished logo breathes gently until it is ready.
 *  - Dark mode: navy screen, white logo, teal arrows (matches the app icon).
 *  - Reduced motion: the finished logo and a plain fade.
 *  - It cannot get stuck: the script hides it after 8 seconds at most, a
 *    CSS-only fallback hides it after 12, and it never appears without JavaScript.
 *
 * The script only changes this element's own class and style, never removes it,
 * so React hydrates the page without mismatches (see `suppressHydrationWarning`).
 */

const css = `
#lb-loader{--lb-bg:#fff;--lb-ink:#0f1f3d;position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:#fff;background:var(--lb-bg);opacity:1;will-change:opacity;transition:opacity .45s cubic-bezier(.4,0,1,1),visibility 0s linear .45s;animation:lb-failsafe .4s ease 12s forwards}
#lb-loader.lb-hide{opacity:0;visibility:hidden;pointer-events:none}
@media (prefers-color-scheme:dark){#lb-loader{--lb-bg:#0f1f3d;--lb-ink:#fff}}
#lb-loader .lb-logo{display:block;overflow:visible;width:240px;width:clamp(184px,52vw,288px);height:auto;max-height:70vh;transition:transform .45s cubic-bezier(.4,0,1,1)}
#lb-loader.lb-hide .lb-logo{transform:scale(1.03)}
#lb-loader .lb-ink,#lb-loader .lb-ink *{fill:#0f1f3d;fill:var(--lb-ink)}
#lb-loader .lb-teal,#lb-loader .lb-teal *{fill:#3aa391}
#lb-loader .lb-lens{fill:#0f1f3d}
#lb-loader .lb-p{opacity:0;animation-duration:.58s;animation-timing-function:cubic-bezier(.22,1,.36,1);animation-fill-mode:both}
#lb-loader .lb-l{animation-name:lb-from-left;animation-delay:0s;animation-duration:.6s}
#lb-loader .lb-blade{animation-name:lb-from-left-s;animation-delay:.06s;animation-duration:.6s}
#lb-loader .lb-t-stem{animation-name:lb-from-below;animation-delay:.2s}
#lb-loader .lb-t-bar{animation-name:lb-from-left-s;animation-delay:.28s}
#lb-loader .lb-base{animation-name:lb-from-below-s;animation-delay:.34s}
#lb-loader .lb-arrow{animation-name:lb-from-left;animation-delay:.46s;animation-duration:.6s}
#lb-loader .lb-swoosh{animation-name:lb-sweep-up;animation-delay:.54s;animation-duration:.6s}
#lb-loader .lb-cross{animation-name:lb-cross;animation-delay:.86s;animation-duration:.5s;transform-origin:${crossCenter.x}px ${crossCenter.y}px}
#lb-loader .lb-word{animation-name:lb-rise;animation-delay:1s;animation-duration:.5s}
@keyframes lb-from-left{0%{opacity:0;transform:translateX(-112px)}50%{opacity:1}100%{opacity:1;transform:none}}
@keyframes lb-from-left-s{0%{opacity:0;transform:translateX(-62px)}50%{opacity:1}100%{opacity:1;transform:none}}
@keyframes lb-from-below{0%{opacity:0;transform:translateY(42px)}50%{opacity:1}100%{opacity:1;transform:none}}
@keyframes lb-from-below-s{0%{opacity:0;transform:translateY(22px)}50%{opacity:1}100%{opacity:1;transform:none}}
@keyframes lb-sweep-up{0%{opacity:0;transform:translate(-24px,92px)}50%{opacity:1}100%{opacity:1;transform:none}}
@keyframes lb-cross{0%{opacity:0;transform:scale(.84)}100%{opacity:1;transform:none}}
@keyframes lb-rise{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:none}}
#lb-loader .lb-glow{opacity:0;animation:lb-glow 1.05s ease-out .86s both,lb-glow-breathe 3.2s ease-in-out 2s infinite}
@keyframes lb-glow{0%{opacity:0}40%{opacity:.8}100%{opacity:0}}
@keyframes lb-glow-breathe{0%,100%{opacity:0}50%{opacity:.5}}
#lb-loader .lb-mark{transform-origin:${markCenter.x}px ${markCenter.y}px;animation:lb-breathe 3.2s ease-in-out 2s infinite}
@keyframes lb-breathe{0%,100%{transform:none}50%{transform:scale(1.022)}}
@keyframes lb-failsafe{to{opacity:0;visibility:hidden}}
@media (prefers-reduced-motion:reduce){
#lb-loader .lb-p,#lb-loader .lb-mark,#lb-loader .lb-glow{animation:none;transform:none}
#lb-loader .lb-p{opacity:1}
#lb-loader,#lb-loader .lb-logo{transition-duration:.2s,0s;transition-delay:0s,.2s}
#lb-loader.lb-hide .lb-logo{transform:none}
}
`.trim();

const script = `
(function (w, d) {
  var el = d.currentScript.parentNode, gone = false;
  function finish() { el.style.display = 'none'; }

  // Only greet people arriving at (or refreshing) the site, not in-site page loads.
  try {
    var nav = performance.getEntriesByType('navigation')[0], type = nav ? nav.type : 'navigate';
    var inSite = d.referrer && new URL(d.referrer).origin === location.origin;
    if (type === 'back_forward' || (type === 'navigate' && inSite)) { finish(); return; }
  } catch (e) {}

  function done() {
    if (gone) return;
    gone = true;
    // Page ready before the logo finished assembling? Don't make anyone wait:
    // let the remaining pieces settle quickly while the screen is already fading.
    try {
      var left = 0, anims = el.getAnimations({ subtree: true }).filter(function (a) {
        var t = a.effect && a.effect.getComputedTiming();
        return t && t.iterations !== Infinity && a.effect.target !== el;
      });
      anims.forEach(function (a) {
        if (a.effect.target.classList.contains('lb-p'))
          left = Math.max(left, a.effect.getComputedTiming().endTime - (a.currentTime || 0));
      });
      if (left > 250) anims.forEach(function (a) { a.playbackRate = left / 250; });
    } catch (e) {}
    el.classList.add('lb-hide');
    var timer = setTimeout(finish, 900);
    el.addEventListener('transitionend', function (e) {
      if (e.target === el) { clearTimeout(timer); finish(); }
    });
  }

  if (d.readyState === 'complete') done(); else w.addEventListener('load', done);
  w.addEventListener('pageshow', function (e) { if (e.persisted) done(); });
  setTimeout(done, 8000);
})(window, document);
`.trim();

export function LogoLoader() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: "#lb-loader{display:none}" }} />
      </noscript>
      <div id="lb-loader" role="status" aria-label="Loading Lakebound Transportation" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: script }} />
        <svg className="lb-logo" viewBox={LOGO_VIEWBOX} aria-hidden="true" focusable="false">
          <defs>
            <filter id="lb-glow-blur" filterUnits="userSpaceOnUse" {...glowBox}>
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>
          <g className="lb-mark">
            <g className="lb-teal">
              <path className="lb-p lb-arrow" d={logoParts.arrow} />
              <path className="lb-p lb-swoosh" d={logoParts.swoosh} />
            </g>
            <g className="lb-ink">
              <path className="lb-p lb-blade" d={logoParts.blade} />
              <path className="lb-p lb-base" d={logoParts.base} />
              <path className="lb-p lb-l" d={logoParts.letterL} />
              <path className="lb-p lb-t-stem" d={logoParts.letterTStem} />
              <path className="lb-p lb-t-bar" d={logoParts.letterTBar} />
            </g>
            <path className="lb-glow lb-teal" filter="url(#lb-glow-blur)" d={logoParts.cross} />
            <g className="lb-p lb-cross">
              <path className="lb-teal" d={logoParts.cross} />
              <rect className="lb-lens" {...crossOverlap} opacity=".28" />
              <path className="lb-lens" d={logoParts.crossLens} />
            </g>
          </g>
          <g className="lb-p lb-word lb-ink">
            <path d={logoParts.wordLakebound} />
            <path d={logoParts.wordTransportation} />
          </g>
        </svg>
      </div>
    </>
  );
}
