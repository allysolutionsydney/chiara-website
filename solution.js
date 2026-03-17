/* solution.js — tab switcher for solution page */
(function () {
  const tabs   = document.querySelectorAll('.sol-tab');
  const panels = document.querySelectorAll('.sol-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.sol;

      tabs.forEach((t) => {
        t.classList.remove('sol-tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach((p) => p.classList.remove('sol-panel--active'));

      tab.classList.add('sol-tab--active');
      tab.setAttribute('aria-selected', 'true');

      const panel = document.querySelector(`.sol-panel[data-sol-panel="${target}"]`);
      if (panel) {
        panel.classList.add('sol-panel--active');
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
})();
