// --- Toast helper ---------------
function showClovetToast() {
  // if a toast already exists, remove it first so we don’t stack them
  const existing = document.getElementById('clovet-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'clovet-toast';
  toast.textContent = '✓ Saved to Clovet';
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #222;
    color: #fff;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 14px;
    box-shadow: 0 2px 6px rgba(0,0,0,.3);
    z-index: 9999;
    opacity: 0;
    transition: opacity .3s ease;
  `;
  document.body.appendChild(toast);

  // fade in
  requestAnimationFrame(() => (toast.style.opacity = '1'));

  // fade out + remove after 2 s
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}


function addClovetButtons() {
  const pins = document.querySelectorAll('div[data-test-id="pin"]');

  pins.forEach(pin => {
    if (pin.querySelector('.clovet-save-btn')) return; // avoid duplicates

    const btn = document.createElement('button');
    btn.innerText = 'Save to Clovet';
    btn.className = 'clovet-save-btn';
    btn.style.cssText = `
      position: absolute;
      top: 8px;
      left: 8px;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.25);
      color: white;
      border: none;
      padding: 6px 8px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
    `;

    btn.onclick = async () => {
      const img  = pin.querySelector('img')?.src || '';
      const text = pin.innerText || '';
    
      try {
        await fetch('http://localhost:3001/api/save-pin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ img, text })
        });
        showClovetToast();           // ← show banner after successful save
      } catch (err) {
        console.error('Clovet save failed', err);
      }
    };

    pin.style.position = 'relative';
    pin.appendChild(btn);
  });
}

setInterval(addClovetButtons, 1000); // run repeatedly to catch new pins
