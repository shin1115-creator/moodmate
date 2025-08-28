// app.js - entry
(function(){
  'use strict';
  // apply theme from settings on boot
  const s = window.StorageMM.loadSettings();
  document.documentElement.classList.toggle('dark', (s.theme || 'light') === 'dark');
  // start router
  window.RouterMM.render();
})();
