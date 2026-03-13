import { useState, useEffect } from 'react'

// ─── SVG path data — from UX maquette (Screen Animation Setup) ────────────────

// White cloud shape (p2f37b00 — viewBox 0 0 923 521)
const CLOUD_PATH =
  'M48 315.999C48 376.369 96.9273 425.309 157.282 425.309C172.448 425.309 186.891 422.219 200.019 416.634C224.093 432.267 252.813 441.347 283.653 441.347C310.632 441.347 335.989 434.398 358.033 422.192C395.137 453.873 443.279 473 495.888 473C546.257 473 592.531 455.467 628.945 426.17C655.063 449.52 689.535 463.715 727.321 463.715C808.882 463.715 875 397.58 875 315.999C875 234.418 808.882 168.283 727.321 168.283C714.288 168.283 701.648 169.972 689.61 173.143C656.3 99.3532 582.09 48 495.888 48C423.954 48 360.37 83.761 321.936 138.479C309.697 135.343 296.869 133.675 283.653 133.675C228.313 133.675 179.8 162.911 152.709 206.783C94.4749 209.181 48 257.161 48 315.999Z'

// Blue blob (p14ddb000 — viewBox 0 0 2056 1528)
const BLUE_BLOB_PATH =
  'M781.281 635.255C838.107 551.698 944.456 499.351 1057.97 500.006C1190.57 500.762 1311.23 573.706 1354.77 681.413C1472.02 689.09 1557.19 764.668 1555.99 844.279C1555.03 908.046 1498.79 965.801 1425.19 987.733C1329.81 1016.16 1247.37 971.864 1239.06 967.238C1218.82 982.402 1170.83 1014.13 1098.21 1024.61C988.627 1040.46 905.097 996.103 886.919 985.944C782.318 1034.56 654.216 1022.38 575.019 959.032C511.169 907.958 475.338 820.607 519.678 741.815C563.369 664.183 671.234 619.083 781.266 635.255H781.281Z'

// ─── White cloud positions per variant (translate x, y in 1440×1024 px space) ──
// Positions pre-computed from the Figma maquette's Tailwind layout values.
// hide2: true → blob 2 is invisible for this variant (variant F)
const VARIANTS = [
  { blob1: [19, 112],   blob2: [510, 488] },          // A — default
  { blob1: [510, 488],  blob2: [14, 92] },             // B
  { blob1: [655, 481],  blob2: [14, 92] },             // C
  { blob1: [910, 478],  blob2: [211, 103] },           // D
  { blob1: [1487, 478], blob2: [350, 79] },            // E
  { blob1: [-155, 488], blob2: [510, 488], hide2: true }, // F
  { blob1: [-245, 85],  blob2: [296, 500] },           // G
  { blob1: [-245, 85],  blob2: [287, 439] },           // H
  { blob1: [-83, 64],   blob2: [408, 440] },           // I
]

export default function HumaBackground() {
  const [idx, setIdx] = useState(0)
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  )

  // Cycle through variants every 2.8 s (matches maquette timing)
  useEffect(() => {
    const timer = setTimeout(() => setIdx(i => (i + 1) % VARIANTS.length), 2800)
    return () => clearTimeout(timer)
  }, [idx])

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // In dark mode the dark aurora (body::before) takes over
  if (isDark) return null

  const v = VARIANTS[idx]

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        background: '#ebeeff',
        pointerEvents: 'none',
      }}
    >
      {/* ── Blue blob — upper-left quadrant ──────────────────────────────────── */}
      {/* Positioned at (-535, -536) so its 2056×1528 coordinate space maps
          1:1 onto the 1440×1024 viewport (same math as the Figma maquette). */}
      <div
        style={{
          position: 'absolute',
          left: -535,
          top: -536,
          width: 2056,
          height: 1528,
          filter: 'blur(200px)',
          willChange: 'filter',
        }}
      >
        <svg viewBox="0 0 2056 1528" width="2056" height="1528" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={BLUE_BLOB_PATH} fill="#085EFD" fillOpacity="0.48" />
        </svg>
      </div>

      {/* ── Orange ellipse — lower-center ────────────────────────────────────── */}
      {/* Positioned at (-269, -75) for the 2221×2193 coordinate space. */}
      <div
        style={{
          position: 'absolute',
          left: -269,
          top: -75,
          width: 2221,
          height: 2193,
          filter: 'blur(280px)',
          willChange: 'filter',
        }}
      >
        <svg viewBox="0 0 2221 2193" width="2221" height="2193" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="1110.5" cy="1096.5" rx="410.5" ry="396.5" fill="#FFA341" />
        </svg>
      </div>

      {/* ── Small orange accent — bottom area ────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 438,
          top: 638,
          width: 806,
          height: 810,
          filter: 'blur(80px)',
          willChange: 'filter',
        }}
      >
        <svg viewBox="0 0 806 810" width="806" height="810" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="403" cy="405" rx="203" ry="205" fill="#FFA441" />
        </svg>
      </div>

      {/* ── White cloud blob 1 — animated ────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 923,
          height: 521,
          filter: 'blur(24px)',
          transform: `translate(${v.blob1[0]}px, ${v.blob1[1]}px)`,
          transition: 'transform 2s ease-in-out',
          willChange: 'transform',
        }}
      >
        <svg viewBox="0 0 923 521" width="923" height="521" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={CLOUD_PATH} fill="white" fillOpacity="0.7" />
        </svg>
      </div>

      {/* ── White cloud blob 2 — animated ────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 923,
          height: 521,
          filter: 'blur(24px)',
          transform: `translate(${v.blob2[0]}px, ${v.blob2[1]}px)`,
          transition: 'transform 2s ease-in-out, opacity 0.8s ease-in-out',
          opacity: v.hide2 ? 0 : 1,
          willChange: 'transform, opacity',
        }}
      >
        <svg viewBox="0 0 923 521" width="923" height="521" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={CLOUD_PATH} fill="white" fillOpacity="0.7" />
        </svg>
      </div>
    </div>
  )
}
