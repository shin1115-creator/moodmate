// storage.js
// Cookie + JSON + Base64 utilities and high-level data helpers

(function(global){
  'use strict';

  const COOKIE_DAYS = 30;
  const C_HISTORY = 'mm_weekHistory';
  const C_SETTINGS = 'mm_settings';
  const C_ACTIONS = 'mm_actions';
  const C_TODAY   = 'mm_todayMood';

  function setCookie(name, value, days){
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
  }
  function getCookie(name){
    const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name.replace(/([$?*|{}\(\)\[\]\\\/\+^])/g,'\\$1') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function b64EncodeUnicode(str){
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_,p1)=>String.fromCharCode('0x'+p1)));
  }
  function b64DecodeUnicode(str){
    try{
      return decodeURIComponent(Array.prototype.map.call(atob(str), c => '%' + ('00'+c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    }catch(e){
      return '';
    }
  }

  function setCookieJSON(name, obj, days=COOKIE_DAYS){
    try{
      setCookie(name, b64EncodeUnicode(JSON.stringify(obj)), days);
    }catch(e){
      console.warn('Failed to setCookieJSON', e);
    }
  }
  function getCookieJSON(name){
    const raw = getCookie(name);
    if(!raw) return null;
    try{
      return JSON.parse(b64DecodeUnicode(raw));
    }catch(e){
      console.warn('Failed to parse cookie JSON', name, e);
      return null;
    }
  }

  function todayISO(){
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const da= String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${da}`;
  }

  // History helpers (max 7 records)
  function loadWeekHistory(){
    const arr = getCookieJSON(C_HISTORY);
    return Array.isArray(arr) ? arr.slice(0,7) : [];
  }
  function saveWeekHistory(list){
    const trimmed = (list||[]).sort((a,b)=> (a.dateISO>b.dateISO?1:-1)).slice(-7);
    setCookieJSON(C_HISTORY, trimmed);
  }
  function upsertToday(entry){
    const iso = todayISO();
    const list = loadWeekHistory();
    const idx = list.findIndex(x => x.dateISO === iso);
    if(idx >= 0){
      list[idx] = Object.assign({}, list[idx], entry, {dateISO: iso});
    }else{
      list.push(Object.assign({dateISO: iso}, entry));
    }
    saveWeekHistory(list);
    return list;
  }
  function deleteByDateISO(dateISO){
    const list = loadWeekHistory().filter(x=>x.dateISO !== dateISO);
    saveWeekHistory(list);
    return list;
  }

  // Actions helpers
  function loadActions(){
    const arr = getCookieJSON(C_ACTIONS);
    if(Array.isArray(arr) && arr.length) return arr;
    // default from global DEFAULT_ACTIONS if present
    return (global.DEFAULT_ACTIONS || []).slice();
  }
  function saveActions(list){
    setCookieJSON(C_ACTIONS, list);
  }

  // Settings
  function loadSettings(){
    return getCookieJSON(C_SETTINGS) || { theme: 'light', lastRoute: '#/log' };
  }
  function saveSettings(s){
    setCookieJSON(C_SETTINGS, s);
  }
  function getTodayMood(){
    return getCookie(C_TODAY);
  }
  function setTodayMood(mood){
    setCookie(C_TODAY, String(mood), COOKIE_DAYS);
  }

  global.StorageMM = {
    C_HISTORY, C_SETTINGS, C_ACTIONS, C_TODAY,
    setCookie, getCookie, setCookieJSON, getCookieJSON,
    todayISO, loadWeekHistory, saveWeekHistory, upsertToday, deleteByDateISO,
    loadActions, saveActions,
    loadSettings, saveSettings, getTodayMood, setTodayMood
  };
})(window);
