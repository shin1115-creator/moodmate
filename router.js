// router.js
(function(global){
  'use strict';
  const S = window.StorageMM;

  const routes = {
    '#/log':     (el)=> global.ViewLog.render(el),
    '#/history': (el)=> global.ViewHistory.render(el),
    '#/actions': (el)=> global.ViewActions.render(el),
    '#/settings':(el)=> global.ViewSettings.render(el)
  };

  function updateNavActive(){
    document.querySelectorAll('[data-route]').forEach(a => {
      a.setAttribute('aria-current', location.hash === a.getAttribute('href') ? 'page' : 'false');
    });
  }

  function render(){
    const app = document.getElementById('app');
    const hash = location.hash || (S.loadSettings().lastRoute || '#/log');
    const fn = routes[hash] || routes['#/log'];
    history.replaceState(null, '', hash);
    fn(app);
    updateNavActive();
    // save last route
    const s = S.loadSettings(); s.lastRoute = hash; S.saveSettings(s);
    // focus main
    setTimeout(()=> app.focus(), 0);
  }

  window.addEventListener('hashchange', render);
  global.RouterMM = { render };
})(window);
