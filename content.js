function addCovetButtons() {
  const pins = document.querySelectorAll('div[data-test-id="pin"]');

  pins.forEach(pin => {
    if (pin.querySelector('.covet-save-btn')) return; // avoid duplicates

    const btn = document.createElement('button');
    btn.innerText = 'Save to Covet';
    btn.className = 'covet-save-btn';
    btn.style.cssText = `
      position: absolute;
      bottom: 8px;
      right: 8px;
      z-index: 1000;
      background: #222;
      color: white;
      border: none;
      padding: 6px 8px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
    `;

    btn.onclick = () => {
      const img = pin.querySelector('img')?.src || '';
      const text = pin.innerText || '';
      fetch('https://your-covet-backend.com/api/save-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ img, text })
      });
    };

    pin.style.position = 'relative';
    pin.appendChild(btn);
  });
}

setInterval(addCovetButtons, 1000); // run repeatedly to catch new pins
