const sharp = require('sharp');
const path  = require('path');

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Grain filter -->
    <filter id="grain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feBlend in="SourceGraphic" mode="overlay" result="blend"/>
      <feComposite in="blend" in2="SourceGraphic" operator="in"/>
    </filter>
    <!-- Lime glow -->
    <radialGradient id="glow" cx="18%" cy="55%" r="45%">
      <stop offset="0%"   stop-color="#C9F03C" stop-opacity="0.11"/>
      <stop offset="100%" stop-color="#C9F03C" stop-opacity="0"/>
    </radialGradient>
    <!-- Right fade -->
    <linearGradient id="rightfade" x1="55%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#0A0908" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0A0908" stop-opacity="0.6"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#0A0908"/>

  <!-- Lime glow -->
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Subtle grid lines (vertical) -->
  <line x1="600" y1="0"   x2="600" y2="${H}" stroke="#1E1C1A" stroke-width="1"/>
  <line x1="800" y1="0"   x2="800" y2="${H}" stroke="#1E1C1A" stroke-width="1" opacity="0.5"/>
  <line x1="1000" y1="0"  x2="1000" y2="${H}" stroke="#1E1C1A" stroke-width="1" opacity="0.3"/>

  <!-- Subtle grid lines (horizontal) -->
  <line x1="0" y1="210"  x2="${W}" y2="210"  stroke="#1E1C1A" stroke-width="1"/>
  <line x1="0" y1="420"  x2="${W}" y2="420"  stroke="#1E1C1A" stroke-width="1" opacity="0.5"/>

  <!-- Right-side decorative column -->
  <!-- Lime bracket / geometric accent -->
  <rect x="830" y="140" width="3" height="350" fill="#C9F03C" opacity="0.18"/>
  <rect x="830" y="140" width="60" height="3"  fill="#C9F03C" opacity="0.18"/>
  <rect x="830" y="490" width="60" height="3"  fill="#C9F03C" opacity="0.18"/>

  <!-- Decorative dots (right) -->
  <circle cx="980" cy="200" r="3" fill="#C9F03C" opacity="0.35"/>
  <circle cx="1020" cy="200" r="3" fill="#C9F03C" opacity="0.2"/>
  <circle cx="1060" cy="200" r="3" fill="#C9F03C" opacity="0.1"/>
  <circle cx="980" cy="240" r="3" fill="#C9F03C" opacity="0.15"/>
  <circle cx="1020" cy="240" r="3" fill="#C9F03C" opacity="0.2"/>
  <circle cx="1060" cy="240" r="3" fill="#C9F03C" opacity="0.3"/>
  <circle cx="980" cy="280" r="3" fill="#C9F03C" opacity="0.1"/>
  <circle cx="1020" cy="280" r="3" fill="#C9F03C" opacity="0.25"/>
  <circle cx="1060" cy="280" r="3" fill="#C9F03C" opacity="0.15"/>

  <!-- Right fade overlay -->
  <rect width="${W}" height="${H}" fill="url(#rightfade)"/>

  <!-- ── LEFT CONTENT ── -->

  <!-- Eyebrow label -->
  <text
    x="80" y="148"
    font-family="Arial, Helvetica, sans-serif"
    font-size="13"
    font-weight="400"
    letter-spacing="5"
    fill="#5C5651">KREATIVAGENTUR</text>

  <!-- Main wordmark -->
  <text
    x="72" y="330"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="228"
    font-weight="700"
    letter-spacing="-4"
    fill="#F0E8DC">R<tspan fill="#C9F03C">&amp;</tspan>N</text>

  <!-- STUDIO -->
  <text
    x="80" y="388"
    font-family="Arial, Helvetica, sans-serif"
    font-size="36"
    font-weight="400"
    letter-spacing="18"
    fill="#5C5651">STUDIO</text>

  <!-- Lime accent bar -->
  <rect x="80" y="416" width="110" height="3" fill="#C9F03C"/>

  <!-- Tagline -->
  <text
    x="80" y="468"
    font-family="Arial, Helvetica, sans-serif"
    font-size="20"
    font-weight="400"
    letter-spacing="1"
    fill="#8C8680">Branding · Social Media · Webdesign</text>

  <!-- Sub-tagline -->
  <text
    x="80" y="502"
    font-family="Arial, Helvetica, sans-serif"
    font-size="16"
    font-weight="400"
    letter-spacing="0.5"
    fill="#3A3834">Für kleine Unternehmen mit großen Ideen</text>

  <!-- Bottom URL -->
  <text
    x="80" y="578"
    font-family="Arial, Helvetica, sans-serif"
    font-size="15"
    font-weight="400"
    letter-spacing="3"
    fill="#3A3834">rn-studio.de</text>

  <!-- Bottom lime dot accent -->
  <circle cx="198" cy="574" r="3" fill="#C9F03C"/>

  <!-- Grain overlay -->
  <rect width="${W}" height="${H}" fill="#0A0908" opacity="0.03" filter="url(#grain)"/>
</svg>`;

sharp(Buffer.from(svg))
  .jpeg({ quality: 95, mozjpeg: true })
  .toFile(path.join(__dirname, 'og-image.jpg'))
  .then(info => {
    console.log('✓ og-image.jpg erstellt (' + info.width + 'x' + info.height + 'px, ' + Math.round(info.size / 1024) + ' KB)');
  })
  .catch(err => {
    console.error('Fehler:', err.message);
  });
