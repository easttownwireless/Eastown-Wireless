// Eastown Wireless — shared behavior

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const panel = document.querySelector('.mobile-panel');
  if (burger && panel) {
    burger.addEventListener('click', () => panel.classList.toggle('open'));
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => panel.classList.remove('open')));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Tabs (used on repair page for iPhone / Samsung / Motorola pricing)
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        const panelGroup = document.querySelector(tabGroup.dataset.panels);
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (panelGroup) {
          panelGroup.querySelectorAll('.tab-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.tab === target);
          });
        }
      });
    });
  });

  // Simple booking form -> turns into a tel/sms friendly summary (no backend yet)
  const bookingForm = document.querySelector('#booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(bookingForm);
      const name = data.get('name') || '';
      const device = data.get('device') || '';
      const issue = data.get('issue') || '';
      const time = data.get('time') || '';
      const msg = `Hi Eastown Wireless, I'd like to book a repair.%0AName: ${name}%0ADevice: ${device}%0AIssue: ${issue}%0APreferred time: ${time}`;
      window.location.href = `sms:9374965488?&body=${msg}`;
    });
  }
});
