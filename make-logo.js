const sharp = require('sharp');
const path = require('path');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <!-- Background -->
  <rect width="1080" height="1080" fill="#0A0908"/>
  <!-- Subtle lime glow -->
  <radialGradient id="glow" cx="50%" cy="50%" r="40%">
    <stop offset="0%" stop-color="#C9F03C" stop-opacity="0.07"/>
    <stop offset="100%" stop-color="#C9F03C" stop-opacity="0"/>
  </radialGradient>
  <rect width="1080" height="1080" fill="url(#glow)"/>
  <!-- R&N text -->
  <text
    x="540"
    y="600"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="380"
    font-weight="600"
    letter-spacing="-6"
    fill="#F0E8DC">R<tspan fill="#C9F03C">&amp;</tspan>N</text>
  <!-- Tagline -->
  <text
    x="540"
    y="790"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="42"
    font-weight="400"
    letter-spacing="14"
    fill="#5C5651">STUDIO</text>
</svg>`;

sharp(Buffer.from(svg))
  .png({ quality: 100 })
  .toFile(path.join(__dirname, 'rn-studio-instagram.png'))
  .then(info => {
    console.log('✓ rn-studio-instagram.png erstellt (' + info.width + 'x' + info.height + 'px)');
  })
  .catch(err => {
    console.error('Fehler:', err.message);
  });
